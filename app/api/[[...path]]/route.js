import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/db';
import { categories, tools, blogs } from '@/lib/sample-data';
import { auth } from '@clerk/nextjs/server';
import { v4 as uuidv4 } from 'uuid';

// Helper function to create text indexes for search
async function createSearchIndexes() {
  try {
    const toolsCollection = await getCollection('tools').catch(() => null);
    if (!toolsCollection) return;
    
    const blogsCollection = await getCollection('blogs').catch(() => null);
    const categoriesCollection = await getCollection('categories').catch(() => null);
    
    // Create regular indexes for faster queries
    try {
      await toolsCollection.createIndex({ status: 1 });
      await toolsCollection.createIndex({ name: 1 });
      await toolsCollection.createIndex({ categories: 1 });
      await toolsCollection.createIndex({ createdAt: -1 });
      await toolsCollection.createIndex({ status: 1, name: 1 });
    } catch (e) {}
    
    if (blogsCollection) {
      try {
        await blogsCollection.createIndex({ status: 1 });
        await blogsCollection.createIndex({ title: 1 });
        await blogsCollection.createIndex({ createdAt: -1 });
      } catch (e) {}
    }
    
    if (categoriesCollection) {
      try {
        await categoriesCollection.createIndex({ name: 1 });
        await categoriesCollection.createIndex({ type: 1 });
      } catch (e) {}
    }
    
    console.log('✅ Search indexes created');
  } catch (error) {
    console.error('Error creating search indexes:', error);
  }
}

