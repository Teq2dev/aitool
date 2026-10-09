/**
 * lib/calculators/seo/localized/index.js
 * Central multilingual SEO access layer providing statically compiled
 * profiles for all 24 calculators and the hub across 11 supported languages.
 */

import { CALCULATORS_EN } from './en.js';
import { CALCULATORS_ES } from './es.js';
import { CALCULATORS_FR } from './fr.js';
import { CALCULATORS_DE } from './de.js';
import { CALCULATORS_PT } from './pt.js';
import { CALCULATORS_AR } from './ar.js';
import { CALCULATORS_RU } from './ru.js';
import { CALCULATORS_JA } from './ja.js';
import { CALCULATORS_ZH } from './zh.js';
import { CALCULATORS_IT } from './it.js';
import { CALCULATORS_NL } from './nl.js';
import { CALCULATORS_HUB_LOCALIZED } from './hub.js';

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

const CALCULATOR_DICTS = {
  en: CALCULATORS_EN,
  es: CALCULATORS_ES,
  fr: CALCULATORS_FR,
  de: CALCULATORS_DE,
  pt: CALCULATORS_PT,
  ar: CALCULATORS_AR,
  ru: CALCULATORS_RU,
  ja: CALCULATORS_JA,
  zh: CALCULATORS_ZH,
  it: CALCULATORS_IT,
  nl: CALCULATORS_NL
};

export function isRtlLanguage(lang) {
  return lang === 'ar';
}

export function getLocalizedCalculatorData(slug, lang = 'en') {
  if (!slug) return null;
  const targetLang = SUPPORTED_LANGUAGES.includes(lang) ? lang : 'en';
  const dict = CALCULATOR_DICTS[targetLang] || CALCULATORS_EN;
  const profile = dict[slug.toLowerCase()];

  if (profile && profile.name) {
    return profile;
  }

  // Graceful fallback to English baseline
  return CALCULATORS_EN[slug.toLowerCase()] || null;
}

export function getAllLocalizedCalculators(lang = 'en') {
  const targetLang = SUPPORTED_LANGUAGES.includes(lang) ? lang : 'en';
  const dict = CALCULATOR_DICTS[targetLang] || CALCULATORS_EN;
  return Object.values(dict);
}

export function getLocalizedHubData(lang = 'en') {
  const targetLang = SUPPORTED_LANGUAGES.includes(lang) ? lang : 'en';
  return CALCULATORS_HUB_LOCALIZED[targetLang] || CALCULATORS_HUB_LOCALIZED.en;
}
