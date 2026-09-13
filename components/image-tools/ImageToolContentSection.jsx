import Link from 'next/link';
import {
  CheckCircle2,
  ShieldCheck,
  Zap,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Layers,
  FileText,
  Lock,
} from 'lucide-react';
import { getImageToolData } from '@/lib/imageToolData';
import { getToolUiTranslation } from '@/lib/toolUiDictionary';

export default function ImageToolContentSection({ slug, lang = 'en' }) {
  const baseTool = getImageToolData(slug);
  if (!baseTool) return null;

  const tool = baseTool.translations?.[lang] || baseTool;
  const langPrefix = lang === 'en' ? '' : `/${lang}`;
  const t = (key, params) => getToolUiTranslation(lang, key, params);

  return (
    <div className="mt-16 sm:mt-24 space-y-12 sm:space-y-16 text-slate-700 max-w-5xl mx-auto">
      {/* ── 1. Overview & Step-by-Step Guide ── */}
      <section className="bg-slate-50/80 rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/80 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> {t('howItWorks')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t('howToUse', { name: tool.name })}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
            {tool.overview}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {tool.steps.map((s) => (
            <div
              key={s.step}
              className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 font-mono text-sm font-bold flex items-center justify-center">
                  {s.step}
                </span>
                <h3 className="font-bold text-slate-900 text-sm">{s.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 2. Practical Use Cases ── */}
      <section className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">{t('scenarios')}</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t('commonUseCases')}
          </h2>
          <p className="text-sm text-slate-600">
            {t('realWorldWorkflows', { name: tool.name })}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {tool.useCases.map((uc, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:border-slate-300 transition-all space-y-2"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <h3 className="font-bold text-slate-900 text-sm">{uc.title}</h3>
              </div>
              <p className="text-xs text-slate-500 pl-6 leading-relaxed">{uc.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Architecture & Privacy Guarantee ── */}
      <section className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              {tool.privacyBadge}
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {t('technicalArchitecturePrivacy')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {tool.technicalArchitecture}
            </p>
          </div>
        </div>

        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-3">
          <Lock className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            <strong>{t('privacyGuarantee')}</strong> {tool.privacyGuarantee}
          </p>
        </div>
      </section>

      {/* ── 4. Frequently Asked Questions ── */}
      <section className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" /> {t('questionsAnswers')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t('frequentlyAskedQuestions')}
          </h2>
        </div>

        <div className="space-y-3">
          {tool.faqs.map((faq, idx) => (
            <details
              key={idx}
              className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs transition-all"
            >
              <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-sm text-slate-900 hover:text-blue-600 list-none">
                <span>{faq.q}</span>
                <span className="ml-4 text-slate-400 group-open:rotate-90 transition-transform font-mono text-base flex-shrink-0">
                  ›
                </span>
              </summary>
              <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ── 5. Cross-Category Related Tools ── */}
      {tool.relatedTools && tool.relatedTools.length > 0 && (
        <section className="space-y-6 pt-4 border-t border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">{t('explore')}</span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                {t('relatedImagePdfTools')}
              </h2>
            </div>
            <Link
              href={`${langPrefix}/image-tools`}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center gap-1"
            >
              {t('viewAllImageTools')} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tool.relatedTools.map((rel) => (
              <Link
                key={rel.slug}
                href={`${langPrefix}/${rel.slug}`}
                className="group bg-white border border-slate-200/90 rounded-2xl p-5 hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
                      {rel.slug.includes('pdf') ? t('pdfToolTag') : t('imageToolTag')}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {rel.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                    {rel.desc}
                  </p>
                </div>

                <div className="text-[11px] font-bold text-blue-600 flex items-center gap-1">
                  {t('openTool')}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
