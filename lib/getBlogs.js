import { getCollection } from './db';

/**
 * Server-side function to fetch blogs from MongoDB
 */
export async function getBlogs({ 
  category = null, 
  search = null, 
  status = 'published',
  limit = 10,
  page = 1 
} = {}) {
  try {
    const blogsCollection = await getCollection('blogs');
    
    // Build query
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
    
    const [blogs, total] = await Promise.all([
      blogsCollection
        .find(query)
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      blogsCollection.countDocuments(query)
    ]);
    
    return {
      blogs: JSON.parse(JSON.stringify(blogs)), // Serialize for client
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return {
      blogs: [],
      total: 0,
      page: 1,
      totalPages: 1,
      error: error.message
    };
  }
}

/**
 * Server-side function to fetch a single blog by slug
 */
export async function getBlogBySlug(slug) {
  try {
    const blogsCollection = await getCollection('blogs');
    const blog = await blogsCollection.findOne({ slug });
    
    if (!blog) {
      return null;
    }
    
    // Increment views
    await blogsCollection.updateOne(
      { _id: blog._id },
      { $inc: { views: 1 } }
    );
    
    return JSON.parse(JSON.stringify(blog)); // Serialize for client
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

/**
 * Server-side function to fetch featured blogs
 */
export async function getFeaturedBlogs(limit = 3) {
  try {
    const blogsCollection = await getCollection('blogs');
    const featured = await blogsCollection
      .find({ status: 'published', featured: true })
      .sort({ publishedAt: -1 })
      .limit(limit)
      .toArray();
    
    return JSON.parse(JSON.stringify(featured)); // Serialize for client
  } catch (error) {
    console.error('Error fetching featured blogs:', error);
    return [];
  }
}