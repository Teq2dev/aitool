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
      
      const toolsList = await toolsCollection
        .find(query)
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
      
      const categoriesList = await categoriesCollection.find({}).toArray();
      
      // Count tools for each category
      const categoriesWithCount = await Promise.all(
        categoriesList.map(async (cat) => {
          const count = await toolsCollection.countDocuments({
            categories: cat.slug,
            status: 'approved',
          });
          return { ...cat, toolCount: count };
        })
      );
      
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
      const toolsCollection = await getCollection('tools');
      
      await toolsCollection.updateOne(
        { _id: id },
        { $set: { status: 'rejected' } }
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
    
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/tools/:id - Delete tool
export async function DELETE(request) {
  const { pathname } = new URL(request.url);
  
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const id = pathname.split('/api/tools/')[1];
    const toolsCollection = await getCollection('tools');
    
    await toolsCollection.deleteOne({ _id: id });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}