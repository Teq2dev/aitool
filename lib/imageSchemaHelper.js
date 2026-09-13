/**
 * lib/imageSchemaHelper.js — Standardized JSON-LD Schema Generator for Image Tools
 *
 * Generates valid, Google-compliant schema graphs:
 *  1. WebApplication (software metadata, free price, OS support)
 *  2. BreadcrumbList (Home -> Image Tools -> Tool Name)
 *  3. FAQPage (verified 5 QA pairs)
 */

import { getImageToolData } from './imageToolData';

const BASE_URL = 'https://www.bestaitoolsfree.com';

export function getImageToolSchema(slug, lang = 'en', localizedTool = null) {
  const tool = localizedTool || getImageToolData(slug);
  if (!tool) return [];

  const langPrefix = lang === 'en' ? '' : `/${lang}`;
  const canonicalUrl = `${BASE_URL}${langPrefix}/${slug}`;

  const schemas = [];

  // 1. WebApplication
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    url: canonicalUrl,
    description: tool.metaDescription,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires modern web browser with HTML5 Canvas support',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      tool.tagline,
      tool.processingMode,
      tool.privacyBadge,
      `Supports ${tool.inputFormats.join(', ')} formats`,
    ],
  });

  // 2. BreadcrumbList
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${BASE_URL}${langPrefix}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Image Tools',
        item: `${BASE_URL}${langPrefix}/image-tools`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: tool.name,
        item: canonicalUrl,
      },
    ],
  });

  // 3. FAQPage
  if (tool.faqs && tool.faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: tool.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    });
  }

  return schemas;
}
