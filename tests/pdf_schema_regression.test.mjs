/**
 * tests/pdf_schema_regression.test.mjs
 * 
 * Regression test suite for PDF Tools structured data (JSON-LD):
 * - Verifies safe fallback for PDF Hub route (/pdf-tools) preventing /undefined URLs.
 * - Verifies preservation of individual PDF tool schemas (/merge-pdf, /compress-pdf, etc.).
 * - Verifies multilingual URL prefixes across all supported locales.
 */

import assert from 'node:assert';
import { generatePdfToolSchemas } from '../lib/pdfSchemaHelper.js';
import { PDF_HUB_DATA } from '../lib/hubData.js';
import { PDF_TOOLS_DATA } from '../lib/pdfToolData.js';
import { PDF_TOOLS } from '../lib/pdfConfig.js';

let passed = 0;
let failed = 0;

function it(desc, fn) {
  try {
    fn();
    console.log(`  [PASS] ${desc}`);
    passed++;
  } catch (err) {
    console.error(`  [FAIL] ${desc}`);
    console.error(`         ${err.message}`);
    failed++;
  }
}

console.log('====================================================');
console.log('RUNNING PDF SCHEMA REGRESSION TEST SUITE');
console.log('====================================================\n');

// 1. PDF Hub in default English locale
it('Scenario 1: PDF Hub (en) emits /pdf-tools and zero /undefined in BreadcrumbList and WebApplication', () => {
  const hubData = PDF_HUB_DATA['en'];
  assert(hubData, 'PDF_HUB_DATA for en must exist');

  const schemas = generatePdfToolSchemas(hubData, 'en');
  assert(Array.isArray(schemas), 'Schemas must be an array');
  assert.strictEqual(schemas.length, 2, 'Hub should emit BreadcrumbList and WebApplication');

  const jsonString = JSON.stringify(schemas);
  assert(!jsonString.includes('/undefined'), 'JSON-LD must never contain /undefined');
  assert(!jsonString.includes('undefined'), 'JSON-LD must not contain literal undefined');

  // Verify BreadcrumbList
  const breadcrumbs = schemas.find(s => s['@type'] === 'BreadcrumbList');
  assert(breadcrumbs, 'BreadcrumbList must be present');
  assert.strictEqual(breadcrumbs.itemListElement[0].item, 'https://www.bestaitoolsfree.com/pdf-tools');
  assert.strictEqual(breadcrumbs.itemListElement[1].item, 'https://www.bestaitoolsfree.com/pdf-tools');

  // Verify WebApplication
  const webApp = schemas.find(s => s['@type'] === 'WebApplication');
  assert(webApp, 'WebApplication must be present');
  assert.strictEqual(webApp.url, 'https://www.bestaitoolsfree.com/pdf-tools');
  assert.strictEqual(webApp.name, 'Free PDF Tools');
});

// 2. PDF Hub across all 10 non-English locales
it('Scenario 2: PDF Hub localized routes emit /{lang}/pdf-tools for all 10 languages', () => {
  const LOCALES = ['es', 'fr', 'de', 'pt', 'ar', 'ru', 'ja', 'zh', 'it', 'nl'];

  for (const lang of LOCALES) {
    const hubData = PDF_HUB_DATA[lang] || PDF_HUB_DATA['en'];
    const schemas = generatePdfToolSchemas(hubData, lang);
    const jsonString = JSON.stringify(schemas);

    assert(!jsonString.includes('/undefined'), `Locale ${lang} must not contain /undefined`);
    assert(jsonString.includes(`https://www.bestaitoolsfree.com/${lang}/pdf-tools`), `Locale ${lang} must include localized canonical URL`);

    const webApp = schemas.find(s => s['@type'] === 'WebApplication');
    assert.strictEqual(webApp.url, `https://www.bestaitoolsfree.com/${lang}/pdf-tools`, `WebApplication URL for ${lang} must match`);
  }
});

