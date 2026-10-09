/**
 * lib/calculators/seo/localizedContentSchema.js
 * Strict validation schema for localized calculator SEO profiles.
 */

export const SUPPORTED_LANGUAGES = [
  'en', 'es', 'fr', 'de', 'pt', 'ar', 'ru', 'ja', 'zh', 'it', 'nl'
];

export const LANGUAGE_META = {
  en: { name: 'English', dir: 'ltr', defaultLocale: 'en-US' },
  es: { name: 'Español', dir: 'ltr', defaultLocale: 'es-ES' },
  fr: { name: 'Français', dir: 'ltr', defaultLocale: 'fr-FR' },
  de: { name: 'Deutsch', dir: 'ltr', defaultLocale: 'de-DE' },
  pt: { name: 'Português', dir: 'ltr', defaultLocale: 'pt-BR' },
  ar: { name: 'العربية', dir: 'rtl', defaultLocale: 'ar-SA' },
  ru: { name: 'Русский', dir: 'ltr', defaultLocale: 'ru-RU' },
  ja: { name: '日本語', dir: 'ltr', defaultLocale: 'ja-JP' },
  zh: { name: '中文', dir: 'ltr', defaultLocale: 'zh-CN' },
  it: { name: 'Italiano', dir: 'ltr', defaultLocale: 'it-IT' },
  nl: { name: 'Nederlands', dir: 'ltr', defaultLocale: 'nl-NL' }
};

export const EXPECTED_SLUGS = [
  'loan-calculator',
  'emi-calculator',
  'mortgage-calculator',
  'compound-interest-calculator',
  'simple-interest-calculator',
  'gst-calculator',
  'tax-calculator',
  'discount-calculator',
  'profit-margin-calculator',
  'salary-calculator',
  'currency-calculator',
  'percentage-calculator',
  'ratio-calculator',
  'fraction-calculator',
  'age-calculator',
  'time-calculator',
  'date-calculator',
  'hours-calculator',
  'bmi-calculator',
  'pace-calculator',
  'fuel-cost-calculator',
  'electricity-cost-calculator',
  'gpa-calculator',
  'grade-calculator'
];

export function validateCalculatorProfile(data, lang, slug) {
  const errors = [];

  if (!data) {
    return { valid: false, errors: [`Missing data for [${slug}] in language [${lang}]`] };
  }

  if (data.slug !== slug) {
    errors.push(`Mismatched slug: expected "${slug}", got "${data.slug}"`);
  }
  if (data.lang !== lang) {
    errors.push(`Mismatched lang: expected "${lang}", got "${data.lang}"`);
  }
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.push(`Missing or invalid "name"`);
  }
  if (!data.h1 || typeof data.h1 !== 'string' || data.h1.trim().length === 0) {
    errors.push(`Missing or invalid "h1"`);
  }
  if (!data.seoTitle || typeof data.seoTitle !== 'string' || data.seoTitle.trim().length === 0) {
    errors.push(`Missing or invalid "seoTitle"`);
  }
  if (!data.seoDescription || typeof data.seoDescription !== 'string' || data.seoDescription.trim().length === 0) {
    errors.push(`Missing or invalid "seoDescription"`);
  }
  if (!data.heroSubtitle || typeof data.heroSubtitle !== 'string' || data.heroSubtitle.trim().length === 0) {
    errors.push(`Missing or invalid "heroSubtitle"`);
  }
  if (!data.badge || typeof data.badge !== 'string' || data.badge.trim().length === 0) {
    errors.push(`Missing or invalid "badge"`);
  }

  // Keywords
  if (!data.primaryKeyword || typeof data.primaryKeyword !== 'string') {
    errors.push(`Missing or invalid "primaryKeyword"`);
  }
  if (!Array.isArray(data.secondaryKeywords) || data.secondaryKeywords.length < 2) {
    errors.push(`"secondaryKeywords" must be an array with at least 2 items`);
  }

  // About paragraphs
  if (!Array.isArray(data.about) || data.about.length < 2) {
    errors.push(`"about" must be an array of at least 2 paragraphs`);
  }

  // Formula
  if (!data.formula || typeof data.formula !== 'object') {
    errors.push(`Missing or invalid "formula" object`);
  } else {
    if (!data.formula.title) errors.push(`Missing formula.title`);
    if (!data.formula.formulaText) errors.push(`Missing formula.formulaText`);
    if (!data.formula.explanation) errors.push(`Missing formula.explanation`);
    if (!Array.isArray(data.formula.variables) || data.formula.variables.length === 0) {
      errors.push(`Missing or empty formula.variables`);
    }
  }

  // How to calculate
  if (!Array.isArray(data.howToCalculate) || data.howToCalculate.length < 3) {
    errors.push(`"howToCalculate" must contain at least 3 steps`);
  }

  // Worked example
  if (!data.example || typeof data.example !== 'object') {
    errors.push(`Missing or invalid "example" object`);
  } else {
    if (!data.example.problem) errors.push(`Missing example.problem`);
    if (!Array.isArray(data.example.steps) || data.example.steps.length < 2) {
      errors.push(`"example.steps" must contain at least 2 steps`);
    }
    if (!data.example.result) errors.push(`Missing example.result`);
  }

  // Notes
  if (!Array.isArray(data.notes) || data.notes.length < 2) {
    errors.push(`"notes" must contain at least 2 items`);
  }

  // FAQs
  if (!Array.isArray(data.faqs) || data.faqs.length < 3) {
    errors.push(`"faqs" must contain at least 3 FAQ items`);
  } else {
    data.faqs.forEach((faq, i) => {
      if (!faq.question || typeof faq.question !== 'string') {
        errors.push(`FAQ #${i + 1} is missing a question`);
      }
      if (!faq.answer || typeof faq.answer !== 'string') {
        errors.push(`FAQ #${i + 1} is missing an answer`);
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function validateHubProfile(data, lang) {
  const errors = [];
  if (!data) return { valid: false, errors: [`Missing hub data for language [${lang}]`] };

  if (data.lang !== lang) errors.push(`Hub lang mismatch: expected "${lang}", got "${data.lang}"`);
  if (!data.title) errors.push('Missing hub.title');
  if (!data.description) errors.push('Missing hub.description');
  if (!data.h1) errors.push('Missing hub.h1');
  if (!data.subtitle) errors.push('Missing hub.subtitle');
  if (!Array.isArray(data.faqs) || data.faqs.length < 3) errors.push('Hub faqs must have at least 3 items');
  if (!data.breadcrumbs || !data.breadcrumbs.home || !data.breadcrumbs.calculators) {
    errors.push('Hub breadcrumbs must contain "home" and "calculators" labels');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
