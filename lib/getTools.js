import { getCollection } from './db';
import { tools as sampleTools, categories as sampleCategories } from './sample-data';
import { serializeData } from './utils';
import { unstable_cache } from 'next/cache';

/**
 * Server-side function to fetch tools from MongoDB
 * Can be called directly from Server Components
 */
const _getTools = async function({ 
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
    console.error('Database fetching failed, using fallback:', error.message);
    const filtered = sampleTools || [];
    return {
      tools: serializeData(filtered.slice(0, limit)),
      total: filtered.length,
      suggestion: null,
      page,
      totalPages: Math.ceil(filtered.length / limit),
    };
  }
}

/**
 * Server-side function to fetch categories from MongoDB
 */
const _getCategories = async function() {
  try {
    const categoriesCollection = await getCollection('categories');
    const toolsCollection = await getCollection('tools');
    
    // Fetch categories and aggregate tool counts in parallel (2 queries total instead of 44)
    const [categoriesList, countAgg] = await Promise.all([
      categoriesCollection.find({}).limit(100).toArray(),
      toolsCollection.aggregate([
        { $match: { status: 'approved' } },
        { $unwind: '$categories' },
        { $group: { _id: '$categories', count: { $sum: 1 } } }
      ]).toArray().catch(() => [])
    ]);
    
    const countMap = new Map();
    (countAgg || []).forEach(item => {
      if (item._id) countMap.set(item._id, item.count);
    });
    
    const categoriesWithCount = categoriesList.map((category) => ({
      ...category,
      count: countMap.get(category.slug) || countMap.get(category.name) || 0
    }));
    
    return serializeData(categoriesWithCount);
  } catch (error) {
    console.error('Failed to fetch categories, using fallback:', error.message);
    return serializeData(sampleCategories || []);
  }
}

/**
 * Server-side function to fetch a single tool by slug
 */
const _getToolBySlug = async function(slug) {
  try {
    const toolsCollection = await getCollection('tools');
    const tool = await toolsCollection.findOne({ slug });
    
    if (!tool) {
      const fallback = sampleTools.find(t => t.slug === slug);
      return fallback ? serializeData(fallback) : null;
    }
    
    return serializeData(tool); // Serialize for client
  } catch (error) {
    console.error('Error fetching tool, using fallback:', error.message);
    const fallback = sampleTools.find(t => t.slug === slug);
    return fallback ? serializeData(fallback) : null;
  }
}

/**
 * Server-side function to fetch featured tools
 */
const _getFeaturedTools = async function(limit = 6) {
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
    const fallback = (sampleTools || []).filter(t => t.featured).slice(0, limit);
    return serializeData(fallback.length > 0 ? fallback : (sampleTools || []).slice(0, limit));
  }
}

/**
 * Server-side function to fetch trending tools
 */
const _getTrendingTools = async function(limit = 10) {
  try {
    const toolsCollection = await getCollection('tools');
    const trending = await toolsCollection
      .find({ status: 'approved' })
      .sort({ votes: -1 })
      .limit(limit)
      .toArray();
    
    return serializeData(trending); // Serialize for client
  } catch (error) {
    console.error('Error fetching trending tools, using fallback:', error.message);
    return serializeData((sampleTools || []).slice(0, limit));
  }
}
export const getTools = unstable_cache(_getTools, ['getTools'], { revalidate: 60, tags: ['tools'] });
export const getCategories = unstable_cache(_getCategories, ['getCategories'], { revalidate: 300, tags: ['categories'] });
export const getToolBySlug = unstable_cache(_getToolBySlug, ['getToolBySlug'], { revalidate: 60, tags: ['tools'] });
export const getFeaturedTools = unstable_cache(_getFeaturedTools, ['getFeaturedTools'], { revalidate: 300, tags: ['tools'] });
export const getTrendingTools = unstable_cache(_getTrendingTools, ['getTrendingTools'], { revalidate: 300, tags: ['tools'] });
