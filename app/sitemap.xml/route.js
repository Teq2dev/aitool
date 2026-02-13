import { getCollection } from '@/lib/db';

export async function GET() {
  const baseUrl = 'https://www.bestaitoolsfree.com';
  
  // Get all tools
  const toolsCollection = await getCollection('tools');
  const tools = await toolsCollection.find({ status: 'approved' }).project({ slug: 1, updatedAt: 1, createdAt: 1 }).toArray();
  
  // Get all blogs
  const blogsCollection = await getCollection('blogs');
  const blogs = await blogsCollection.find({ status: 'published' }).project({ slug: 1, updatedAt: 1, createdAt: 1 }).toArray();
  
  // Get all categories
  const categoriesCollection = await getCollection('tools');
  const categories = await categoriesCollection.aggregate([
    { $match: { status: 'approved' } },
    { $unwind: '$categories' },
    { $group: { _id: '$categories' } }
  ]).toArray();
  
  // Get shop products
  const shopCollection = await getCollection('shop_products');
  const products = await shopCollection.find({ status: 'active' }).project({ slug: 1, updatedAt: 1, createdAt: 1 }).toArray();

  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/tools', priority: '0.9', changefreq: 'daily' },
    { url: '/categories', priority: '0.8', changefreq: 'weekly' },
    { url: '/blogs', priority: '0.7', changefreq: 'weekly' },
    { url: '/shop', priority: '0.8', changefreq: 'weekly' },
    { url: '/submit', priority: '0.5', changefreq: 'monthly' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
  ${tools.map(tool => `
  <url>
    <loc>${baseUrl}/tools/${tool.slug}</loc>
    <lastmod>${new Date(tool.updatedAt || tool.createdAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
  ${blogs.map(blog => `
  <url>
    <loc>${baseUrl}/blogs/${blog.slug}</loc>
    <lastmod>${new Date(blog.updatedAt || blog.createdAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
  ${categories.map(cat => `
  <url>
    <loc>${baseUrl}/tools?category=${encodeURIComponent(cat._id)}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
  ${products.map(product => `
  <url>
    <loc>${baseUrl}/shop/${product.slug}</loc>
    <lastmod>${new Date(product.updatedAt || product.createdAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
