import { getCollection } from './db';

/**
 * Server-side function to fetch tools from MongoDB
 * Can be called directly from Server Components
 */
export async function getTools({ 
  category = null, 
  search = null, 
  sort = 'trending', 
  status = 'approved',
  limit = 12,
  page = 1 
} = {}) {
  try {
    const toolsCollection = await getCollection('tools');
    
    // Build query
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
    
    // Build sort query
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
    
    const [tools, total] = await Promise.all([
      toolsCollection
        .find(query, { projection })
        .sort(sortQuery)
        .skip(skip)
        .limit(limit)
        .toArray(),
      toolsCollection.countDocuments(query)
    ]);
    
    return {
      tools: JSON.parse(JSON.stringify(tools)), // Serialize for client
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error('Error fetching tools:', error);
    return {
      tools: [],
      total: 0,
      page: 1,
      totalPages: 1,
      error: error.message
    };
  }
}

/**
 * Server-side function to fetch categories from MongoDB
 */
export async function getCategories() {
  try {
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
    
    return JSON.parse(JSON.stringify(categoriesWithCount)); // Serialize for client
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Server-side function to fetch a single tool by slug
 */
export async function getToolBySlug(slug) {
  try {
    const toolsCollection = await getCollection('tools');
    const tool = await toolsCollection.findOne({ slug });
    
    if (!tool) {
      return null;
    }
    
    return JSON.parse(JSON.stringify(tool)); // Serialize for client
  } catch (error) {
    console.error('Error fetching tool:', error);
    return null;
  }
}

/**
 * Server-side function to fetch featured tools
 */
export async function getFeaturedTools(limit = 6) {
  try {
    const toolsCollection = await getCollection('tools');
    const featured = await toolsCollection
      .find({ status: 'approved', featured: true })
      .sort({ votes: -1 })
      .limit(limit)
      .toArray();
    
    return JSON.parse(JSON.stringify(featured)); // Serialize for client
  } catch (error) {
    console.error('Error fetching featured tools:', error);
    return [];
  }
}

/**
 * Server-side function to fetch trending tools
 */
export async function getTrendingTools(limit = 10) {
  try {
    const toolsCollection = await getCollection('tools');
    const trending = await toolsCollection
      .find({ status: 'approved', trending: true })
      .sort({ votes: -1 })
      .limit(limit)
      .toArray();
    
    return JSON.parse(JSON.stringify(trending)); // Serialize for client
  } catch (error) {
    console.error('Error fetching trending tools:', error);
    return [];
  }
}