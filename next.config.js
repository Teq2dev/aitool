const path = require('path');

const nextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ['mongodb'],
  outputFileTracingIncludes: {
    '/*': ['./v6_field_embeddings_cache.json'],
    '/tools/[slug]': ['./v6_field_embeddings_cache.json'],
  },
  webpack(config, { dev }) {
    config.resolve.alias = {
      ...config.resolve.alias,
      dompurify: require.resolve('dompurify'),
    };
    if (dev) {
      // Reduce CPU/memory from file watching
      config.watchOptions = {
        poll: 2000, // check every 2 seconds
        aggregateTimeout: 300, // wait before rebuilding
        ignored: ['**/node_modules'],
      };
    }
    return config;
  },
  onDemandEntries: {
    maxInactiveAge: 10000,
    pagesBufferLength: 2,
  },
  async headers() {
    return [
      {
        // Public pages - security and CORS headers (no robots override)
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "ALLOWALL" },
          { key: "Content-Security-Policy", value: "frame-ancestors *;" },
          { key: "Access-Control-Allow-Origin", value: process.env.CORS_ORIGINS || "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, PATCH, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "*" },
        ],
      },
      {
        // Admin pages - block indexing
        source: "/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        // Dashboard pages - block indexing
        source: "/dashboard/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        // API routes - block indexing
        source: "/api/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
  async redirects() {
    const toolsToRedirect = [
      { old: 'lessonplansai', new: 'lessonplans-ai' },
      { old: 'closerscopy', new: 'closers-copy' },
      { old: 'wolfram-alpha', new: 'wolframalpha' },
      { old: 'originalityai', new: 'originality-ai' },
      { old: 'seoai', new: 'seo-ai' },
      { old: 'seowritingai', new: 'seowriting-ai' },
      { old: 'easy-peasyai', new: 'easy-peasy-ai' },
      { old: 'adcreativeai', new: 'adcreative-ai' },
      { old: 'hoppy-copy', new: 'hoppycopy' },
      { old: 'warmerai', new: 'warmer-ai' },
      { old: 'tensorart', new: 'tensor-art' },
      { old: 'surfer-seo', new: 'surferseo' },
      { old: 'tugan-ai', new: 'tuganai' },
      { old: 'jasper', new: 'jasper-ai' },
    ];
    
    const redirectsList = [];
    for (const tool of toolsToRedirect) {
      redirectsList.push({
        source: `/tools/${tool.old}`,
        destination: `/tools/${tool.new}`,
        statusCode: 301,
      });
      redirectsList.push({
        source: `/:lang(es|fr|de|pt|ar|ru|ja|zh|it|nl)/tools/${tool.old}`,
        destination: `/:lang/tools/${tool.new}`,
        statusCode: 301,
      });
    }

    // Legacy Static Pages & GSC 404 Redirects
    redirectsList.push(
      {
        source: '/terms-and-conditions',
        destination: '/terms',
        statusCode: 301,
      },
      {
        source: '/:lang(es|fr|de|pt|ar|ru|ja|zh|it|nl)/terms-and-conditions',
        destination: '/:lang/terms',
        statusCode: 301,
      },
      {
        source: '/pricing',
        destination: '/tools',
        statusCode: 301,
      },
      {
        source: '/blogs/future-of-ai-in-business',
        destination: '/blogs',
        statusCode: 301,
      },
      {
        source: '/categories/Chatbots',
        destination: '/categories/customer-support',
        statusCode: 301,
      },
      {
        source: '/categories/Translation%20&%20Transcription',
        destination: '/categories/text-to-speech',
        statusCode: 301,
      },
      {
        source: '/categories/Coding%20&%20Development',
        destination: '/categories/dev-tools',
        statusCode: 301,
      },
      {
        source: '/:lang(es|fr|de|pt|ar|ru|ja|zh|it|nl)/categories/SEO%20&%20Social',
        destination: '/:lang/categories/seo',
        statusCode: 301,
      },
      {
        source: '/:lang(es|fr|de|pt|ar|ru|ja|zh|it|nl)/categories/Coding%20&%20Development',
        destination: '/:lang/categories/dev-tools',
        statusCode: 301,
      },
      {
        source: '/:lang(es|fr|de|pt|ar|ru|ja|zh|it|nl)/categories/Image%20&%20Art%20Generation',
        destination: '/:lang/categories/text-to-image',
        statusCode: 301,
      },
      {
        source: '/:lang(es|fr|de|pt|ar|ru|ja|zh|it|nl)/categories/AI%20Agents%20&%20Automation',
        destination: '/:lang/categories/customer-support',
        statusCode: 301,
      },
      {
        source: '/:lang(es|fr|de|pt|ar|ru|ja|zh|it|nl)/categories/AI%20Assistants%20&%20Chatbots',
        destination: '/:lang/categories/customer-support',
        statusCode: 301,
      },
      {
        source: '/:lang(es|fr|de|pt|ar|ru|ja|zh|it|nl)/categories/Data%20&%20Analytics',
        destination: '/:lang/categories',
        statusCode: 301,
      },
      {
        source: '/:lang(es|fr|de|pt|ar|ru|ja|zh|it|nl)/categories/AI%20Infrastructure%20&%20Developer%20Tools',
        destination: '/:lang/categories/dev-tools',
        statusCode: 301,
      },
      {
        source: '/:lang(es|fr|de|pt|ar|ru|ja|zh|it|nl)/categories/Translation%20&%20Transcription',
        destination: '/:lang/categories/text-to-speech',
        statusCode: 301,
      },
      {
        source: '/:lang(es|fr|de|pt|ar|ru|ja|zh|it|nl)/categories/Other',
        destination: '/:lang/categories',
        statusCode: 301,
      },
      {
        source: '/:lang(es|fr|de|pt|ar|ru|ja|zh|it|nl)/categories/midjourney-image-generator',
        destination: '/tools/midjourney',
        statusCode: 301,
      }
    );
    
    return redirectsList;
  },
};

module.exports = nextConfig;