// 3. Individual PDF tool (merge-pdf, en)
it('Scenario 3: Individual tool (merge-pdf, en) preserves /merge-pdf and FAQPage schema', () => {
  const toolData = PDF_TOOLS_DATA['merge-pdf'];
  assert(toolData, 'PDF_TOOLS_DATA for merge-pdf must exist');
  assert.strictEqual(toolData.slug, 'merge-pdf');

  const schemas = generatePdfToolSchemas(toolData, 'en');
  assert.strictEqual(schemas.length, 3, 'Individual tool with FAQs must emit 3 schemas');

  const breadcrumbs = schemas.find(s => s['@type'] === 'BreadcrumbList');
  assert.strictEqual(breadcrumbs.itemListElement[0].item, 'https://www.bestaitoolsfree.com/pdf-tools');
  assert.strictEqual(breadcrumbs.itemListElement[1].item, 'https://www.bestaitoolsfree.com/merge-pdf');

  const webApp = schemas.find(s => s['@type'] === 'WebApplication');
  assert.strictEqual(webApp.url, 'https://www.bestaitoolsfree.com/merge-pdf');
  assert.strictEqual(webApp.name, toolData.h1);

  const faqPage = schemas.find(s => s['@type'] === 'FAQPage');
  assert(faqPage, 'FAQPage schema must be present for tool with FAQs');
  assert(faqPage.mainEntity.length > 0, 'FAQPage must contain questions');
  assert.strictEqual(faqPage.mainEntity[0].name, toolData.faqs[0].question);
});

// 4. All 17 individual PDF tools preserve their exact slugs
it('Scenario 4: All 17 individual PDF tools preserve their specific slugs in schemas', () => {
  for (const tool of PDF_TOOLS) {
    const toolData = PDF_TOOLS_DATA[tool.slug];
    assert(toolData, `Data for ${tool.slug} must exist`);

    const schemas = generatePdfToolSchemas(toolData, 'en');
    const jsonString = JSON.stringify(schemas);

    assert(!jsonString.includes('/undefined'), `Tool ${tool.slug} must not contain /undefined`);
    assert(jsonString.includes(`https://www.bestaitoolsfree.com/${tool.slug}`), `Tool ${tool.slug} must use its own slug in URLs`);

    const webApp = schemas.find(s => s['@type'] === 'WebApplication');
    assert.strictEqual(webApp.url, `https://www.bestaitoolsfree.com/${tool.slug}`);
  }
});

// 5. Individual PDF tool in multilingual locales (merge-pdf in es and ar)
it('Scenario 5: Individual PDF tool in non-English locales emits /{lang}/{slug}', () => {
  const toolData = PDF_TOOLS_DATA['merge-pdf'];
  
  const esSchemas = generatePdfToolSchemas(toolData, 'es');
  const esWebApp = esSchemas.find(s => s['@type'] === 'WebApplication');
  assert.strictEqual(esWebApp.url, 'https://www.bestaitoolsfree.com/es/merge-pdf');

  const arSchemas = generatePdfToolSchemas(toolData, 'ar');
  const arWebApp = arSchemas.find(s => s['@type'] === 'WebApplication');
  assert.strictEqual(arWebApp.url, 'https://www.bestaitoolsfree.com/ar/merge-pdf');
});

// 6. Safe handling of null/empty inputs
it('Scenario 6: Null or empty toolData returns empty array safely', () => {
  assert.deepStrictEqual(generatePdfToolSchemas(null), []);
  assert.deepStrictEqual(generatePdfToolSchemas(undefined), []);
});

// 7. Fallback when toolData has an empty string slug
it('Scenario 7: toolData with empty string slug safely defaults to pdf-tools', () => {
  const fakeData = { h1: 'Custom Tool', seoDescription: 'Desc', slug: '' };
  const schemas = generatePdfToolSchemas(fakeData, 'en');
  const webApp = schemas.find(s => s['@type'] === 'WebApplication');
  assert.strictEqual(webApp.url, 'https://www.bestaitoolsfree.com/pdf-tools');
});

console.log(`\nTOTAL SCENARIOS TESTED: ${passed + failed}`);
console.log(`PASSED:                 ${passed}`);
console.log(`FAILED:                 ${failed}`);
console.log('====================================================');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
