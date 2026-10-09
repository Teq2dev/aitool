/**
 * lib/calculatorSchemaHelper.js
 * Generates Google-compliant JSON-LD schemas for Calculator Hub and Calculator pages
 * with full 11-language localization and schema.org standard validation.
 */

const BASE_URL = 'https://www.bestaitoolsfree.com';

const BREADCRUMB_LABELS = {
  en: { home: 'Home', calculators: 'Calculators' },
  es: { home: 'Inicio', calculators: 'Calculadoras' },
  fr: { home: 'Accueil', calculators: 'Calculatrices' },
  de: { home: 'Startseite', calculators: 'Rechner' },
  pt: { home: 'Início', calculators: 'Calculadoras' },
  ar: { home: 'الرئيسية', calculators: 'الحاسبات' },
  ru: { home: 'Главная', calculators: 'Калькуляторы' },
  ja: { home: 'ホーム', calculators: '計算機' },
  zh: { home: '首页', calculators: '计算器' },
  it: { home: 'Home', calculators: 'Calcolatori' },
  nl: { home: 'Home', calculators: 'Rekenmachines' }
};

export function getLocalizedBreadcrumbLabels(lang = 'en') {
  return BREADCRUMB_LABELS[lang] || BREADCRUMB_LABELS.en;
}

export function generateCalculatorSchemas(calcData, lang = 'en') {
  if (!calcData) return [];

  const langPrefix = lang === 'en' ? '' : `/${lang}`;
  const canonicalUrl = `${BASE_URL}${langPrefix}/calculators/${calcData.slug}`;
  const labels = getLocalizedBreadcrumbLabels(lang);

  // 1. BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: labels.home,
        item: `${BASE_URL}${langPrefix}`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: labels.calculators,
        item: `${BASE_URL}${langPrefix}/calculators`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: calcData.breadcrumbName || calcData.name,
        item: canonicalUrl
      }
    ]
  };

  // 2. WebApplication / SoftwareApplication Schema
  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: calcData.name,
    url: canonicalUrl,
    inLanguage: lang,
    applicationCategory: calcData.category === 'financial' ? 'FinanceApplication' : 'UtilitiesApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: calcData.seoDescription,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    featureList: calcData.features || [
      'Instant calculation in browser',
      'Accurate mathematical formulas',
      'Mobile-responsive design',
      'Export and copy results'
    ]
  };

  // 3. FAQPage Schema
  const schemas = [breadcrumbSchema, appSchema];

  if (calcData.faqs && calcData.faqs.length > 0) {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: lang,
      mainEntity: calcData.faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };
    schemas.push(faqSchema);
  }

  return schemas;
}

export function generateCalculatorHubSchemas(hubData, lang = 'en') {
  const langPrefix = lang === 'en' ? '' : `/${lang}`;
  const hubUrl = `${BASE_URL}${langPrefix}/calculators`;
  const labels = getLocalizedBreadcrumbLabels(lang);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: labels.home,
        item: `${BASE_URL}${langPrefix}`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: labels.calculators,
        item: hubUrl
      }
    ]
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: hubData?.title || 'Free Online Calculators - Best AI Tools Free',
    url: hubUrl,
    inLanguage: lang,
    description: hubData?.description || 'Explore 24 free, fast, and mobile-friendly online calculators for finance, math, fitness, time, education, and daily utilities.',
    provider: {
      '@type': 'Organization',
      name: 'Best AI Tools Free',
      url: BASE_URL
    }
  };

  const schemas = [breadcrumbSchema, collectionSchema];

  if (hubData?.faqs && hubData.faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: lang,
      mainEntity: hubData.faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    });
  }

  return schemas;
}
