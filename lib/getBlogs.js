import { getCollection } from './db';
import { serializeData } from './utils';

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
    
    let query = { status };
    if (category) query.category = category;
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

    if (blogs.length === 0) {
      const { blogs: sampleBlogs } = await import('./sample-data');
      const filtered = sampleBlogs.filter(b => status === 'published' ? b.status === 'published' : true);
      return {
        blogs: serializeData(filtered),
        total: filtered.length,
        page: 1,
        totalPages: 1,
      };
    }
    
    return {
      blogs: serializeData(blogs),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    try {
      const { blogs: sampleBlogs } = await import('./sample-data');
      const filtered = sampleBlogs.filter(b => status === 'published' ? b.status === 'published' : true);
      return {
        blogs: serializeData(filtered),
        total: filtered.length,
        page: 1,
        totalPages: 1,
      };
    } catch (e) {
      return { blogs: [], total: 0, page: 1, totalPages: 1 };
    }
  }
}

/**
 * Server-side function to fetch a single blog by slug
 */
export async function getBlogBySlug(slug) {
  try {
    const blogsCollection = await getCollection('blogs');
    const blog = await blogsCollection.findOne({ slug });
    
    if (blog) {
      await blogsCollection.updateOne(
        { _id: blog._id },
        { $inc: { views: 1 } }
      ).catch(() => {});
      return serializeData(blog);
    }
    
    const { blogs: sampleBlogs } = await import('./sample-data');
    const sampleBlog = sampleBlogs.find(b => b.slug === slug);
    if (sampleBlog) {
      return serializeData(sampleBlog);
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching blog:', error);
    try {
      const { blogs: sampleBlogs } = await import('./sample-data');
      const sampleBlog = sampleBlogs.find(b => b.slug === slug);
      if (sampleBlog) {
        return serializeData(sampleBlog);
      }
    } catch (e) {}
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
    
    if (featured.length === 0) {
      const { blogs: sampleBlogs } = await import('./sample-data');
      return serializeData(sampleBlogs.filter(b => b.featured).slice(0, limit));
    }
    
    return serializeData(featured);
  } catch (error) {
    console.error('Error fetching featured blogs:', error);
    try {
      const { blogs: sampleBlogs } = await import('./sample-data');
      return serializeData(sampleBlogs.filter(b => b.featured).slice(0, limit));
    } catch (e) {
      return [];
    }
  }
}