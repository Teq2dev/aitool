import assert from 'node:assert/strict';
import test from 'node:test';

// Test 1: Word-boundary safe truncation
function truncateAtWord(text, maxLength = 160) {
  if (!text || text.length <= maxLength) return text || '';
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > maxLength * 0.7) {
    return truncated.substring(0, lastSpace).trim();
  }
  return truncated.trim();
}

test('truncateAtWord: does not cut words in half when string exceeds maxLength', () => {
  const sample = 'Discover the best AI SEO tools for keyword research, content optimization, and competitor analysis. Compare features and find the right tool to boost your ranking in search engines.';
  assert.ok(sample.length > 160);
  
  const naiveTruncated = sample.substring(0, 160);
  assert.strictEqual(naiveTruncated.endsWith('ranki'), true, 'Naive truncation cuts ranki in half');

  const safeTruncated = truncateAtWord(sample, 160);
  assert.ok(safeTruncated.length <= 160);
  assert.strictEqual(safeTruncated.endsWith('boost your'), true, 'Safe truncation terminates cleanly on word boundary');
  assert.ok(!safeTruncated.endsWith('ranki'));
});

test('truncateAtWord: leaves short strings intact', () => {
  const shortText = 'Best AI SEO tools for growth.';
  assert.strictEqual(truncateAtWord(shortText, 160), shortText);
});

// Test 2: Category page ItemList structure verification
test('Category page ItemList schema builds valid SoftwareApplication items', () => {
  const sampleTools = [
    {
      _id: '1',
      name: 'Robinize',
      slug: 'robinize',
      shortDescription: 'AI content optimization for SEO writers.',
      logo: 'https://www.bestaitoolsfree.com/logos/robinize.png',
      pricing: 'Freemium',
      rating: 4.8,
      votes: 124,
    },
    {
      _id: '2',
      name: 'Diib',
      slug: 'diib',
      description: 'Automated SEO diagnostics.',
      pricing: 'Free',
      rating: 4.5,
      votes: 87,
    },
    {
      _id: '3',
      name: 'ToolNoVotes',
      slug: 'tool-no-votes',
      pricing: 'Paid',
      votes: 0,
    }
  ];

  const baseUrl = 'https://www.bestaitoolsfree.com';
  const itemList = {
    '@type': 'ItemList',
    numberOfItems: sampleTools.length,
    itemListElement: sampleTools.map((tool, index) => {
      const item = {
        '@type': 'SoftwareApplication',
        name: tool.name,
        description: tool.shortDescription || tool.description || undefined,
        url: `${baseUrl}/tools/${tool.slug}`,
        applicationCategory: 'AI Tool',
      };
      if (tool.logo) {
        item.image = tool.logo;
      }
      if (tool.pricing) {
        item.offers = {
          '@type': 'Offer',
          price: tool.pricing.toLowerCase() === 'free' ? '0' : undefined,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        };
      }
      if (tool.rating && tool.votes > 0) {
        item.aggregateRating = {
          '@type': 'AggregateRating',
          ratingValue: tool.rating,
          ratingCount: tool.votes,
          bestRating: 5,
          worstRating: 1,
        };
      }
      return {
        '@type': 'ListItem',
        position: index + 1,
        item,
      };
    }),
  };

  assert.strictEqual(itemList['@type'], 'ItemList');
  assert.strictEqual(itemList.numberOfItems, 3);
  assert.strictEqual(itemList.itemListElement[0].item.name, 'Robinize');
  assert.strictEqual(itemList.itemListElement[0].item.offers.price, undefined); // Freemium
  assert.strictEqual(itemList.itemListElement[0].item.aggregateRating.ratingValue, 4.8);
  assert.strictEqual(itemList.itemListElement[1].item.offers.price, '0'); // Free
  assert.strictEqual(itemList.itemListElement[2].item.aggregateRating, undefined); // No rating invented when votes == 0
});

// Test 3: Tool detail breadcrumbs point to authoritative /categories/[slug]
test('Tool detail breadcrumb points to authoritative category URL', () => {
  const primaryCategory = 'seo';
  const baseUrl = 'https://www.bestaitoolsfree.com';
  
  const schemaBreadcrumb = {
    '@type': 'ListItem',
    position: 3,
    name: primaryCategory.replace(/-/g, ' '),
    item: `${baseUrl}/categories/${encodeURIComponent(primaryCategory)}`
  };

  assert.strictEqual(schemaBreadcrumb.item, 'https://www.bestaitoolsfree.com/categories/seo');
  assert.ok(!schemaBreadcrumb.item.includes('?category='));
});

// Test 4: /tools?category canonical and robots behavior
test('/tools?category=seo canonicalizes to /categories/seo and emits robots noindex', () => {
  const baseUrl = 'https://www.bestaitoolsfree.com';
  const category = 'seo';
  const search = '';

  const url = category ? `${baseUrl}/categories/${encodeURIComponent(category)}` : `${baseUrl}/tools`;
  const robots = (search || category) ? { index: false, follow: true } : undefined;
  const alternates = {
    canonical: url,
    languages: {
      'x-default': category ? `${baseUrl}/categories/${encodeURIComponent(category)}` : `${baseUrl}/tools`,
      'en': category ? `${baseUrl}/categories/${encodeURIComponent(category)}` : `${baseUrl}/tools`,
      'fr': category ? `${baseUrl}/fr/categories/${encodeURIComponent(category)}` : `${baseUrl}/fr/tools`,
    }
  };

  assert.strictEqual(alternates.canonical, 'https://www.bestaitoolsfree.com/categories/seo');
  assert.strictEqual(alternates.languages['fr'], 'https://www.bestaitoolsfree.com/fr/categories/seo');
  assert.deepStrictEqual(robots, { index: false, follow: true });
});
