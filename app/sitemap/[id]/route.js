import { getCollection } from '@/lib/db';
import { LANGUAGES } from '@/lib/languages';
import { EVENTS_DATA } from '@/lib/events/eventData.js';

const escapeXml = (unsafe) => {
  if (!unsafe) return '';
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case "'": return '&apos;';
      case '"': return '&quot;';
    }
  });
};

const formatUrl = (url) => {
  return escapeXml(encodeURI(url));
};

const formatDate = (date) => {
  try {
    return new Date(date || Date.now()).toISOString();
  } catch (e) {
    return new Date().toISOString();
  }
};

const baseUrl = 'https://www.bestaitoolsfree.com';

const getSubpathUrl = (path, langCode) => {
  if (langCode === 'en') return `${baseUrl}${path}`;
  return `${baseUrl}/${langCode}${path}`;
};

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

    if (id === 'main.xml') {
      const blogsCollection = await getCollection('blogs');
      const blogs = await blogsCollection
        .find({ status: 'published' })
        .project({ slug: 1, updatedAt: 1, createdAt: 1 })
        .toArray();

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
        { url: '/events', priority: '0.85', changefreq: 'daily' },
      ];

      const utilityPages = [
        '/pdf-tools', '/image-tools',
        '/merge-pdf', '/split-pdf', '/rotate-pdf', '/delete-pages', '/compress-pdf', '/edit-pdf', '/unlock-pdf',
        '/pdf-to-word', '/pdf-to-powerpoint', '/pdf-to-excel', '/word-to-pdf', '/powerpoint-to-pdf', '/excel-to-pdf',
        '/pdf-to-jpg', '/pdf-to-png', '/jpg-to-pdf', '/png-to-pdf',
        '/image-compressor', '/image-resizer', '/image-cropper', '/image-rotator', '/image-converter',
        '/jpg-to-png', '/png-to-jpg', '/jpg-to-webp', '/png-to-webp', '/webp-to-jpg', '/webp-to-png',
        '/calculators',
        '/calculators/percentage-calculator',
        '/calculators/age-calculator',
        '/calculators/bmi-calculator',
        '/calculators/loan-calculator',
        '/calculators/emi-calculator',
        '/calculators/mortgage-calculator',
        '/calculators/compound-interest-calculator',
        '/calculators/simple-interest-calculator',
        '/calculators/gst-calculator',
        '/calculators/tax-calculator',
        '/calculators/discount-calculator',
        '/calculators/profit-margin-calculator',
        '/calculators/salary-calculator',
        '/calculators/time-calculator',
        '/calculators/date-calculator',
        '/calculators/hours-calculator',
        '/calculators/pace-calculator',
        '/calculators/fuel-cost-calculator',
        '/calculators/electricity-cost-calculator',
        '/calculators/currency-calculator',
        '/calculators/ratio-calculator',
        '/calculators/fraction-calculator',
        '/calculators/gpa-calculator',
        '/calculators/grade-calculator'
      ];

      staticPages.forEach(page => {
        LANGUAGES.forEach(lang => {
          const fullUrl = getSubpathUrl(page.url, lang.code);
          xml += `\n  <url>\n    <loc>${formatUrl(fullUrl)}</loc>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${lang.code === 'en' ? page.priority : '0.7'}</priority>`;
          LANGUAGES.forEach(alt => {
            xml += `\n    <xhtml:link rel="alternate" hreflang="${alt.code}" href="${formatUrl(getSubpathUrl(page.url, alt.code))}" />`;
          });
          xml += `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${formatUrl(getSubpathUrl(page.url, 'en'))}" />\n  </url>`;
        });
      });

      utilityPages.forEach(path => {
        LANGUAGES.forEach(lang => {
          const fullUrl = getSubpathUrl(path, lang.code);
          xml += `\n  <url>\n    <loc>${formatUrl(fullUrl)}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${lang.code === 'en' ? '0.95' : '0.85'}</priority>`;
          LANGUAGES.forEach(alt => {
            xml += `\n    <xhtml:link rel="alternate" hreflang="${alt.code}" href="${formatUrl(getSubpathUrl(path, alt.code))}" />`;
          });
          xml += `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${formatUrl(getSubpathUrl(path, 'en'))}" />\n  </url>`;
        });
      });

      blogs.forEach(blog => {
        if (blog.slug) {
          xml += `\n  <url>\n    <loc>${formatUrl(`${baseUrl}/blogs/${blog.slug}`)}</loc>\n    <lastmod>${formatDate(blog.updatedAt || blog.createdAt)}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.75</priority>\n  </url>`;
        }
      });
    } else if (id === 'categories.xml') {
      const toolsCollection = await getCollection('tools');
      const categories = await toolsCollection.aggregate([
        { $match: { status: 'approved' } },
        { $unwind: '$categories' },
        { $group: { _id: '$categories' } }
      ]).toArray();

      categories.forEach(cat => {
        if (cat._id) {
          LANGUAGES.forEach(lang => {
            const path = `/categories/${cat._id}`;
            const fullUrl = lang.code === 'en' ? `${baseUrl}${path}` : `${baseUrl}/${lang.code}${path}`;
            xml += `\n  <url>\n    <loc>${formatUrl(fullUrl)}</loc>\n    <changefreq>daily</changefreq>\n    <priority>${lang.code === 'en' ? '0.85' : '0.7'}</priority>`;
            LANGUAGES.forEach(alt => {
              xml += `\n    <xhtml:link rel="alternate" hreflang="${alt.code}" href="${formatUrl(getSubpathUrl(path, alt.code))}" />`;
            });
            xml += `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${formatUrl(getSubpathUrl(path, 'en'))}" />\n  </url>`;
          });
        }
      });
    } else if (id === 'tools-1.xml' || id === 'tools-2.xml') {
      const toolsCollection = await getCollection('tools');
      const allTools = await toolsCollection
        .find({ status: 'approved' })
        .project({ slug: 1, updatedAt: 1, createdAt: 1 })
        .toArray();

      const sliceStart = id === 'tools-1.xml' ? 0 : 600;
      const sliceEnd = id === 'tools-1.xml' ? 600 : allTools.length;
      const toolsSlice = allTools.slice(sliceStart, sliceEnd);

      toolsSlice.forEach(tool => {
        if (tool.slug) {
          LANGUAGES.forEach(lang => {
            const fullUrl = getSubpathUrl(`/tools/${tool.slug}`, lang.code);
            xml += `\n  <url>\n    <loc>${formatUrl(fullUrl)}</loc>\n    <lastmod>${formatDate(tool.updatedAt || tool.createdAt)}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${lang.code === 'en' ? '0.8' : '0.65'}</priority>`;
            LANGUAGES.forEach(alt => {
              xml += `\n    <xhtml:link rel="alternate" hreflang="${alt.code}" href="${formatUrl(getSubpathUrl(`/tools/${tool.slug}`, alt.code))}" />`;
            });
            xml += `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${formatUrl(getSubpathUrl(`/tools/${tool.slug}`, 'en'))}" />\n  </url>`;
          });
        }
      });
    } else if (id === 'events.xml') {
      // 1. Hub page /events across all languages
      LANGUAGES.forEach(lang => {
        const fullUrl = getSubpathUrl('/events', lang.code);
        xml += `\n  <url>\n    <loc>${formatUrl(fullUrl)}</loc>\n    <changefreq>daily</changefreq>\n    <priority>${lang.code === 'en' ? '0.9' : '0.75'}</priority>`;
        LANGUAGES.forEach(alt => {
          xml += `\n    <xhtml:link rel="alternate" hreflang="${alt.code}" href="${formatUrl(getSubpathUrl('/events', alt.code))}" />`;
        });
        xml += `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${formatUrl(getSubpathUrl('/events', 'en'))}" />\n  </url>`;
      });

      // 2. All verified events across all languages
      EVENTS_DATA.forEach(event => {
        const path = `/events/${event.slug}`;
        LANGUAGES.forEach(lang => {
          const fullUrl = getSubpathUrl(path, lang.code);
          const priority = event.status === 'upcoming'
            ? (lang.code === 'en' ? '0.85' : '0.7')
            : (lang.code === 'en' ? '0.7' : '0.6');
          const changefreq = event.status === 'upcoming' ? 'weekly' : 'monthly';
          const lastmod = formatDate(event.source?.lastVerified);

          xml += `\n  <url>\n    <loc>${formatUrl(fullUrl)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>`;
          LANGUAGES.forEach(alt => {
            xml += `\n    <xhtml:link rel="alternate" hreflang="${alt.code}" href="${formatUrl(getSubpathUrl(path, alt.code))}" />`;
          });
          xml += `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${formatUrl(getSubpathUrl(path, 'en'))}" />\n  </url>`;
        });
      });
    } else {
      return new Response('Not Found', { status: 404 });
    }

    xml += `\n</urlset>`;

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200'
      },
    });
  } catch (error) {
    console.error('Child sitemap generation error:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}
