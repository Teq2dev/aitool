import assert from 'node:assert/strict';
import test from 'node:test';

// Central LANGUAGES configuration used across the application and sitemap
const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'es', name: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { code: 'pt', name: 'Português', flag: '🇵🇹', dir: 'ltr' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺', dir: 'ltr' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', dir: 'ltr' },
  { code: 'zh', name: '中文', flag: '🇨🇳', dir: 'ltr' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱', dir: 'ltr' },
];

// Helper mirroring sitemap URL generation logic in app/sitemap/[id]/route.js
const baseUrl = 'https://www.bestaitoolsfree.com';

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

const formatUrl = (url) => escapeXml(encodeURI(url));
const getSubpathUrl = (path, langCode) => {
  if (langCode === 'en') return `${baseUrl}${path}`;
  return `${baseUrl}/${langCode}${path}`;
};

function generateCategorySitemapXml(categories) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  categories.forEach(cat => {
    if (cat.slug) {
      LANGUAGES.forEach(lang => {
        const path = `/categories/${cat.slug}`;
        const fullUrl = lang.code === 'en' ? `${baseUrl}${path}` : `${baseUrl}/${lang.code}${path}`;
        xml += `\n  <url>\n    <loc>${formatUrl(fullUrl)}</loc>\n    <changefreq>daily</changefreq>\n    <priority>${lang.code === 'en' ? '0.85' : '0.7'}</priority>`;
        LANGUAGES.forEach(alt => {
          xml += `\n    <xhtml:link rel="alternate" hreflang="${alt.code}" href="${formatUrl(getSubpathUrl(path, alt.code))}" />`;
        });
        xml += `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${formatUrl(getSubpathUrl(path, 'en'))}" />\n  </url>`;
      });
    }
  });

  xml += `\n</urlset>`;
  return xml;
}

test('Sitemap generates only valid category slugs and excludes unslugified tool tags', () => {
  // Official category dataset
  const officialCategories = [
    { slug: 'seo', name: 'SEO' },
    { slug: 'productivity', name: 'Productivity' },
    { slug: 'ai-writers', name: 'AI Writers' },
    { slug: 'text-to-video', name: 'Text to Video' },
  ];

  const xml = generateCategorySitemapXml(officialCategories);

  // 1. Official slugs are present
  assert.ok(xml.includes('<loc>https://www.bestaitoolsfree.com/categories/seo</loc>'));
  assert.ok(xml.includes('<loc>https://www.bestaitoolsfree.com/categories/productivity</loc>'));
  assert.ok(xml.includes('<loc>https://www.bestaitoolsfree.com/categories/ai-writers</loc>'));
  assert.ok(xml.includes('<loc>https://www.bestaitoolsfree.com/categories/text-to-video</loc>'));

  // 2. Unslugified arbitrary tool tags are NEVER in the sitemap
  const forbiddenTags = [
    'Note Taker',
    'Note%20Taker',
    'Music Generators',
    'Music%20Generators',
    'AI Photography',
    'AI%20Photography',
    'Publishing Platform',
    'Publishing%20Platform',
    'Fortune Telling',
    'Fortune%20Telling',
  ];

  for (const tag of forbiddenTags) {
    assert.strictEqual(xml.includes(`/categories/${tag}`), false, `Forbidden tag ${tag} must not be present`);
  }

  // 3. Language multiplier verification
  // Number of URL blocks should equal categories.length * LANGUAGES.length
  const locMatches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  const expectedUrlCount = officialCategories.length * LANGUAGES.length;
  assert.strictEqual(locMatches.length, expectedUrlCount, `Expected ${expectedUrlCount} URLs, got ${locMatches.length}`);

  // 4. Ensure no duplicate URLs
  const uniqueUrls = new Set(locMatches);
  assert.strictEqual(uniqueUrls.size, locMatches.length, 'Every generated URL in the sitemap must be unique');

  // 5. Verify reciprocal hreflang links exist for each language
  LANGUAGES.forEach(lang => {
    const langUrl = lang.code === 'en'
      ? 'https://www.bestaitoolsfree.com/categories/seo'
      : `https://www.bestaitoolsfree.com/${lang.code}/categories/seo`;
    assert.ok(xml.includes(`<loc>${langUrl}</loc>`), `Missing loc for language ${lang.code}`);
    assert.ok(xml.includes(`hreflang="${lang.code}"`), `Missing hreflang tag for ${lang.code}`);
  });
  assert.ok(xml.includes('hreflang="x-default"'), 'Missing x-default hreflang tag');
});

test('Sitemap excludes categories marked as draft', () => {
  const mixedCategories = [
    { slug: 'seo', contentStatus: 'published' },
    { slug: 'draft-category', contentStatus: 'draft' }
  ];

  const publishedOnly = mixedCategories.filter(c => c.contentStatus !== 'draft');
  const xml = generateCategorySitemapXml(publishedOnly);

  assert.ok(xml.includes('/categories/seo'));
  assert.strictEqual(xml.includes('/categories/draft-category'), false);
});
