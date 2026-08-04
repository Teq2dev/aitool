import { getCollection } from '@/lib/db';
import { LANGUAGES } from '@/lib/languages';

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

    // Build the XML string with xhtml hreflang support for Google International Indexing
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

    // Add Static Pages for all languages
    staticPages.forEach(page => {
      LANGUAGES.forEach(lang => {
        const langParam = lang.code === 'en' ? '' : (page.url.includes('?') ? `&amp;lang=${lang.code}` : `?lang=${lang.code}`);
        const fullUrl = `${baseUrl}${page.url}${langParam}`;
        
        xml += `
  <url>
    <loc>${fullUrl}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${lang.code === 'en' ? page.priority : '0.7'}</priority>`;
        
        // Add hreflang links
        LANGUAGES.forEach(alt => {
          const altParam = alt.code === 'en' ? '' : (page.url.includes('?') ? `&amp;lang=${alt.code}` : `?lang=${alt.code}`);
          xml += `
    <xhtml:link rel="alternate" hreflang="${alt.code}" href="${baseUrl}${page.url}${altParam}" />`;
        });

        xml += `
  </url>`;
      });
    });

    // Add Tool Pages for all languages
    tools.forEach(tool => {
      if (tool.slug) {
        LANGUAGES.forEach(lang => {
          const langParam = lang.code === 'en' ? '' : `?lang=${lang.code}`;
          const fullUrl = `${baseUrl}/tools/${tool.slug}${langParam}`;
          
          xml += `
  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${formatDate(tool.updatedAt || tool.createdAt)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${lang.code === 'en' ? '0.8' : '0.65'}</priority>`;

          LANGUAGES.forEach(alt => {
            const altParam = alt.code === 'en' ? '' : `?lang=${alt.code}`;
            xml += `
    <xhtml:link rel="alternate" hreflang="${alt.code}" href="${baseUrl}/tools/${tool.slug}${altParam}" />`;
          });

          xml += `
  </url>`;
        });
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
    <priority>0.75</priority>
  </url>`;
      }
    });

    // Add Category Pages for all languages
    categories.forEach(cat => {
      if (cat._id) {
        LANGUAGES.forEach(lang => {
          const langParam = lang.code === 'en' ? '' : `&amp;lang=${lang.code}`;
          const fullUrl = `${baseUrl}/tools?category=${encodeURIComponent(cat._id)}${langParam}`;
          
          xml += `
  <url>
    <loc>${fullUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>${lang.code === 'en' ? '0.85' : '0.7'}</priority>
  </url>`;
        });
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
    return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}</loc><priority>1.0</priority></url>
</urlset>`, {
      headers: { 'Content-Type': 'application/xml' },
    });
  }
}
