'use client';

import { useState } from 'react';
import { Copy, Check, Info } from 'lucide-react';

export default function CalculatorResultCard({
  title = 'Calculation Result',
  primaryValue,
  primaryLabel,
  secondaryItems = [],
  formulaUsed,
  note,
  copyValue,
  className = ''
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = copyValue || `${primaryLabel ? `${primaryLabel}: ` : ''}${primaryValue}`;
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(String(textToCopy)).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {});
    }
  };

  if (!primaryValue && secondaryItems.length === 0) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Calculation Result"
      className={`mt-6 rounded-2xl bg-gradient-to-b from-blue-50/70 to-slate-50/80 border border-blue-200/80 p-5 sm:p-6 md:p-7 shadow-xs ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-900/80">
          {title}
        </span>

        {primaryValue && (
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-all cursor-pointer shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Copy calculation result"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy</span>
              </>
            )}
          </button>
        )}
      </div>

      {primaryValue && (
        <div className="space-y-1 mb-5">
          {primaryLabel && (
            <div className="text-xs sm:text-sm font-medium text-slate-600">
              {primaryLabel}
            </div>
          )}
          <div className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight break-words">
            {primaryValue}
          </div>
        </div>
      )}

      {secondaryItems.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-4 border-t border-blue-200/60">
          {secondaryItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/90 rounded-xl p-3 border border-slate-200/70 shadow-2xs"
            >
              <div className="text-xs font-medium text-slate-500 mb-1">
                {item.label}
              </div>
              <div className={`text-base sm:text-lg font-bold ${item.color || 'text-slate-900'} break-words`}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {formulaUsed && (
        <div className="mt-4 pt-3 border-t border-blue-200/50 flex items-start gap-2 text-xs text-slate-600">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-700">Formula Applied: </span>
            <code className="bg-white px-2 py-0.5 rounded border border-slate-200 font-mono text-[11px] text-blue-800">
              {formulaUsed}
            </code>
          </div>
        </div>
      )}

      {note && (
        <p className="mt-3 text-xs text-slate-500 leading-relaxed italic">
          {note}
        </p>
      )}
    </div>
  );
}
