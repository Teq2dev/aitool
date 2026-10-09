import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { getLocalizedBreadcrumbLabels } from '@/lib/calculatorSchemaHelper';

export default function CalculatorBreadcrumb({ items = [], lang = 'en' }) {
  const labels = getLocalizedBreadcrumbLabels(lang);
  const langPrefix = lang === 'en' ? '' : `/${lang}`;
  const isRtl = lang === 'ar';

  return (
    <nav aria-label="Breadcrumb" className="mb-6" dir={isRtl ? 'rtl' : 'ltr'}>
      <ol className="flex items-center flex-wrap gap-1.5 text-xs sm:text-sm text-slate-500 font-medium">
        <li>
          <Link
            href={langPrefix || '/'}
            className="flex items-center gap-1 hover:text-blue-600 transition-colors py-1"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{labels.home}</span>
          </Link>
        </li>
        <li className="text-slate-300" aria-hidden="true">
          <ChevronRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
        </li>
        <li>
          <Link
            href={`${langPrefix}/calculators`}
            className="hover:text-blue-600 transition-colors py-1"
          >
            {labels.calculators}
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              <span className="text-slate-300" aria-hidden="true">
                <ChevronRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
              </span>
              {isLast ? (
                <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-none" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href || '#'}
                  className="hover:text-blue-600 transition-colors py-1 truncate max-w-[150px] sm:max-w-none"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
