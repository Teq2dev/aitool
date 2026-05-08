import { getCollection } from '@/lib/db';

export async function GET() {
  const baseUrl = 'https://www.bestaitoolsfree.com';
  
  try {
    // 1. Get all approved tools
    const toolsCollection = await getCollection('tools');
    const tools = await toolsCollection
      .find({ status: 'approved' })
      .project({ slug: 1, updatedAt: 1, createdAt: 1, name: 1 })
      .toArray();
    
    // 2. Get all published blogs
    const blogsCollection = await getCollection('blogs');
    const blogs = await blogsCollection
      .find({ status: 'published' })
      .project({ slug: 1, updatedAt: 1, createdAt: 1, title: 1 })
      .toArray();
    
    // 3. Get unique categories from approved tools
    const categories = await toolsCollection.aggregate([
      { $match: { status: 'approved' } },
      { $unwind: '$categories' },
      { $group: { _id: '$categories' } }
    ]).toArray();
    
    // 4. Static Pages
    const staticPages = [
      { url: '', priority: '1.0', changefreq: 'daily' },
      { url: '/tools', priority: '0.9', changefreq: 'daily' },
      { url: '/categories', priority: '0.8', changefreq: 'weekly' },
      { url: '/blogs', priority: '0.8', changefreq: 'weekly' },
      { url: '/submit', priority: '0.5', changefreq: 'monthly' },
    ];

    // Helper to format date safely
    const formatDate = (date) => {
      try {
        return new Date(date || Date.now()).toISOString();
      } catch (e) {
        return new Date().toISOString();
      }
    };

    // Build the XML string
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Add Static Pages
    staticPages.forEach(page => {
      xml += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    });

    // Add Tool Pages
    tools.forEach(tool => {
      if (tool.slug) {
        xml += `
  <url>
    <loc>${baseUrl}/tools/${tool.slug}</loc>
    <lastmod>${formatDate(tool.updatedAt || tool.createdAt)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
      }
    });

    // Add Blog Pages
    blogs.forEach(blog => {
      if (blog.slug) {
        xml += `
  <url>
    <loc>${baseUrl}/blogs/${blog.slug}</loc>
    <lastmod>${formatDate(blog.updatedAt || blog.createdAt)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
      }
    });

    // Add Category Pages (Tools filtered by category)
    categories.forEach(cat => {
      if (cat._id) {
        xml += `
  <url>
    <loc>${baseUrl}/tools?category=${encodeURIComponent(cat._id)}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
      }
    });

    xml += `
</urlset>`;

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200'
      },
    });
  } catch (error) {
    console.error('Sitemap generation error:', error);
    // Fallback basic sitemap if DB fails
    return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}</loc><priority>1.0</priority></url>
</urlset>`, {
      headers: { 'Content-Type': 'application/xml' },
    });
  }
}
