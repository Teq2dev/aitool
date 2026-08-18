// Lazy loaders for language-specific translation bundles
// Enables true code splitting so only the requested language is downloaded by the browser.

import en from './en';

export const loaders = {
  en: () => Promise.resolve(en),
  es: () => import('./es').then(m => m.default || m),
  fr: () => import('./fr').then(m => m.default || m),
  de: () => import('./de').then(m => m.default || m),
  pt: () => import('./pt').then(m => m.default || m),
  ar: () => import('./ar').then(m => m.default || m),
  ru: () => import('./ru').then(m => m.default || m),
  ja: () => import('./ja').then(m => m.default || m),
  zh: () => import('./zh').then(m => m.default || m),
  it: () => import('./it').then(m => m.default || m),
  nl: () => import('./nl').then(m => m.default || m),
};

export async function getTranslation(lang = 'en') {
  const loader = loaders[lang] || loaders.en;
  try {
    return await loader();
  } catch (err) {
    console.error(`Failed to load translation for ${lang}:`, err);
    return en;
  }
}

export { en };
