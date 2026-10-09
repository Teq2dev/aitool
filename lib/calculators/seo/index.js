/**
 * lib/calculators/seo/index.js
 * Central SEO Registry Entry Point
 */

import { CALCULATOR_SEO_SPECS } from './seoSpecs.js';
import { CALCULATOR_KEYWORD_MAP } from './keywordMap.js';

export { CALCULATOR_SEO_SPECS } from './seoSpecs.js';
export { CALCULATOR_KEYWORD_MAP } from './keywordMap.js';
export * from './localized/index.js';

export function getCalculatorSeoSpec(slug) {
  if (!slug) return null;
  return CALCULATOR_SEO_SPECS[slug.toLowerCase()] || null;
}

export function getCalculatorKeywordData(slug) {
  if (!slug) return null;
  return CALCULATOR_KEYWORD_MAP[slug.toLowerCase()] || null;
}

export function getAllCalculatorSlugs() {
  return Object.keys(CALCULATOR_SEO_SPECS).filter(s => s !== 'hub');
}
