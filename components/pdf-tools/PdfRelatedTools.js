import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getRelatedPdfTools } from '@/lib/pdfConfig';
import { getPdfToolData } from '@/lib/pdfToolData';
import { getToolUiTranslation } from '@/lib/toolUiDictionary';

export default function PdfRelatedTools({ currentSlug, title, lang = 'en' }) {
  const rawTools = getRelatedPdfTools(currentSlug, 4);

  if (rawTools.length === 0) return null;

  const langPrefix = lang === 'en' ? '' : `/${lang}`;
  const t = (key, params) => getToolUiTranslation(lang, key, params);
  const sectionTitle = title || t('moreFreePdfUtilities');

  const tools = rawTools.map((baseTool) => {
    const fullData = getPdfToolData(baseTool.slug);
    const locData = fullData?.translations?.[lang] || fullData || baseTool;
    return {
      slug: baseTool.slug,
      name: locData.name || baseTool.name,
      tagline: locData.tagline || locData.heroSubtitle || baseTool.tagline || baseTool.description,
      badge: locData.badge || baseTool.badge,
    };
  });

  return (
    <section className="mt-20 pt-12 border-t border-slate-200/80">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-black text-blue-600 uppercase tracking-wider">{t('pdfSuite')}</span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">{sectionTitle}</h2>
        </div>
        <Link
          href={`${langPrefix}/pdf-tools`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
        >
          {t('viewAllPdfTools')} <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`${langPrefix}/${tool.slug}`}
            className="group relative bg-white border border-slate-200/90 rounded-2xl p-5 hover:border-blue-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                  {tool.badge || t('toolBadge')}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
              </div>

              <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                {tool.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
                {tool.tagline}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-blue-600">
              {t('openTool')}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
