/**
 * lib/calculatorData/index.js
 * Central registry aggregating all 24 SEO-optimized calculators and category metadata.
 */

import { CALCULATOR_CATEGORIES } from './categories.js';
import { FINANCIAL_CALCULATORS } from './financial.js';
import { MATH_CALCULATORS } from './math.js';
import { TIME_DATE_CALCULATORS } from './timeDate.js';
import { FITNESS_CALCULATORS } from './fitness.js';
import { UTILITIES_CALCULATORS } from './utilities.js';
import { EDUCATION_CALCULATORS } from './education.js';

export { CALCULATOR_CATEGORIES } from './categories.js';

export const ALL_CALCULATORS = {
  ...FINANCIAL_CALCULATORS,
  ...MATH_CALCULATORS,
  ...TIME_DATE_CALCULATORS,
  ...FITNESS_CALCULATORS,
  ...UTILITIES_CALCULATORS,
  ...EDUCATION_CALCULATORS
};

export const CALCULATORS_LIST = Object.values(ALL_CALCULATORS);

export function getCalculatorBySlug(slug) {
  if (!slug) return null;
  return ALL_CALCULATORS[slug.toLowerCase()] || null;
}

export function getCalculatorsByCategory(categoryId) {
  if (!categoryId || categoryId === 'all') return CALCULATORS_LIST;
  return CALCULATORS_LIST.filter(c => c.category === categoryId);
}

export function getRelatedCalculators(currentSlug) {
  const current = getCalculatorBySlug(currentSlug);
  if (!current) return [];

  if (current.relatedSlugs && current.relatedSlugs.length > 0) {
    const list = current.relatedSlugs
      .map(slug => getCalculatorBySlug(slug))
      .filter(Boolean);
    if (list.length >= 3) return list.slice(0, 4);
  }

  // Fallback to same category
  return CALCULATORS_LIST
    .filter(c => c.slug !== currentSlug && c.category === current.category)
    .slice(0, 4);
}
