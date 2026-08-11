const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  experimental: {
    // Remove if not using Server Components
    serverComponentsExternalPackages: ['mongodb'],
  },
  webpack(config, { dev }) {
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
    ];
    
    const redirectsList = [];
    for (const tool of toolsToRedirect) {
      redirectsList.push({
        source: `/tools/${tool.old}`,
        destination: `/tools/${tool.new}`,
        permanent: true,
      });
      redirectsList.push({
        source: `/:lang(es|fr|de|pt|ar|ru|ja|zh|it|nl)/tools/${tool.old}`,
        destination: `/:lang/tools/${tool.new}`,
        permanent: true,
      });
    }
    
    return redirectsList;
  },
};

module.exports = nextConfig;