// Helper function to initialize database with sample data
async function initializeDatabase() {
  try {
    const categoriesCollection = await getCollection('categories');
    const toolsCollection = await getCollection('tools');
    const blogsCollection = await getCollection('blogs');
    
    const categoryCount = await categoriesCollection.countDocuments();
    const toolCount = await toolsCollection.countDocuments();
    const blogCount = await blogsCollection.countDocuments();
    
    if (categoryCount === 0) {
      await categoriesCollection.insertMany(categories);
      console.log('✅ Categories initialized');
    }
    
    if (toolCount === 0) {
      await toolsCollection.insertMany(tools);
      console.log('✅ Tools initialized');
    }
    
    if (blogCount === 0) {
      await blogsCollection.insertMany(blogs);
      console.log('✅ Blogs initialized');
    }
    
    // Create search indexes
    await createSearchIndexes();
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

// GET handler
export async function GET(request, { params }) {
  const pathname = request.nextUrl.pathname;
  const { searchParams } = new URL(request.url);
  
  try {
    // HIGH PRIORITY: Reviews API Fallback
    if (pathname.match(/\/api\/reviews\/?$/)) {
      const toolId = searchParams.get('toolId');
      if (!toolId) return NextResponse.json({ error: 'toolId required' }, { status: 400 });

      const reviewsCollection = await getCollection('reviews');
      const toolReviews = await reviewsCollection
        .find({ toolId, status: 'approved' }, { projection: { editToken: 0 } })
        .sort({ createdAt: -1 })
        .toArray();
        
      return NextResponse.json(toolReviews);
    }

    // Health check
    if (pathname === '/api' || pathname === '/api/') {
      return NextResponse.json({ status: 'ok', message: 'AI Directory API' });
    }
    
    // Initialize database
    if (pathname === '/api/init') {
      await initializeDatabase();
      return NextResponse.json({ success: true, message: 'Database initialized' });
    }
    
    // Temporary endpoint to make user admin - REMOVE IN PRODUCTION
    if (pathname === '/api/setup-admin') {
      const userId = searchParams.get('userId');
      if (!userId) {
        return NextResponse.json({ error: 'userId required' }, { status: 400 });
      }
      
      const usersCollection = await getCollection('users');
      const existing = await usersCollection.findOne({ userId });
      
      if (existing) {
        await usersCollection.updateOne(
          { userId },
          { $set: { role: 'admin', updatedAt: new Date() } }
        );
      } else {
        await usersCollection.insertOne({
          _id: uuidv4(),
          userId,
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      
      return NextResponse.json({ success: true, message: `User ${userId} is now admin` });
    }
    
    // GET /api/search - Fast global search across tools, blogs, and categories
    if (pathname === '/api/search') {
      const query = searchParams.get('q') || searchParams.get('query') || '';
      const type = searchParams.get('type') || 'all'; // all, tools, blogs, categories
      const limit = parseInt(searchParams.get('limit') || '10');
      
      if (!query || query.length < 2) {
        return NextResponse.json({ 
          error: 'Search query must be at least 2 characters',
          tools: [], blogs: [], categories: [] 
        });
      }
      
      const results = { tools: [], blogs: [], categories: [] };
      
      // Use case-insensitive regex with word boundary for speed
      // Only search name field first (fastest), then expand if needed
      const fastRegex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      
      // Run searches in parallel for speed
      const searchPromises = [];
      
      // Search tools - with Fuzzy matching (handles typos)
      if (type === 'all' || type === 'tools') {
        searchPromises.push(
          (async () => {
            const toolsCollection = await getCollection('tools');
            
            // Try Atlas Search (Smart Search)
            try {
              results.tools = await toolsCollection.aggregate([
                {
                  $search: {
                    index: 'default', // Try default first
                    text: {
                      query: query,
                      path: 'name',
                      fuzzy: { maxEdits: 2 }
                    }
                  }
                },
                { $match: { status: 'approved' } },
                { $limit: limit },
                { $project: { name: 1, slug: 1, shortDescription: 1, logo: 1, categories: 1, pricing: 1, score: { $meta: 'searchScore' } } }
              ]).toArray();
              
              // If Atlas Search finds nothing, use fallback
              if (results.tools.length === 0) {
                throw new Error('No Atlas Search results');
              }
            } catch (searchError) {
              // Fallback to Smarter Regex Search
              const regexQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
              results.tools = await toolsCollection
                .find({
                  status: 'approved',
                  name: { $regex: regexQuery, $options: 'i' }
                })
                .project({ name: 1, slug: 1, shortDescription: 1, logo: 1, categories: 1, pricing: 1 })
                .sort({ votes: -1 })
                .limit(limit)
                .toArray();
            }
          })()
        );
      }
      
      // Search blogs - optimized
      if (type === 'all' || type === 'blogs') {
        searchPromises.push(
          (async () => {
            const blogsCollection = await getCollection('blogs');
            results.blogs = await blogsCollection
              .find({
                status: 'published',
                $or: [
                  { title: fastRegex },
                  { excerpt: fastRegex }
                ]
              })
              .project({ title: 1, slug: 1, excerpt: 1, image: 1, category: 1 })
              .limit(limit)
              .toArray();
          })()
        );
      }
      
      // Search categories - optimized
      if (type === 'all' || type === 'categories') {
        searchPromises.push(
          (async () => {
            const categoriesCollection = await getCollection('categories');
            results.categories = await categoriesCollection
              .find({
                $or: [
                  { name: fastRegex },
                  { description: fastRegex }
                ]
              })
              .project({ name: 1, slug: 1, description: 1, icon: 1, type: 1 })
              .limit(limit)
              .toArray();
          })()
        );
      }
      
      // Wait for all searches to complete in parallel
      await Promise.all(searchPromises);

      // Simple suggestion logic: if the top result's name is similar but not identical to the query
      let suggestion = null;
      if (results.tools.length > 0 && results.tools[0].name.toLowerCase() !== query.toLowerCase()) {
        const topResult = results.tools[0].name;
        // Only suggest if the result is reasonably similar (fuzzy)
        if (topResult.toLowerCase().includes(query.toLowerCase()) || query.length > 3) {
            suggestion = topResult;
        }
      }
      
      return NextResponse.json({
        query,
        suggestion,
        ...results,
        totalResults: results.tools.length + results.blogs.length + results.categories.length
      });
    }
    
    // GET /api/tools - List all tools with filters
    if (pathname.startsWith('/api/tools')) {
      const slug = pathname.split('/api/tools/')[1];
      
      // Get single tool by slug
      if (slug) {
        const toolsCollection = await getCollection('tools');
        const tool = await toolsCollection.findOne({ slug });
        
        if (!tool) {
          return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
        }
        
        return NextResponse.json(tool);
      }
      
      // List tools with filters
      let toolsList = [];
      let total = 0;
      
      try {
        const toolsCollection = await getCollection('tools');
        const category = searchParams.get('category');
        const search = searchParams.get('search');
        const sort = searchParams.get('sort') || 'trending';
        const status = searchParams.get('status') || 'approved';
        const limitSize = parseInt(searchParams.get('limit') || '20');
        const pageNum = parseInt(searchParams.get('page') || '1');
        
        let query = { status };
        
        if (category) {
          query.categories = category;
        }
        
        if (search) {
          query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { shortDescription: { $regex: search, $options: 'i' } },
          ];
        }
        
        let sortQuery = {};
        if (sort === 'trending') sortQuery = { trending: -1, votes: -1 };
        else if (sort === 'newest') sortQuery = { createdAt: -1 };
        else if (sort === 'rating') sortQuery = { rating: -1 };
        else if (sort === 'popular') sortQuery = { votes: -1 };
        
        const skip = (pageNum - 1) * limitSize;
        
        // Optimized: Use projection to fetch only needed fields
        const projection = {
          name: 1,
          slug: 1,
          shortDescription: 1,
          logo: 1,
          categories: 1,
          tags: 1,
          pricing: 1,
          rating: 1,
          votes: 1,
          status: 1,
          featured: 1,
          trending: 1,
          website: 1,
          createdAt: 1
        };
        
        toolsList = await toolsCollection
          .find(query, { projection })
          .sort(sortQuery)
          .skip(skip)
          .limit(limitSize)
          .toArray();
        
        total = await toolsCollection.countDocuments(query);
      } catch (dbError) {
        console.warn('Database connection failed, falling back to sample data:', dbError.message);
        toolsList = tools.slice(0, 20); // Fallback to sample tools
        total = tools.length;
      }
      
      return NextResponse.json({
        tools: toolsList,
        total,
        page: parseInt(searchParams.get('page') || '1'),
        totalPages: Math.ceil(total / parseInt(searchParams.get('limit') || '20')),
      });
    }
    
    // GET /api/categories - Get all categories from the categories collection
    if (pathname.startsWith('/api/categories')) {
      try {
        const categoriesCollection = await getCollection('categories');
        const fetchedCategories = await categoriesCollection
          .find({ status: { $ne: 'inactive' } })
          .sort({ toolCount: -1 })
          .toArray();
        
        // If collection is empty, fall back to aggregation as a safety measure
        if (fetchedCategories.length === 0) {
          const toolsCollection = await getCollection('tools');
          const categoryAggregation = await toolsCollection.aggregate([
            { $match: { status: 'approved' } },
            { $unwind: '$categories' },
            { 
              $group: { 
                _id: '$categories', 
                count: { $sum: 1 }
              } 
            },
            { $sort: { count: -1 } }
          ]).toArray();

          return NextResponse.json(categoryAggregation.map(item => ({
            _id: item._id,
            name: item._id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            slug: item._id,
            toolCount: item.count,
            icon: '🤖',
            type: 'topic'
          })));
        }
        
        return NextResponse.json(fetchedCategories);
      } catch (dbError) {
        console.warn('Database connection failed for categories, falling back to sample data');
        return NextResponse.json(categories.map(c => ({
          ...c,
          toolCount: Math.floor(Math.random() * 100) + 10
        })));
      }
    }
    
    // GET /api/featured - Get featured tools
    if (pathname === '/api/featured') {
      try {
        const toolsCollection = await getCollection('tools');
        const featuredToolsList = await toolsCollection
          .find({ status: 'approved', featured: true })
          .sort({ votes: -1 })
          .limit(6)
          .toArray();
        
        return NextResponse.json(featuredToolsList);
      } catch (dbError) {
        return NextResponse.json(tools.filter(t => t.featured).slice(0, 6));
      }
    }
    
    // GET /api/trending - Get trending tools
    if (pathname === '/api/trending') {
      try {
        const toolsCollection = await getCollection('tools');
        const trendingToolsList = await toolsCollection
          .find({ status: 'approved', trending: true })
          .sort({ votes: -1 })
          .limit(10)
          .toArray();
        
        return NextResponse.json(trendingToolsList);
      } catch (dbError) {
        return NextResponse.json(tools.filter(t => t.trending).slice(0, 10));
      }
    }
    
    // GET /api/my-submissions - Get user's submissions
    if (pathname === '/api/my-submissions') {
      const { userId } = await auth();
      
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      const toolsCollection = await getCollection('tools');
      const submissions = await toolsCollection
        .find({ submittedBy: userId })
        .sort({ createdAt: -1 })
        .toArray();
      
      return NextResponse.json(submissions);
    }
    
    // GET /api/blogs - List all blogs
    if (pathname.startsWith('/api/blogs')) {
      const slug = pathname.split('/api/blogs/')[1];
      
      // Get single blog by slug
      if (slug) {
        const blogsCollection = await getCollection('blogs');
        const blog = await blogsCollection.findOne({ slug });
        
        if (!blog) {
          return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }
        
        // Increment views
        await blogsCollection.updateOne(
          { _id: blog._id },
          { $inc: { views: 1 } }
        );
        
        return NextResponse.json(blog);
      }
      
      // List blogs with filters
      const blogsCollection = await getCollection('blogs');
      const category = searchParams.get('category');
      const search = searchParams.get('search');
      const status = searchParams.get('status') || 'published';
      const limit = parseInt(searchParams.get('limit') || '10');
      const page = parseInt(searchParams.get('page') || '1');
      
      let query = { status };
      
      if (category) {
        query.category = category;
      }
      
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { excerpt: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
        ];
      }
      
      const skip = (page - 1) * limit;
      
      const blogsList = await blogsCollection
        .find(query)
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray();
      
      const total = await blogsCollection.countDocuments(query);
      
      return NextResponse.json({
        blogs: blogsList,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      });
    }
    
    // GET /api/featured-blogs - Get featured blogs
    if (pathname === '/api/featured-blogs') {
      const blogsCollection = await getCollection('blogs');
      const featured = await blogsCollection
        .find({ status: 'published', featured: true })
        .sort({ publishedAt: -1 })
        .limit(3)
        .toArray();
      
      return NextResponse.json(featured);
    }
    
    // GET /api/my-blog-submissions - Get user's blog submissions
    if (pathname === '/api/my-blog-submissions') {
      const { userId } = await auth();
      
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      const blogsCollection = await getCollection('blogs');
      const submissions = await blogsCollection
        .find({ authorId: userId })
        .sort({ createdAt: -1 })
        .toArray();
      
      return NextResponse.json(submissions);
    }
    
    // GET /api/admin/users - Get all users (admin only)
    if (pathname === '/api/admin/users') {
      const { userId } = await auth();
      
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      try {
        const { clerkClient } = await import('@clerk/nextjs/server');
        const client = clerkClient();
        const usersResponse = await client.users.getUserList({ limit: 100 });
        const users = usersResponse.data || usersResponse;
        
        // Get admin users from database
        const usersCollection = await getCollection('users');
        const adminUsers = await usersCollection.find({ role: 'admin' }).toArray();
        const adminUserIds = new Set(adminUsers.map(u => u.userId));
        
        // Add role info to users
        const usersWithRoles = users.map(user => ({
          id: user.id,
          email: user.emailAddresses[0]?.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
          createdAt: user.createdAt,
          isAdmin: adminUserIds.has(user.id),
        }));
        
        return NextResponse.json(usersWithRoles);
      } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Failed to fetch users', details: error.message }, { status: 500 });
      }
    }
    
    // GET /api/admin/check - Check if current user is admin
    if (pathname === '/api/admin/check') {
      const { userId } = await auth();
      
      if (!userId) {
        return NextResponse.json({ isAdmin: false });
      }
      
      const usersCollection = await getCollection('users');
      const user = await usersCollection.findOne({ userId, role: 'admin' });
      
      return NextResponse.json({ isAdmin: !!user });
    }
    
    // GET /api/admin/tools - Get all tools for admin
    if (pathname === '/api/admin/tools') {
      const { userId } = await auth();
      
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      const status = searchParams.get('status') || 'all';
      const toolsCollection = await getCollection('tools');
      
      let query = {};
      if (status !== 'all') {
        query.status = status;
      }
      
      const allTools = await toolsCollection
        .find(query)
        .sort({ createdAt: -1 })
        .toArray();
      
      return NextResponse.json(allTools);
    }
    
    // GET /api/admin/bulk-logs - Get bulk upload logs
    if (pathname === '/api/admin/bulk-logs') {
      const { userId } = await auth();
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      const bulkLogsCollection = await getCollection('bulk_upload_logs');
      const logs = await bulkLogsCollection
        .find({})
        .sort({ createdAt: -1 })
        .limit(50)
        .toArray();
      
      return NextResponse.json(logs);
    }
    
    // GET /api/admin/bulk-logs/:id/tools - Get tools from a specific bulk upload
    if (pathname.startsWith('/api/admin/bulk-logs/') && pathname.endsWith('/tools')) {
      const { userId } = await auth();
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      const logId = pathname.split('/api/admin/bulk-logs/')[1].replace('/tools', '');
      const toolsCollection = await getCollection('tools');
      
      const tools = await toolsCollection
        .find({ bulkUploadId: logId })
        .sort({ createdAt: -1 })
        .toArray();
      
      return NextResponse.json(tools);
    }
    
    // GET /api/shop - Get all shop products
    if (pathname === '/api/shop') {
      const shopCollection = await getCollection('shop_products');
      const products = await shopCollection
        .find({ status: 'active' })
        .sort({ createdAt: -1 })
        .toArray();
      
      return NextResponse.json(products);
    }
    
    // GET /api/shop/:slug - Get single shop product
    if (pathname.startsWith('/api/shop/')) {
      const slug = pathname.split('/api/shop/')[1];
      const shopCollection = await getCollection('shop_products');
      const product = await shopCollection.findOne({ slug });
      
      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }
      
      return NextResponse.json(product);
    }
    
    // GET /api/admin/shop - Get all shop products for admin
    if (pathname === '/api/admin/shop') {
      // Temporarily skip auth for testing
      let userId = null;
      try {
        const authResult = await auth();
        userId = authResult?.userId;
      } catch (authError) {
        console.log('Auth error in GET shop (continuing):', authError.message);
      }
      
      const shopCollection = await getCollection('shop_products');
      const products = await shopCollection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
      
      return NextResponse.json(products);
    }
    
    // GET /api/admin/blogs - Get all blogs for admin
    if (pathname === '/api/admin/blogs') {
      // Temporarily skip auth for testing
      const blogsCollection = await getCollection('blogs');
      const blogs = await blogsCollection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
      
      return NextResponse.json(blogs);
    }
    
    }

    }

    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// POST handler
export async function POST(request, { params }) {
  const pathname = request.nextUrl.pathname;
  
  try {
    // HIGH PRIORITY: Reviews API Fallback
    if (pathname.match(/\/api\/reviews\/?$/)) {
      const body = await request.json();
      const { toolId, rating, comment, userName } = body;
      const { userId } = await auth();
      
      if (!toolId || !rating) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

      const reviewsCollection = await getCollection('reviews');
      const toolsCollection = await getCollection('tools');
      const editToken = !userId ? uuidv4() : null;

      const newReview = {
        toolId: String(toolId),
        rating: Number(rating),
        comment: comment || '',
        userName: userName || 'Anonymous',
        userId: userId || null,
        editToken,
        status: 'approved',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await reviewsCollection.insertOne(newReview);

      try {
        let targetTool = await toolsCollection.findOne({ _id: toolId });
        if (!targetTool && typeof toolId === 'string' && toolId.length === 24) {
          try { targetTool = await toolsCollection.findOne({ _id: new ObjectId(toolId) }); } catch (e) {}
        }
        if (targetTool) {
          const oldVotes = Number(targetTool.votes || 0);
          const oldRating = Number(targetTool.rating || 0);
          const newVotes = oldVotes + 1;
          const newRating = ((oldRating * oldVotes) + Number(rating)) / newVotes;
          await toolsCollection.updateOne({ _id: targetTool._id }, { $set: { rating: Number(newRating.toFixed(1)), votes: newVotes, updatedAt: new Date() } });
        }
      } catch (e) {}

      return NextResponse.json({ success: true, review: { ...newReview, _id: result.insertedId }, editToken });
    }
    
    // POST /api/tools - Submit tool
    if (pathname === '/api/tools' || pathname === '/api/tools/') {
      console.log('=== POST /api/tools called ===');
      
      // Temporarily skip auth for testing - TODO: Re-enable auth later
      let userId = null;
      try {
        const authResult = await auth();
        userId = authResult?.userId;
        console.log('User ID from auth:', userId);
      } catch (authError) {
        console.log('Auth error (continuing without auth):', authError.message);
      }
      
      // Allow submission without auth for testing
      if (!userId) {
        userId = 'anonymous-' + Date.now();
        console.log('Using anonymous userId:', userId);
      }
      
      const body = await request.json();
      const toolsCollection = await getCollection('tools');
      
      // Check for duplicate domain
      if (body.website) {
        try {
          const domain = new URL(body.website).hostname.replace('www.', '');
          const existingTool = await toolsCollection.findOne({
            $or: [
              { website: { $regex: domain, $options: 'i' } },
              { website: { $regex: `www.${domain}`, $options: 'i' } }
            ]
          });
          
          if (existingTool) {
            return NextResponse.json({ 
              error: 'Duplicate tool detected', 
              message: `A tool with this domain already exists: "${existingTool.name}"`,
              existingTool: {
                name: existingTool.name,
                slug: existingTool.slug,
                status: existingTool.status
              }
            }, { status: 409 });
          }
        } catch (urlError) {
          // Invalid URL format, continue with submission
          console.warn('Invalid URL format for duplicate check:', body.website);
        }
      }
      
      const newTool = {
        _id: uuidv4(),
        ...body,
        slug: body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        status: 'pending',
        featured: false,
        sponsored: false,
        trending: false,
        rating: 0,
        votes: 0,
        submittedBy: userId,
        createdAt: new Date(),
      };
      
      try {
        await toolsCollection.insertOne(newTool);
        return NextResponse.json({ success: true, tool: newTool });
      } catch (dbError) {
        console.warn('!! DEMO MODE: Database insertion failed, but returning success for testing flow !!');
        console.log('Submitted Tool Data (Not Saved):', newTool);
        return NextResponse.json({ 
          success: true, 
          message: 'Tool submitted (Demo/Fallback Mode)',
          tool: newTool 
        });
      }
    }
    
    // POST /api/blogs - Submit blog
    if (pathname === '/api/blogs' || pathname === '/api/blogs/') {
      const { userId } = await auth();
      
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      const body = await request.json();
      const blogsCollection = await getCollection('blogs');
      
      const newBlog = {
        _id: uuidv4(),
        ...body,
        slug: body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        status: 'pending',
        featured: false,
        views: 0,
        author: body.author || 'User',
        authorId: userId,
        readTime: Math.ceil((body.content?.length || 0) / 1000), // Rough estimate
        publishedAt: null,
        createdAt: new Date(),
      };
      
      await blogsCollection.insertOne(newBlog);
      
      return NextResponse.json({ success: true, blog: newBlog });
    }
    
    // POST /api/admin/blogs - Create new blog (admin)
    if (pathname === '/api/admin/blogs') {
      const body = await request.json();
      const { title, content, excerpt, coverImage, author, tags, featured, slug } = body;
      
      if (!title || !content) {
        return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
      }
      
      const blogsCollection = await getCollection('blogs');
      
      // Generate slug if not provided
      const blogSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      
      const newBlog = {
        _id: uuidv4(),
        title,
        slug: blogSlug,
        content,
        excerpt: excerpt || content.substring(0, 160),
        coverImage: coverImage || '',
        author: author || 'Admin',
        tags: tags || [],
        featured: featured || false,
        views: 0,
        status: 'published',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      await blogsCollection.insertOne(newBlog);
      
      return NextResponse.json({ success: true, blog: newBlog });
    }
    
    // POST /api/admin/bulk-tools - Bulk upload tools from CSV data
    if (pathname === '/api/admin/bulk-tools') {
      const { userId } = await auth();
      
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      const body = await request.json();
      const { tools: toolsData } = body;
      
      if (!toolsData || !Array.isArray(toolsData)) {
        return NextResponse.json({ error: 'Invalid data format. Expected { tools: [...] }' }, { status: 400 });
      }
      
      const toolsCollection = await getCollection('tools');
      const bulkLogsCollection = await getCollection('bulk_upload_logs');
      const results = { success: 0, failed: 0, skipped: 0, errors: [], toolIds: [] };
      
      // Create bulk upload log entry
      const bulkLogId = uuidv4();
      
      // Helper function to get favicon URL
      const getFaviconUrl = (website) => {
        try {
          const url = new URL(website);
          const domain = url.hostname;
          return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
        } catch {
          return null;
        }
      };
      
      // Check for duplicates first
      const existingTools = await toolsCollection.find({}).project({ website: 1 }).toArray();
      const existingDomains = new Set(
        existingTools.map(t => {
          try {
            return new URL(t.website).hostname.replace('www.', '');
          } catch {
            return null;
          }
        }).filter(Boolean)
      );
      
      for (const tool of toolsData) {
        try {
          const name = tool.Name || tool.name;
          const website = tool['Website (Original)'] || tool.website || tool.Website;
          const category = tool.Category || tool.category || tool.categories;
          const pricing = tool.Pricing || tool.pricing;
          const description = tool.Description || tool.description || tool.shortDescription;
          
          if (!name || !website) {
            results.failed++;
            results.errors.push(`Missing required fields for tool: ${name || 'Unknown'}`);
            continue;
          }
          
          try {
            const domain = new URL(website).hostname.replace('www.', '');
            if (existingDomains.has(domain)) {
              results.skipped++;
              results.errors.push(`Duplicate skipped: ${name} (${domain})`);
              continue;
            }
            existingDomains.add(domain);
          } catch {
            // Invalid URL, continue anyway
          }
          
          const logoUrl = tool.logo || tool.Logo || getFaviconUrl(website);
          const toolId = uuidv4();
          
          const newTool = {
            _id: toolId,
            name: name,
            slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            shortDescription: description?.substring(0, 150) || '',
            description: description || '',
            logo: logoUrl || 'https://via.placeholder.com/128?text=AI',
            website: website,
            categories: Array.isArray(category) ? category : (category ? category.split(',').map(c => c.trim()) : ['AI Tools']),
            tags: Array.isArray(tool.tags || tool.Tags) ? (tool.tags || tool.Tags) : (tool.tags || tool.Tags ? (tool.tags || tool.Tags).split(',').map(t => t.trim()) : []),
            pricing: pricing || 'Free',
            status: 'approved',
            featured: tool.featured === 'true' || tool.featured === true || tool.Featured === 'true' || false,
            sponsored: false,
            trending: false,
            rating: parseFloat(tool.rating || tool.Rating) || 4.5,
            votes: parseInt(tool.votes || tool.Votes) || 0,
            submittedBy: userId,
            bulkUploadId: bulkLogId,
            createdAt: new Date(),
          };
          
          await toolsCollection.insertOne(newTool);
          results.success++;
          results.toolIds.push(toolId);
        } catch (err) {
          results.failed++;
          results.errors.push(`Error adding tool ${tool.Name || tool.name}: ${err.message}`);
        }
      }
      
      // Save bulk upload log
      await bulkLogsCollection.insertOne({
        _id: bulkLogId,
        userId,
        totalTools: toolsData.length,
        successCount: results.success,
        failedCount: results.failed,
        skippedCount: results.skipped,
        toolIds: results.toolIds,
        errors: results.errors.slice(0, 20), // Keep only first 20 errors
        createdAt: new Date(),
      });
      
      return NextResponse.json({
        success: true,
        message: `Bulk upload complete. ${results.success} added, ${results.skipped} duplicates skipped, ${results.failed} failed.`,
        logId: bulkLogId,
        results
      });
    }
    
    // POST /api/admin/shop - Add shop product
    if (pathname === '/api/admin/shop') {
      const { userId } = await auth();
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      const body = await request.json();
      const shopCollection = await getCollection('shop_products');
      
      const product = {
        _id: uuidv4(),
        name: body.name,
        slug: body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        shortDescription: body.shortDescription || '',
        description: body.description || '',
        image: body.image || '',
        imageAlt: body.imageAlt || '',
        monthlyPrice: parseFloat(body.monthlyPrice) || 0,
        halfYearlyPrice: parseFloat(body.halfYearlyPrice) || 0,
        yearlyPrice: parseFloat(body.yearlyPrice) || 0,
        originalPrice: parseFloat(body.originalPrice) || 0,
        discount: parseInt(body.discount) || 80,
        features: body.features || [],
        category: body.category || 'AI Tool',
        status: 'active',
        createdBy: userId,
        createdAt: new Date(),
      };
      
      await shopCollection.insertOne(product);
      return NextResponse.json({ success: true, product });
    }
    
    // POST /api/admin/shop/bulk - Bulk upload shop products
    if (pathname === '/api/admin/shop/bulk') {
      const { userId } = await auth();
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      const body = await request.json();
      const { products } = body;
      
      if (!products || !Array.isArray(products) || products.length === 0) {
        return NextResponse.json({ error: 'No products provided' }, { status: 400 });
      }
      
      const shopCollection = await getCollection('shop_products');
      const results = { success: 0, failed: 0, errors: [] };
      
      for (const productData of products) {
        try {
          // Only price is mandatory
          if (!productData.monthlyPrice && productData.monthlyPrice !== 0) {
            results.failed++;
            results.errors.push(`Product "${productData.name || 'Unknown'}": Missing price`);
            continue;
          }
          
          const product = {
            _id: uuidv4(),
            name: productData.name || 'Unnamed Product',
            slug: (productData.name || 'product').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now(),
            shortDescription: productData.shortDescription || '',
            description: productData.description || '',
            image: productData.image || '',
            imageAlt: productData.imageAlt || '',
            monthlyPrice: parseFloat(productData.monthlyPrice) || 0,
            halfYearlyPrice: parseFloat(productData.halfYearlyPrice) || 0,
            yearlyPrice: parseFloat(productData.yearlyPrice) || 0,
            originalPrice: parseFloat(productData.originalPrice) || 0,
            discount: parseInt(productData.discount) || 80,
            features: productData.features || [],
            category: productData.category || 'AI Tool',
            status: 'active',
            createdBy: userId,
            createdAt: new Date(),
          };
          
          await shopCollection.insertOne(product);
          results.success++;
        } catch (err) {
          results.failed++;
          results.errors.push(`Product "${productData.name || 'Unknown'}": ${err.message}`);
        }
      }
      
      return NextResponse.json({
        success: true,
        message: `Uploaded ${results.success} products. ${results.failed} failed.`,
        results
      });
    }
    
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/tools/:id - Update tool
export async function PUT(request) {
  const { pathname } = new URL(request.url);
  
  try {
    const parts = pathname.split('/');
    const toolId = parts[parts.length - 1];
    
    if (pathname.includes('/api/admin/tools/') && pathname.includes('/approve')) {
      const { userId } = await auth();
      
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      const id = pathname.split('/api/admin/tools/')[1].replace('/approve', '');
      const toolsCollection = await getCollection('tools');
      
      await toolsCollection.updateOne(
        { _id: id },
        { $set: { status: 'approved' } }
      );
      
      return NextResponse.json({ success: true });
    }
    
    if (pathname.includes('/api/admin/tools/') && pathname.includes('/reject')) {
      const { userId } = await auth();
      
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      const id = pathname.split('/api/admin/tools/')[1].replace('/reject', '');
      const body = await request.json();
      const toolsCollection = await getCollection('tools');
      
      await toolsCollection.updateOne(
        { _id: id },
        { 
          $set: { 
            status: 'rejected',
            rejectionComment: body.comment || 'No reason provided',
            rejectedAt: new Date(),
            rejectedBy: userId
          } 
        }
      );
      
      return NextResponse.json({ success: true });
    }
    
    // PUT /api/admin/tools/:id/edit - Edit tool details
    if (pathname.includes('/api/admin/tools/') && pathname.includes('/edit')) {
      const { userId } = await auth();
      
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      const id = pathname.split('/api/admin/tools/')[1].replace('/edit', '');
      const body = await request.json();
      const toolsCollection = await getCollection('tools');
      
      // Build update object with only provided fields
      const updateFields = {};
      if (body.name) updateFields.name = body.name;
      if (body.shortDescription) updateFields.shortDescription = body.shortDescription;
      if (body.description) updateFields.description = body.description;
      if (body.website) updateFields.website = body.website;
      if (body.logo) updateFields.logo = body.logo;
      if (body.categories) updateFields.categories = body.categories;
      if (body.tags) updateFields.tags = body.tags;
      if (body.pricing) updateFields.pricing = body.pricing;
      if (body.status) updateFields.status = body.status;
      if (typeof body.featured === 'boolean') updateFields.featured = body.featured;
      updateFields.updatedAt = new Date();
      updateFields.updatedBy = userId;
      
      await toolsCollection.updateOne(
        { _id: id },
        { $set: updateFields }
      );
      
      return NextResponse.json({ success: true });
    }
    
    if (pathname.includes('/api/admin/tools/') && pathname.includes('/featured')) {
      const { userId } = await auth();
      
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      const id = pathname.split('/api/admin/tools/')[1].replace('/featured', '');
      const body = await request.json();
      const toolsCollection = await getCollection('tools');
      
      await toolsCollection.updateOne(
        { _id: id },
        { $set: { featured: body.featured } }
      );
      
      return NextResponse.json({ success: true });
    }
    
    if (pathname.includes('/api/admin/tools/') && pathname.includes('/trending')) {
      const { userId } = await auth();
      
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      const id = pathname.split('/api/admin/tools/')[1].replace('/trending', '');
      const body = await request.json();
      const toolsCollection = await getCollection('tools');
      
      await toolsCollection.updateOne(
        { _id: id },
        { $set: { trending: body.trending } }
      );
      
      return NextResponse.json({ success: true });
    }
    
    // Blog admin endpoints
    if (pathname.includes('/api/admin/blogs/') && pathname.includes('/approve')) {
      const { userId } = await auth();
      
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      const id = pathname.split('/api/admin/blogs/')[1].replace('/approve', '');
      const blogsCollection = await getCollection('blogs');
      
      await blogsCollection.updateOne(
        { _id: id },
        { $set: { status: 'published', publishedAt: new Date() } }
      );
      
      return NextResponse.json({ success: true });
    }
    
    if (pathname.includes('/api/admin/blogs/') && pathname.includes('/reject')) {
      const { userId } = await auth();
      
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      const id = pathname.split('/api/admin/blogs/')[1].replace('/reject', '');
      const blogsCollection = await getCollection('blogs');
      
      await blogsCollection.updateOne(
        { _id: id },
        { $set: { status: 'rejected' } }
      );
      
      return NextResponse.json({ success: true });
    }
    
    if (pathname.includes('/api/admin/blogs/') && pathname.includes('/featured')) {
      const { userId } = await auth();
      
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      const id = pathname.split('/api/admin/blogs/')[1].replace('/featured', '');
      const body = await request.json();
      const blogsCollection = await getCollection('blogs');
      
      await blogsCollection.updateOne(
        { _id: id },
        { $set: { featured: body.featured } }
      );
      
      return NextResponse.json({ success: true });
    }
    
    // PUT /api/admin/blogs/:id - Update blog
    if (pathname.match(/\/api\/admin\/blogs\/[^/]+$/) && !pathname.includes('/approve') && !pathname.includes('/reject') && !pathname.includes('/featured')) {
      const id = pathname.split('/api/admin/blogs/')[1];
      const body = await request.json();
      const blogsCollection = await getCollection('blogs');
      
      const updateFields = { updatedAt: new Date() };
      if (body.title !== undefined) updateFields.title = body.title;
      if (body.slug !== undefined) updateFields.slug = body.slug;
      if (body.content !== undefined) updateFields.content = body.content;
      if (body.excerpt !== undefined) updateFields.excerpt = body.excerpt;
      if (body.coverImage !== undefined) updateFields.coverImage = body.coverImage;
      if (body.author !== undefined) updateFields.author = body.author;
      if (body.tags !== undefined) updateFields.tags = body.tags;
      if (body.featured !== undefined) updateFields.featured = body.featured;
      
      await blogsCollection.updateOne(
        { _id: id },
        { $set: updateFields }
      );
      
      return NextResponse.json({ success: true });
    }
    
    // User admin endpoints
    if (pathname.includes('/api/admin/users/') && pathname.includes('/make-admin')) {
      const { userId: currentUserId } = await auth();
      
      if (!currentUserId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      const targetUserId = pathname.split('/api/admin/users/')[1].replace('/make-admin', '');
      const usersCollection = await getCollection('users');
      
      // Check if target user already exists
      const existing = await usersCollection.findOne({ userId: targetUserId });
      
      if (existing) {
        await usersCollection.updateOne(
          { userId: targetUserId },
          { $set: { role: 'admin', updatedAt: new Date() } }
        );
      } else {
        await usersCollection.insertOne({
          _id: uuidv4(),
          userId: targetUserId,
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      
      return NextResponse.json({ success: true });
    }
    
    if (pathname.includes('/api/admin/users/') && pathname.includes('/remove-admin')) {
      const { userId: currentUserId } = await auth();
      
      if (!currentUserId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      const targetUserId = pathname.split('/api/admin/users/')[1].replace('/remove-admin', '');
      const usersCollection = await getCollection('users');
      
      await usersCollection.updateOne(
        { userId: targetUserId },
        { $set: { role: 'user', updatedAt: new Date() } }
      );
      
      return NextResponse.json({ success: true });
    }
    
    // PUT /api/admin/shop/:id - Update shop product
    if (pathname.startsWith('/api/admin/shop/')) {
      const { userId } = await auth();
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      const id = pathname.split('/api/admin/shop/')[1];
      const body = await request.json();
      const shopCollection = await getCollection('shop_products');
      
      const updateFields = {};
      if (body.name) updateFields.name = body.name;
      if (body.shortDescription !== undefined) updateFields.shortDescription = body.shortDescription;
      if (body.description !== undefined) updateFields.description = body.description;
      if (body.image) updateFields.image = body.image;
      if (body.monthlyPrice !== undefined) updateFields.monthlyPrice = parseFloat(body.monthlyPrice);
      if (body.halfYearlyPrice !== undefined) updateFields.halfYearlyPrice = parseFloat(body.halfYearlyPrice);
      if (body.yearlyPrice !== undefined) updateFields.yearlyPrice = parseFloat(body.yearlyPrice);
      if (body.originalPrice !== undefined) updateFields.originalPrice = parseFloat(body.originalPrice);
      if (body.discount !== undefined) updateFields.discount = parseInt(body.discount);
      if (body.features) updateFields.features = body.features;
      if (body.category) updateFields.category = body.category;
      if (body.status) updateFields.status = body.status;
      updateFields.updatedAt = new Date();
      
      await shopCollection.updateOne({ _id: id }, { $set: updateFields });
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE handler
export async function DELETE(request, { params }) {
  const pathname = request.nextUrl.pathname;
  const { searchParams } = new URL(request.url);
  
  try {
    // HIGH PRIORITY: Reviews API Fallback
    if (pathname.match(/\/api\/reviews\/?$/)) {
      const reviewId = searchParams.get('id');
      const editToken = searchParams.get('editToken');
      const { userId } = await auth();

      if (!reviewId) return NextResponse.json({ error: 'Review ID required' }, { status: 400 });

      const reviewsCollection = await getCollection('reviews');
      const toolsCollection = await getCollection('tools');

      let query = { _id: reviewId };
      let review = await reviewsCollection.findOne(query);
      if (!review) {
        try { query = { _id: new ObjectId(reviewId) }; review = await reviewsCollection.findOne(query); } catch (e) {}
      }

      if (!review) return NextResponse.json({ error: 'Review not found' }, { status: 404 });

      const usersCollection = await getCollection('users');
      const userIsAdmin = userId && await usersCollection.findOne({ userId, role: 'admin' });
      const userIsOwner = userId && review.userId === userId;
      const hasValidToken = editToken && review.editToken === editToken;

      if (!userIsAdmin && !userIsOwner && !hasValidToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      await reviewsCollection.deleteOne(query);

      try {
        const toolId = review.toolId;
        const allReviews = await reviewsCollection.find({ toolId, status: 'approved' }).toArray();
        const newVotes = allReviews.length;
        const newRating = newVotes > 0 ? Number((allReviews.reduce((acc, rev) => acc + rev.rating, 0) / newVotes).toFixed(1)) : 0;
        await toolsCollection.updateOne({ $or: [{ _id: toolId }, { _id: String(toolId) }] }, { $set: { rating: newRating, votes: newVotes } });
      } catch (e) {}

      return NextResponse.json({ success: true });
    }

    // Temporarily skip auth for testing
    let userId = null;
    try {
      const authResult = await auth();
      userId = authResult?.userId;
    } catch (authError) {
      console.log('Auth error in DELETE (continuing):', authError.message);
    }
    
    if (!userId) {
      userId = 'anonymous-delete';
      console.log('Using anonymous userId for DELETE');
    }
    }
    
    // Delete tool
    if (pathname.startsWith('/api/tools/')) {
      const id = pathname.split('/api/tools/')[1];
      const toolsCollection = await getCollection('tools');
      
      await toolsCollection.deleteOne({ _id: id });
      
      return NextResponse.json({ success: true });
    }
    
    // Delete blog
    if (pathname.startsWith('/api/blogs/')) {
      const id = pathname.split('/api/blogs/')[1];
      const blogsCollection = await getCollection('blogs');
      
      await blogsCollection.deleteOne({ _id: id });
      
      return NextResponse.json({ success: true });
    }
    
    // Delete blog (admin route)
    if (pathname.startsWith('/api/admin/blogs/')) {
      const id = pathname.split('/api/admin/blogs/')[1];
      const blogsCollection = await getCollection('blogs');
      
      await blogsCollection.deleteOne({ _id: id });
      
      return NextResponse.json({ success: true });
    }
    
    // Delete shop product
    if (pathname.startsWith('/api/admin/shop/')) {
      const id = pathname.split('/api/admin/shop/')[1];
      const shopCollection = await getCollection('shop_products');
      
      await shopCollection.deleteOne({ _id: id });
      
      return NextResponse.json({ success: true });
    }
    
    // Undo bulk upload - delete all tools from a bulk upload
    if (pathname.startsWith('/api/admin/bulk-logs/') && pathname.endsWith('/undo')) {
      const logId = pathname.split('/api/admin/bulk-logs/')[1].replace('/undo', '');
      const toolsCollection = await getCollection('tools');
      const bulkLogsCollection = await getCollection('bulk_upload_logs');
      
      // Delete all tools from this bulk upload
      const result = await toolsCollection.deleteMany({ bulkUploadId: logId });
      
      // Update the log to mark as undone
      await bulkLogsCollection.updateOne(
        { _id: logId },
        { $set: { undone: true, undoneAt: new Date(), deletedCount: result.deletedCount } }
      );
      
      return NextResponse.json({ 
        success: true, 
        message: `Deleted ${result.deletedCount} tools from bulk upload`,
        deletedCount: result.deletedCount 
      });
    }
    
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// PATCH /api/reviews - Update review (Fallback)
export async function PATCH(request, { params }) {
  const pathname = request.nextUrl.pathname;
  if (!pathname.match(/\/api\/reviews\/?$/)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  try {
    const body = await request.json();
    const { reviewId, rating, comment, editToken } = body;
    const { userId } = await auth();

    if (!reviewId) return NextResponse.json({ error: 'Review ID required' }, { status: 400 });

    const reviewsCollection = await getCollection('reviews');
    const toolsCollection = await getCollection('tools');

    let query = { _id: reviewId };
    let review = await reviewsCollection.findOne(query);
    if (!review) {
      try { query = { _id: new ObjectId(reviewId) }; review = await reviewsCollection.findOne(query); } catch (e) {}
    }

    if (!review) return NextResponse.json({ error: 'Review not found' }, { status: 404 });

    const usersCollection = await getCollection('users');
    const userIsAdmin = userId && await usersCollection.findOne({ userId, role: 'admin' });
    const userIsOwner = userId && review.userId === userId;
    const hasValidToken = editToken && review.editToken === editToken;

    if (!userIsAdmin && !userIsOwner && !hasValidToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await reviewsCollection.updateOne(query, {
      $set: { rating: Number(rating), comment, updatedAt: new Date() }
    });

    try {
      const toolId = review.toolId;
      const allReviews = await reviewsCollection.find({ toolId, status: 'approved' }).toArray();
      const newVotes = allReviews.length;
      const newRating = Number((allReviews.reduce((acc, rev) => acc + rev.rating, 0) / newVotes).toFixed(1));
      await toolsCollection.updateOne({ $or: [{ _id: toolId }, { _id: String(toolId) }] }, { $set: { rating: newRating, votes: newVotes } });
    } catch (e) {}

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PATCH Fallback Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}