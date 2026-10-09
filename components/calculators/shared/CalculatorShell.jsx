import { Sparkles } from 'lucide-react';

export default function CalculatorShell({
  title,
  badge = 'Free Utility',
  children,
  className = ''
}) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden ${className}`}>
      {title && (
        <div className="bg-slate-50/80 border-b border-slate-200/80 px-6 py-4 flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            {title}
          </h2>
          {badge && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/70">
              <Sparkles className="w-3 h-3 text-blue-600" />
              {badge}
            </span>
          )}
        </div>
      )}
      <div className="p-5 sm:p-7 md:p-8">
        {children}
      </div>
    </div>
  );
}
