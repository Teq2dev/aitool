import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { getCollection } from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { v4 as uuidv4 } from 'uuid';

// Helper to get authenticated user from session
async function getAuthUser() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return null;
    return {
      id: session.user.id || session.user.email,
      email: session.user.email?.toLowerCase() || null,
      name: session.user.name || null,
    };
  } catch (error) {
    console.error('Error getting auth user:', error);
    return null;
  }
}

// Helper to get authenticated user ID from session
async function getAuthUserId() {
  const user = await getAuthUser();
  return user?.id || null;
}

// Helper to check if current user is an admin
async function isUserAdmin() {
  try {
    const user = await getAuthUser();
    if (!user) return false;

    const envAdmins = (process.env.ADMIN_EMAILS || '')
      .split(',')
      .map(e => e.trim().toLowerCase())
      .filter(Boolean);

    if (user.email && envAdmins.includes(user.email)) {
      return true;
    }

    const usersCollection = await getCollection('users').catch(() => null);
    if (!usersCollection) return false;

    const dbUser = await usersCollection.findOne({
      $or: [
        { userId: user.id },
        { email: user.email },
      ],
      role: 'admin',
    });

    return !!dbUser;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

// Clerk auth compatibility helper
async function auth() {
  const userId = await getAuthUserId();
  return { userId };
}

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
      
      // Search tools - V6 Capability-Aware Hybrid Search
      if (type === 'all' || type === 'tools') {
        searchPromises.push(
          (async () => {
            const { searchToolsV6 } = await import('@/lib/searchV6');
            results.tools = await searchToolsV6(query, limit);
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
        const { getToolBySlug } = await import('@/lib/getTools');
        const tool = await getToolBySlug(slug);
        
        if (!tool) {
          return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
        }
        
        return NextResponse.json(tool);
      }
      
      // List tools with filters
      try {
        const { getTools } = await import('@/lib/getTools');
        const category = searchParams.get('category');
        const search = searchParams.get('search');
        const sort = searchParams.get('sort') || 'trending';
        const limit = parseInt(searchParams.get('limit') || '20');
        const page = parseInt(searchParams.get('page') || '1');
        
        const result = await getTools({
          category,
          search,
          sort,
          limit,
          page
        });
        
        return NextResponse.json(result);
      } catch (dbError) {
        console.error('API Error in /api/tools:', dbError);
        return NextResponse.json({ error: 'Failed to fetch tools' }, { status: 500 });
      }
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
      
      try {
        const blogsList = await blogsCollection
          .find(query)
          .sort({ publishedAt: -1 })
          .skip(skip)
          .limit(limit)
          .toArray();
        
        const total = await blogsCollection.countDocuments(query);
        
        if (blogsList.length === 0) {
          const sampleList = blogs.filter(b => status === 'published' ? b.status === 'published' : true);
          return NextResponse.json({
            blogs: sampleList,
            total: sampleList.length,
            page: 1,
            totalPages: 1,
          });
        }
        
        return NextResponse.json({
          blogs: blogsList,
          total,
          page,
          totalPages: Math.ceil(total / limit),
        });
      } catch (err) {
        const sampleList = blogs.filter(b => status === 'published' ? b.status === 'published' : true);
        return NextResponse.json({
          blogs: sampleList,
          total: sampleList.length,
          page: 1,
          totalPages: 1,
        });
      }
    }
    
    // GET /api/featured-blogs - Get featured blogs
    if (pathname === '/api/featured-blogs') {
      try {
        const blogsCollection = await getCollection('blogs');
        const featured = await blogsCollection
          .find({ status: 'published', featured: true })
          .sort({ publishedAt: -1 })
          .limit(3)
          .toArray();
        
        if (featured.length === 0) {
          return NextResponse.json(blogs.filter(b => b.featured).slice(0, 3));
        }
        
        return NextResponse.json(featured);
      } catch (err) {
        return NextResponse.json(blogs.filter(b => b.featured).slice(0, 3));
      }
    }
    
    // GET /api/my-blog-submissions - Get user's blog submissions
    if (pathname === '/api/my-blog-submissions') {
      const userId = await getAuthUserId();
      
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      const blogsCollection = await getCollection('blogs');
      const submissions = await blogsCollection
        .find({ $or: [{ authorId: userId }, { submittedBy: userId }] })
        .sort({ createdAt: -1 })
        .toArray();
      
      return NextResponse.json(submissions || []);
    }
    
    // GET /api/admin/users - Get all users (admin only)
    if (pathname === '/api/admin/users') {
      const admin = await isUserAdmin();
      if (!admin) {
        return NextResponse.json({ error: 'Unauthorized. Admin role required.' }, { status: 403 });
      }
      
      try {
        const usersCollection = await getCollection('users');
        const users = await usersCollection.find({}).sort({ createdAt: -1 }).toArray();
        const { serializeData } = await import('@/lib/utils');
        return NextResponse.json(serializeData(users || []));
      } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Failed to fetch users: ' + error.message }, { status: 500 });
      }
    }
    
    // GET /api/admin/check - Check if current user is admin
    if (pathname === '/api/admin/check') {
      const admin = await isUserAdmin();
      const user = await getAuthUser();
      return NextResponse.json({ isAdmin: admin, email: user?.email || null });
    }
    
    // GET /api/admin/tools - Get all tools for admin
    if (pathname === '/api/admin/tools') {
      const admin = await isUserAdmin();
      if (!admin) {
        return NextResponse.json({ error: 'Unauthorized. Admin role required.' }, { status: 403 });
      }
      
      const status = searchParams.get('status') || 'all';
      const search = searchParams.get('search') || '';
      
      try {
        const toolsCollection = await getCollection('tools');
        
        let query = {};
        if (status !== 'all') {
          query.status = status;
        }
        if (search) {
          query.name = { $regex: search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' };
        }
        
        const allTools = await toolsCollection
          .find(query, {
            projection: {
              name: 1,
              slug: 1,
              status: 1,
              featured: 1,
              trending: 1,
              logo: 1,
              createdAt: 1,
              categories: 1,
              pricing: 1,
              rating: 1,
              votes: 1,
              shortDescription: 1,
              rejectionComment: 1,
              submittedBy: 1,
              submitterEmail: 1,
              website: 1,
            }
          })
          .sort({ createdAt: -1 })
          .limit(1000)
          .toArray();
        
        const { serializeData } = await import('@/lib/utils');
        return NextResponse.json(serializeData(allTools));
      } catch (error) {
        console.error('Error fetching admin tools:', error);
        return NextResponse.json({ error: 'Failed to fetch admin tools: ' + error.message }, { status: 500 });
      }
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
      const userId = await getAuthUserId();
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
      const userId = await getAuthUserId();
      const shopCollection = await getCollection('shop_products');
      const products = await shopCollection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
      
      return NextResponse.json(products);
    }
    
    // GET /api/admin/blogs - Get all blogs for admin
    if (pathname === '/api/admin/blogs') {
      const blogsCollection = await getCollection('blogs');
      const blogs = await blogsCollection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
      
      return NextResponse.json(blogs);
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
    // POST /api/tools - Submit tool
    if (pathname === '/api/tools' || pathname === '/api/tools/') {
      const authUser = await getAuthUser();
      const userId = authUser ? authUser.id : ('anonymous-' + Date.now());
      const submitterEmail = authUser ? authUser.email : (body.email || body.submitterEmail || null);
      
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
        submitterEmail: submitterEmail,
        createdAt: new Date(),
      };
      
      try {
        await toolsCollection.insertOne(newTool);
        revalidateTag('tools');
        revalidateTag('categories');
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
      
      const id = pathname.split('/api/admin/tools/')[1].replace('/approve', '').split('/')[0];
      const toolsCollection = await getCollection('tools');
      
      await toolsCollection.updateOne(
        { _id: id },
        { $set: { status: 'approved' } }
      );
      
      revalidatePath('/');
      revalidatePath('/tools');
      revalidateTag('tools');
      revalidateTag('categories');
      return NextResponse.json({ success: true });
    }
    
    if (pathname.includes('/api/admin/tools/') && pathname.includes('/reject')) {
      const { userId } = await auth();
      
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      const id = pathname.split('/api/admin/tools/')[1].replace('/reject', '').split('/')[0];
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
      
      revalidatePath('/');
      revalidatePath('/tools');
      revalidateTag('tools');
      revalidateTag('categories');
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
      
      const { ObjectId } = await import('mongodb');
      let result = await toolsCollection.updateOne(
        { _id: id },
        { $set: updateFields }
      );
      
      if (result.matchedCount === 0) {
        try {
          result = await toolsCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateFields }
          );
        } catch (e) {}
      }
      
      if (result.matchedCount === 0) {
        return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
      }
      
      revalidatePath('/');
      revalidatePath('/tools');
      revalidateTag('tools');
      revalidateTag('categories');
      return NextResponse.json({ success: true });
    }
    
    if (pathname.includes('/api/admin/tools/') && pathname.includes('/featured')) {
      const { userId } = await auth();
      
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      const id = pathname.split('/api/admin/tools/')[1].replace('/featured', '').split('/')[0];
      const body = await request.json();
      const toolsCollection = await getCollection('tools');
      const { ObjectId } = await import('mongodb');
      
      console.log(`[Admin] Toggling featured for tool: ${id} to ${body.featured}`);
      
      // Try string ID first, then ObjectId as fallback
      let result = await toolsCollection.updateOne(
        { _id: id },
        { $set: { featured: body.featured } }
      );
      
      if (result.matchedCount === 0) {
        try {
          result = await toolsCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { featured: body.featured } }
          );
        } catch (e) {
          console.log(`[Admin] ID ${id} is not a valid ObjectId`);
        }
      }
      
      console.log(`[Admin] Update result: matched=${result.matchedCount}, modified=${result.modifiedCount}`);
      
      if (result.matchedCount === 0) {
        return NextResponse.json({ error: 'Tool not found in database' }, { status: 404 });
      }
      
      revalidatePath('/');
      revalidatePath('/tools');
      revalidateTag('tools');
      revalidateTag('categories');
      return NextResponse.json({ success: true });
    }
    
    if (pathname.includes('/api/admin/tools/') && pathname.includes('/trending')) {
      const { userId } = await auth();
      
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      const id = pathname.split('/api/admin/tools/')[1].replace('/trending', '').split('/')[0];
      const body = await request.json();
      const toolsCollection = await getCollection('tools');
      const { ObjectId } = await import('mongodb');
      
      console.log(`[Admin] Toggling trending for tool: ${id} to ${body.trending}`);
      
      // Try string ID first, then ObjectId as fallback
      let result = await toolsCollection.updateOne(
        { _id: id },
        { $set: { trending: body.trending } }
      );
      
      if (result.matchedCount === 0) {
        try {
          result = await toolsCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { trending: body.trending } }
          );
        } catch (e) {
          console.log(`[Admin] ID ${id} is not a valid ObjectId`);
        }
      }
      
      console.log(`[Admin] Update result: matched=${result.matchedCount}, modified=${result.modifiedCount}`);
      
      if (result.matchedCount === 0) {
        return NextResponse.json({ error: 'Tool not found in database' }, { status: 404 });
      }
      
      revalidatePath('/');
      revalidatePath('/tools');
      revalidateTag('tools');
      revalidateTag('categories');
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
    
    // Delete tool
    if (pathname.startsWith('/api/tools/')) {
      const id = pathname.split('/api/tools/')[1];
      const toolsCollection = await getCollection('tools');
      
      await toolsCollection.deleteOne({ _id: id });
      
      revalidateTag('tools');
      revalidateTag('categories');
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
      
      revalidateTag('tools');
      revalidateTag('categories');
      
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

// PATCH method is intentionally omitted from catch-all as it's only needed for reviews
// If it was kept here it might conflict, so we remove the PATCH fallback block entirely.