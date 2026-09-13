/**
 * Helper to generate standardized JSON-LD structured data for PDF tools:
 * 1. BreadcrumbList
 * 2. WebApplication
 * 3. FAQPage (matching visible FAQ content 1:1)
 */

export function generatePdfToolSchemas(toolData, lang = 'en') {
  if (!toolData) return [];

  const langPrefix = lang === 'en' ? '' : `/${lang}`;
  const canonicalUrl = `https://www.bestaitoolsfree.com${langPrefix}/${toolData.slug}`;

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'PDF Tools',
        item: `https://www.bestaitoolsfree.com${langPrefix}/pdf-tools`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: toolData.h1 || toolData.seoTitle.split('–')[0].trim(),
        item: canonicalUrl,
      },
    ],
  };

  const webApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: toolData.h1,
    url: canonicalUrl,
    description: toolData.seoDescription,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (toolData.faqs || []).map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return [breadcrumbs, webApp, faqSchema];
}
