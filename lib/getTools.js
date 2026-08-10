import { getCollection } from './db';
import { tools as sampleTools, categories as sampleCategories } from './sample-data';
import { serializeData } from './utils';

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
    let suggestion = null;
    
    if (category) {
      query.categories = category;
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
      createdAt: 1,
      translations: 1
    };
    
    let tools = [];
    let total = 0;

    if (search) {
      // Atlas Search with Fuzzy matching
      try {
        const searchResults = await toolsCollection.aggregate([
          {
            $search: {
              index: 'default',
              text: {
                query: search,
                path: 'name',
                fuzzy: { maxEdits: 2 }
              }
            }
          },
          { $match: { status: 'approved' } },
          {
            $facet: {
              results: [
                { $sort: sortQuery._id ? sortQuery : { score: { $meta: 'searchScore' } } },
                { $skip: skip },
                { $limit: limit },
                { $project: { ...projection, score: { $meta: 'searchScore' } } }
              ],
              total: [{ $count: 'count' }]
            }
          }
        ]).toArray();

        tools = searchResults[0].results;
        total = searchResults[0].total[0]?.count || 0;

        // If no results, trigger fallback
        if (tools.length === 0) {
            throw new Error('No search results');
        }

        // Suggestion logic
        if (tools.length > 0 && tools[0].name.toLowerCase() !== search.toLowerCase()) {
            suggestion = tools[0].name;
        }
      } catch (e) {
        // Fallback to robust regex search (Name only)
        const regexQuery = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        query.name = { $regex: regexQuery, $options: 'i' };
        
        [tools, total] = await Promise.all([
          toolsCollection.find(query, { projection }).sort(sortQuery).skip(skip).limit(limit).toArray(),
          toolsCollection.countDocuments(query)
        ]);
      }
    } else {
      [tools, total] = await Promise.all([
        toolsCollection.find(query, { projection }).sort(sortQuery).skip(skip).limit(limit).toArray(),
        toolsCollection.countDocuments(query)
      ]);
    }
    
    return {
      tools: serializeData(tools), // Serialize for client
      total,
      suggestion,
      page,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.warn('Database fetching failed, using fallback data:', error.message);
    const fallbackTools = sampleTools.slice(0, limit);
    return {
      tools: serializeData(fallbackTools),
      total: sampleTools.length,
      page: 1,
      totalPages: Math.ceil(sampleTools.length / limit),
      isFallback: true
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
    
    return serializeData(categoriesWithCount); // Serialize for client
  } catch (error) {
    console.error('Error fetching categories, using fallback:', error.message);
    return serializeData(sampleCategories.slice(0, 20).map(c => ({
      ...c,
      toolCount: Math.floor(Math.random() * 50) + 10
    })));
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
    
    return serializeData(tool); // Serialize for client
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
    
    return serializeData(featured); // Serialize for client
  } catch (error) {
    console.error('Error fetching featured tools, using fallback:', error.message);
    return serializeData(sampleTools.filter(t => t.featured).slice(0, limit));
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
    
    return serializeData(trending); // Serialize for client
  } catch (error) {
    console.error('Error fetching trending tools, using fallback:', error.message);
    return serializeData(sampleTools.filter(t => t.trending).slice(0, limit));
  }
}