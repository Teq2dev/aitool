import { getCollection } from '@/lib/db';
import { LANGUAGES } from '@/lib/languages';

const escapeXml = (unsafe) => {
  if (!unsafe) return '';
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
};

const formatUrl = (url) => {
  return escapeXml(encodeURI(url));
};

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
      { url: '/about', priority: '0.6', changefreq: 'monthly' },
      { url: '/contact', priority: '0.6', changefreq: 'monthly' },
      { url: '/privacy', priority: '0.5', changefreq: 'monthly' },
      { url: '/terms', priority: '0.5', changefreq: 'monthly' },
      { url: '/faq', priority: '0.7', changefreq: 'monthly' },
    ];

    // Helper to format date safely
    const formatDate = (date) => {
      try {
        return new Date(date || Date.now()).toISOString();
      } catch (e) {
        return new Date().toISOString();
      }
    };

    // Helper for subpath URL e.g. /fr/tools/midjourney
    const getSubpathUrl = (path, langCode) => {
      if (langCode === 'en') return `${baseUrl}${path}`;
      return `${baseUrl}/${langCode}${path}`;
    };

    // Build the XML string with xhtml hreflang support for Google International Indexing
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

    // Add Static Pages for all languages
    staticPages.forEach(page => {
      LANGUAGES.forEach(lang => {
        const fullUrl = getSubpathUrl(page.url, lang.code);
        
        xml += `
  <url>
    <loc>${formatUrl(fullUrl)}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${lang.code === 'en' ? page.priority : '0.7'}</priority>`;
        
        // Add hreflang links
        LANGUAGES.forEach(alt => {
          xml += `
    <xhtml:link rel="alternate" hreflang="${alt.code}" href="${formatUrl(getSubpathUrl(page.url, alt.code))}" />`;
        });

        xml += `
  </url>`;
      });
    });

    // Add Tool Pages for all languages
    tools.forEach(tool => {
      if (tool.slug) {
        LANGUAGES.forEach(lang => {
          const fullUrl = getSubpathUrl(`/tools/${tool.slug}`, lang.code);
          
          xml += `
  <url>
    <loc>${formatUrl(fullUrl)}</loc>
    <lastmod>${formatDate(tool.updatedAt || tool.createdAt)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${lang.code === 'en' ? '0.8' : '0.65'}</priority>`;

          LANGUAGES.forEach(alt => {
            xml += `
    <xhtml:link rel="alternate" hreflang="${alt.code}" href="${formatUrl(getSubpathUrl(`/tools/${tool.slug}`, alt.code))}" />`;
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
    <loc>${formatUrl(`${baseUrl}/blogs/${blog.slug}`)}</loc>
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
          const path = `/categories/${cat._id}`;
          const fullUrl = lang.code === 'en' ? `${baseUrl}${path}` : `${baseUrl}/${lang.code}${path}`;
          
          xml += `
  <url>
    <loc>${formatUrl(fullUrl)}</loc>
    <changefreq>daily</changefreq>
    <priority>${lang.code === 'en' ? '0.85' : '0.7'}</priority>
  </url>`;
        });
      }
    });

    xml += `\n</urlset>`;

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200'
      },
    });
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${baseUrl}</loc><priority>1.0</priority></url>\n</urlset>`, {
      headers: { 'Content-Type': 'application/xml' },
    });
  }
}
