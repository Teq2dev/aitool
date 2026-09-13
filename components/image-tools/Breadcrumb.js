import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getToolUiTranslation } from '@/lib/toolUiDictionary';

/**
 * Breadcrumb navigation for Image Tool pages.
 *
 * Props:
 *  items: Array<{ label: string, href?: string, active?: boolean }>
 *  className: string
 *  lang: string
 */
export default function Breadcrumb({ items = [], className = '', lang = 'en' }) {
  const langPrefix = lang === 'en' ? '' : `/${lang}`;
  const t = (key) => getToolUiTranslation(lang, key);

  // Filter out any duplicate root labels
  const filteredItems = items.filter((item) => item.label !== 'Image Tools' && item.label !== t('imageToolsRoot'));

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center gap-1.5 text-xs text-slate-500 flex-wrap ${className}`}>
      <Link href={`${langPrefix}/image-tools`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-semibold">
        {t('imageToolsRoot')}
      </Link>
      {filteredItems.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          {item.href && !item.active ? (
            <Link href={item.href.startsWith('/') ? `${langPrefix}${item.href}` : item.href} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-900 dark:text-white font-bold">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
