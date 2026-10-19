import { describe, it } from 'node:test';
import assert from 'node:assert';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const nextConfig = require('../next.config.js');
const { pathToRegexp } = require('next/dist/compiled/path-to-regexp');

describe('Verified 10 GSC Redirects in next.config.js (Self-Loops Removed)', async () => {
  const redirects = await nextConfig.redirects();

  function matchRedirect(requestPath) {
    for (const rule of redirects) {
      const keys = [];
      const regexp = pathToRegexp(rule.source, keys);
      const match = regexp.exec(requestPath);
      if (match) {
        let dest = rule.destination;
        keys.forEach((key, index) => {
          dest = dest.replace(`:${key.name}`, match[index + 1]);
        });
        return { matched: true, destination: dest, statusCode: rule.statusCode, ruleSource: rule.source };
      }
    }
    return { matched: false };
  }

  const expected10Mappings = [
    { source: '/ja/categories/Customer%20Support', expectedDest: '/ja/categories/customersupport' },
    { source: '/it/categories/Customer%20Support', expectedDest: '/it/categories/customersupport' },
    { source: '/fr/categories/Customer%20Support', expectedDest: '/fr/categories/customersupport' },
    { source: '/zh/categories/Customer%20Support', expectedDest: '/zh/categories/customersupport' },
    { source: '/pt/categories/Customer%20Support', expectedDest: '/pt/categories/customersupport' },
    { source: '/categories/AI%20writing%20assistant', expectedDest: '/categories/ai-writers' },
    { source: '/ja/categories/AI%20Writing%20Assistant', expectedDest: '/ja/categories/ai-writers' },
    { source: '/zh/categories/Presentation', expectedDest: '/zh/categories/presentationmakers' },
    { source: '/fr/redimensionneur-image', expectedDest: '/fr/image-resizer' },
    { source: '/fr/convertisseur-image', expectedDest: '/fr/image-converter' },
  ];

  it('correctly matches and redirects all 10 retained verified source URLs', () => {
    for (const mapping of expected10Mappings) {
      const res = matchRedirect(mapping.source);
      assert.strictEqual(res.matched, true, `Failed to match ${mapping.source}`);
      assert.strictEqual(res.destination, mapping.expectedDest, `Incorrect destination for ${mapping.source}`);
      assert.strictEqual(res.statusCode, 301, `Status code must be 301 for ${mapping.source}`);
    }
  });

  it('confirms the 3 self-looping casing routes were removed and do not match redirect rules', () => {
    const seoNl = matchRedirect('/nl/categories/seo');
    assert.strictEqual(seoNl.matched, false, '/nl/categories/seo must not match any redirect rule');

    const seoRu = matchRedirect('/ru/categories/seo');
    assert.strictEqual(seoRu.matched, false, '/ru/categories/seo must not match any redirect rule');

    const salesFr = matchRedirect('/fr/categories/sales');
    assert.strictEqual(salesFr.matched, false, '/fr/categories/sales must not match any redirect rule');
  });

  it('does not over-match unrelated language prefixes for constrained rules', () => {
    // /de/categories/Customer%20Support should not match
    const resDeCust = matchRedirect('/de/categories/Customer%20Support');
    assert.strictEqual(resDeCust.matched, false, 'Unintended language matched for Customer Support');

    // /en/categories/Customer%20Support should not match
    const resEnCust = matchRedirect('/en/categories/Customer%20Support');
    assert.strictEqual(resEnCust.matched, false, 'English matched for constrained Customer Support');
  });

  it('guarantees no redirect loops or chains among retained mappings', () => {
    for (const mapping of expected10Mappings) {
      const destMatch = matchRedirect(mapping.expectedDest);
      assert.strictEqual(
        destMatch.matched,
        false,
        `Loop or chain detected: ${mapping.expectedDest} redirects to ${destMatch.destination}`
      );
    }
  });

  it('preserves existing redirect rules without modification', () => {
    const resTerms = matchRedirect('/terms-and-conditions');
    assert.strictEqual(resTerms.matched, true);
    assert.strictEqual(resTerms.destination, '/terms');

    const resTool = matchRedirect('/tools/originalityai');
    assert.strictEqual(resTool.matched, true);
    assert.strictEqual(resTool.destination, '/tools/originality-ai');
  });
});
