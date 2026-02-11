import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/db';
import { categories, tools, blogs } from '@/lib/sample-data';
import { auth } from '@clerk/nextjs/server';
import { v4 as uuidv4 } from 'uuid';

// Helper function to create text indexes for search
async function createSearchIndexes() {
  try {
    const toolsCollection = await getCollection('tools');
    const blogsCollection = await getCollection('blogs');
    const categoriesCollection = await getCollection('categories');
    
    // Create regular indexes for faster queries
    try {
      await toolsCollection.createIndex({ status: 1 });
      await toolsCollection.createIndex({ name: 1 });
      await toolsCollection.createIndex({ categories: 1 });
      await toolsCollection.createIndex({ createdAt: -1 });
      await toolsCollection.createIndex({ status: 1, name: 1 });
    } catch (e) {}
    
    try {
      await blogsCollection.createIndex({ status: 1 });
      await blogsCollection.createIndex({ title: 1 });
      await blogsCollection.createIndex({ createdAt: -1 });
    } catch (e) {}
    
    try {
      await categoriesCollection.createIndex({ name: 1 });
      await categoriesCollection.createIndex({ type: 1 });
    } catch (e) {}
    
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

// GET /api - Health check
export async function GET(request) {
  const { pathname, searchParams } = new URL(request.url);
  
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
      
      // Search tools - optimized: search only name first
      if (type === 'all' || type === 'tools') {
        searchPromises.push(
          (async () => {
            const toolsCollection = await getCollection('tools');
            results.tools = await toolsCollection
              .find({
                status: 'approved',
                $or: [
                  { name: fastRegex },
                  { shortDescription: fastRegex },
                  { tags: fastRegex }
                ]
              })
              .project({ name: 1, slug: 1, shortDescription: 1, logo: 1, categories: 1, pricing: 1 })
              .limit(limit)
              .toArray();
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
      
      return NextResponse.json({
        query,
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
      const toolsCollection = await getCollection('tools');
      const category = searchParams.get('category');
      const search = searchParams.get('search');
      const sort = searchParams.get('sort') || 'trending';
      const status = searchParams.get('status') || 'approved';
      const limit = parseInt(searchParams.get('limit') || '20');
      const page = parseInt(searchParams.get('page') || '1');
      
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
      
      const skip = (page - 1) * limit;
      
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
      
      const toolsList = await toolsCollection
        .find(query, { projection })
        .sort(sortQuery)
        .skip(skip)
        .limit(limit)
        .toArray();
      
      const total = await toolsCollection.countDocuments(query);
      
      return NextResponse.json({
        tools: toolsList,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      });
    }
    
    // GET /api/categories - List all categories
    if (pathname.startsWith('/api/categories')) {
      const categoriesCollection = await getCollection('categories');
      const toolsCollection = await getCollection('tools');
      
      // Limit categories to 100 max
      const categoriesList = await categoriesCollection.find({}).limit(100).toArray();
      
      // Optimized: Get tool counts using aggregation instead of N+1 queries
      const toolCounts = await toolsCollection.aggregate([
        { $match: { status: 'approved' } },
        { $unwind: '$categories' },
        { $group: { _id: '$categories', count: { $sum: 1 } } }
      ]).toArray();
      
      // Create a map for quick lookup
      const countMap = {};
      toolCounts.forEach(item => {
        countMap[item._id] = item.count;
      });
      
      // Merge counts with categories
      const categoriesWithCount = categoriesList.map(cat => ({
        ...cat,
        toolCount: countMap[cat.slug] || 0
      }));
      
      return NextResponse.json(categoriesWithCount);
    }
    
    // GET /api/featured - Get featured tools
    if (pathname === '/api/featured') {
      const toolsCollection = await getCollection('tools');
      const featured = await toolsCollection
        .find({ status: 'approved', featured: true })
        .sort({ votes: -1 })
        .limit(6)
        .toArray();
      
      return NextResponse.json(featured);
    }
    
    // GET /api/trending - Get trending tools
    if (pathname === '/api/trending') {
      const toolsCollection = await getCollection('tools');
      const trending = await toolsCollection
        .find({ status: 'approved', trending: true })
        .sort({ votes: -1 })
        .limit(10)
        .toArray();
      
      return NextResponse.json(trending);
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
    
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/tools - Submit new tool
export async function POST(request) {
  const { pathname } = new URL(request.url);
  
  try {
    // POST /api/tools - Submit tool
    if (pathname === '/api/tools' || pathname === '/api/tools/') {
      const { userId } = await auth();
      
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
      
      await toolsCollection.insertOne(newTool);
      
      return NextResponse.json({ success: true, tool: newTool });
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
      const results = { success: 0, failed: 0, skipped: 0, errors: [] };
      
      // Helper function to get favicon URL
      const getFaviconUrl = (website) => {
        try {
          const url = new URL(website);
          const domain = url.hostname;
          // Use Google's high-quality favicon service
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
          // Support multiple column name formats
          const name = tool.Name || tool.name;
          const website = tool['Website (Original)'] || tool.website || tool.Website;
          const category = tool.Category || tool.category || tool.categories;
          const pricing = tool.Pricing || tool.pricing;
          const description = tool.Description || tool.description || tool.shortDescription;
          
          // Validate required fields
          if (!name || !website) {
            results.failed++;
            results.errors.push(`Missing required fields for tool: ${name || 'Unknown'}`);
            continue;
          }
          
          // Check for duplicate domain
          try {
            const domain = new URL(website).hostname.replace('www.', '');
            if (existingDomains.has(domain)) {
              results.skipped++;
              results.errors.push(`Duplicate skipped: ${name} (${domain})`);
              continue;
            }
            existingDomains.add(domain); // Add to set to prevent duplicates within same upload
          } catch {
            // Invalid URL, continue anyway
          }
          
          // Auto-fetch favicon
          const logoUrl = tool.logo || tool.Logo || getFaviconUrl(website);
          
          const newTool = {
            _id: uuidv4(),
            name: name,
            slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            shortDescription: description?.substring(0, 150) || '',
            description: description || '',
            logo: logoUrl || 'https://via.placeholder.com/128?text=AI',
            website: website,
            categories: Array.isArray(category) ? category : (category ? category.split(',').map(c => c.trim()) : ['AI Tools']),
            tags: Array.isArray(tool.tags || tool.Tags) ? (tool.tags || tool.Tags) : (tool.tags || tool.Tags ? (tool.tags || tool.Tags).split(',').map(t => t.trim()) : []),
            pricing: pricing || 'Free',
            status: 'approved', // Admin uploaded tools are auto-approved
            featured: tool.featured === 'true' || tool.featured === true || tool.Featured === 'true' || false,
            sponsored: false,
            trending: false,
            rating: parseFloat(tool.rating || tool.Rating) || 4.5,
            votes: parseInt(tool.votes || tool.Votes) || 0,
            submittedBy: userId,
            createdAt: new Date(),
          };
          
          await toolsCollection.insertOne(newTool);
          results.success++;
        } catch (err) {
          results.failed++;
          results.errors.push(`Error adding tool ${tool.Name || tool.name}: ${err.message}`);
        }
      }
      
      return NextResponse.json({
        success: true,
        message: `Bulk upload complete. ${results.success} added, ${results.skipped} duplicates skipped, ${results.failed} failed.`,
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
    
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/tools/:id - Delete tool or blog
export async function DELETE(request) {
  const { pathname } = new URL(request.url);
  
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
    
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}