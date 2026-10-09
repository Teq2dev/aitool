/**
 * lib/calculators/currencyUtils.js
 * Centralized, international currency configuration and formatting utilities
 * for all financial and monetary calculators.
 * 
 * BestAIToolsFree is an international platform. The default currency is USD,
 * with seamless display switching across 15 major world currencies.
 * Calculations remain 100% currency-neutral; currency affects presentation only.
 */

export const SUPPORTED_CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar', label: 'USD — US Dollar ($)', locale: 'en-US' },
  { code: 'EUR', symbol: '€', name: 'Euro', label: 'EUR — Euro (€)', locale: 'de-DE' },
  { code: 'GBP', symbol: '£', name: 'British Pound', label: 'GBP — British Pound (£)', locale: 'en-GB' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', label: 'INR — Indian Rupee (₹)', locale: 'en-IN' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', label: 'CAD — Canadian Dollar (C$)', locale: 'en-CA' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', label: 'AUD — Australian Dollar (A$)', locale: 'en-AU' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', label: 'CHF — Swiss Franc (CHF)', locale: 'de-CH' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', label: 'JPY — Japanese Yen (¥)', locale: 'ja-JP', zeroDecimal: true },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', label: 'CNY — Chinese Yuan (¥)', locale: 'zh-CN' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', label: 'SGD — Singapore Dollar (S$)', locale: 'en-SG' },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar', label: 'HKD — Hong Kong Dollar (HK$)', locale: 'en-HK' },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', label: 'NZD — New Zealand Dollar (NZ$)', locale: 'en-NZ' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', label: 'AED — UAE Dirham (د.إ)', locale: 'ar-AE' },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal', label: 'SAR — Saudi Riyal (﷼)', locale: 'ar-SA' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', label: 'ZAR — South African Rand (R)', locale: 'en-ZA' }
];

export const DEFAULT_CURRENCY = 'USD';

/**
 * Find currency metadata by currency code.
 * Defaults to USD if not found.
 */
export function getCurrency(code = DEFAULT_CURRENCY) {
  const normalized = (code || '').toUpperCase().trim();
  return SUPPORTED_CURRENCIES.find((c) => c.code === normalized) || SUPPORTED_CURRENCIES[0];
}

/**
 * Returns the currency symbol for an input prefix or short tag.
 */
export function getCurrencySymbol(code = DEFAULT_CURRENCY) {
  return getCurrency(code).symbol;
}

/**
 * Locale-aware international monetary formatter using Intl.NumberFormat.
 * 
 * @param {number|string} amount - The numeric monetary value to format.
 * @param {string} currencyCode - Standard 3-letter currency code (e.g. 'USD', 'EUR', 'INR').
 * @param {object} options - Optional overrides for decimals or custom locales.
 * @returns {string} Formatted currency string (e.g. "$1,250.00", "€1.250,00", "₹1,250.00").
 */
export function formatCurrency(amount, currencyCode = DEFAULT_CURRENCY, options = {}) {
  const num = Number(amount);
  if (isNaN(num)) return '';

  const curr = getCurrency(currencyCode);
  const decimals = curr.zeroDecimal ? 0 : (options.decimals !== undefined ? options.decimals : 2);

  try {
    return new Intl.NumberFormat(curr.locale || 'en-US', {
      style: 'currency',
      currency: curr.code,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(num);
  } catch (err) {
    // Robust fallback
    return `${curr.symbol}${num.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    })}`;
  }
}
