import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getToolUiTranslation } from '@/lib/toolUiDictionary';

export default function PdfBreadcrumb({ items = [], lang = 'en' }) {
  const langPrefix = lang === 'en' ? '' : `/${lang}`;
  const t = (key) => getToolUiTranslation(lang, key);

  const filteredItems = items.filter((item) => item.label !== 'PDF Tools' && item.label !== t('pdfToolsRoot'));

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 mb-6 flex-wrap">
      <Link href={`${langPrefix}/pdf-tools`} className="hover:text-blue-600 transition-colors font-semibold">
        {t('pdfToolsRoot')}
      </Link>
      {filteredItems.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          {item.href ? (
            <Link href={item.href.startsWith('/') ? `${langPrefix}${item.href}` : item.href} className="hover:text-blue-600 transition-colors font-medium">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-900 font-bold">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
