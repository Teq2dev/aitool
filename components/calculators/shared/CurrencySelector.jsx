'use client';

import { useId } from 'react';
import { SUPPORTED_CURRENCIES, DEFAULT_CURRENCY } from '@/lib/calculators/currencyUtils';
import { Globe } from 'lucide-react';

/**
 * Reusable, international currency selector component for monetary calculators.
 * Supports 15 world currencies, fully accessible, responsive, and mobile-friendly.
 */
export default function CurrencySelector({
  value = DEFAULT_CURRENCY,
  onChange,
  label = 'Display Currency',
  compact = false,
  className = ''
}) {
  const generatedId = useId();
  const selectId = `currency-select-${generatedId}`;

  return (
    <div className={`space-y-1 ${className}`}>
      {!compact && label && (
        <label
          htmlFor={selectId}
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500"
        >
          <Globe className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
          <span>{label}</span>
        </label>
      )}

      <div className="relative">
        <select
          id={selectId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={label || 'Select Display Currency'}
          className="w-full text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 bg-white hover:border-slate-400 py-2 pl-3 pr-8 text-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer shadow-2xs"
        >
          {SUPPORTED_CURRENCIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
