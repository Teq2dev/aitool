import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/db';
import { categories, tools, blogs } from '@/lib/sample-data';
import { auth } from '@clerk/nextjs/server';
import { v4 as uuidv4 } from 'uuid';

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
      const results = { success: 0, failed: 0, errors: [] };
      
      for (const tool of toolsData) {
        try {
          // Validate required fields
          if (!tool.name || !tool.website) {
            results.failed++;
            results.errors.push(`Missing required fields for tool: ${tool.name || 'Unknown'}`);
            continue;
          }
          
          const newTool = {
            _id: uuidv4(),
            name: tool.name,
            slug: tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            shortDescription: tool.shortDescription || tool.description?.substring(0, 150) || '',
            description: tool.description || '',
            logo: tool.logo || `https://www.google.com/s2/favicons?domain=${tool.website}&sz=128`,
            website: tool.website,
            categories: Array.isArray(tool.categories) ? tool.categories : (tool.categories ? tool.categories.split(',').map(c => c.trim()) : ['AI Tools']),
            tags: Array.isArray(tool.tags) ? tool.tags : (tool.tags ? tool.tags.split(',').map(t => t.trim()) : []),
            pricing: tool.pricing || 'Free',
            status: 'approved', // Admin uploaded tools are auto-approved
            featured: tool.featured === 'true' || tool.featured === true || false,
            sponsored: false,
            trending: false,
            rating: parseFloat(tool.rating) || 4.5,
            votes: parseInt(tool.votes) || 0,
            submittedBy: userId,
            createdAt: new Date(),
          };
          
          await toolsCollection.insertOne(newTool);
          results.success++;
        } catch (err) {
          results.failed++;
          results.errors.push(`Error adding tool ${tool.name}: ${err.message}`);
        }
      }
      
      return NextResponse.json({
        success: true,
        message: `Bulk upload complete. ${results.success} tools added, ${results.failed} failed.`,
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