import { CALCULATOR_CATEGORIES, CALCULATORS_LIST } from '@/lib/calculatorData';
import { getLocalizedHubData, getLocalizedCalculatorData } from '@/lib/calculators/seo';
import { generateCalculatorHubSchemas } from '@/lib/calculatorSchemaHelper';
import CalculatorHubClient from '@/components/calculators/CalculatorHubClient';
import Link from 'next/link';
import {
  Sparkles,
  Home,
  ChevronRight,
  ShieldCheck,
  Zap,
  Smartphone,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

const BASE_URL = 'https://www.bestaitoolsfree.com';

export async function generateMetadata({ searchParams }) {
  const sParams = await searchParams;
  const lang = sParams?.lang || 'en';
  const hubData = getLocalizedHubData(lang);
  const langPrefix = lang === 'en' ? '' : `/${lang}`;
  const canonicalUrl = `${BASE_URL}${langPrefix}/calculators`;

  const languages = {
    'x-default': `${BASE_URL}/calculators`,
    'en': `${BASE_URL}/calculators`,
    'es': `${BASE_URL}/es/calculators`,
    'fr': `${BASE_URL}/fr/calculators`,
    'de': `${BASE_URL}/de/calculators`,
    'pt': `${BASE_URL}/pt/calculators`,
    'ar': `${BASE_URL}/ar/calculators`,
    'ru': `${BASE_URL}/ru/calculators`,
    'ja': `${BASE_URL}/ja/calculators`,
    'zh': `${BASE_URL}/zh/calculators`,
    'it': `${BASE_URL}/it/calculators`,
    'nl': `${BASE_URL}/nl/calculators`
  };

  return {
    title: hubData.title,
    description: hubData.description,
    alternates: {
      canonical: canonicalUrl,
      languages
    },
    openGraph: {
      title: hubData.title,
      description: hubData.description,
      url: canonicalUrl,
      type: 'website',
      siteName: 'Best AI Tools Free',
      locale: lang === 'en' ? 'en_US' : `${lang}_${lang.toUpperCase()}`
    },
    twitter: {
      card: 'summary_large_image',
      title: hubData.title,
      description: hubData.description
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    }
  };
}

export default async function CalculatorHubPage({ searchParams }) {
  const sParams = await searchParams;
  const lang = sParams?.lang || 'en';
  const isRtl = lang === 'ar';
  const langPrefix = lang === 'en' ? '' : `/${lang}`;

  const hubData = getLocalizedHubData(lang);
  const schemas = generateCalculatorHubSchemas(hubData, lang);

  // Map localized categories and calculators
  const localizedCategories = CALCULATOR_CATEGORIES.map(cat => {
    const loc = hubData.categories?.find(c => c.id === cat.id);
    return {
      ...cat,
      name: loc?.name || cat.name,
      badge: loc?.badge || cat.badge,
      description: loc?.description || cat.description
    };
  });

  const localizedCalculators = CALCULATORS_LIST.map(calc => {
    const loc = getLocalizedCalculatorData(calc.slug, lang);
    return {
      ...calc,
      name: loc?.name || calc.name,
      badge: loc?.badge || calc.badge,
      heroSubtitle: loc?.heroSubtitle || calc.heroSubtitle,
      h1: loc?.h1 || calc.h1
    };
  });

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl" dir={isRtl ? 'rtl' : 'ltr'}>
        {/* Localized Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 font-medium">
            <li>
              <Link href={langPrefix || '/'} className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                <Home className="w-3.5 h-3.5" />
                <span>{hubData.breadcrumbs?.home || 'Home'}</span>
              </Link>
            </li>
            <li className="text-slate-300" aria-hidden="true">
              <ChevronRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
            </li>
            <li>
              <span className="text-slate-900 font-semibold" aria-current="page">
                {hubData.breadcrumbs?.calculators || 'Calculators'}
              </span>
            </li>
          </ol>
        </nav>

        {/* Hero Banner */}
        <div className="text-center mb-10 md:mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-50 border border-blue-200/80 text-blue-700 rounded-full text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>{hubData.badge || '24 Free Calculators'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
            {hubData.h1}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {hubData.subtitle}
          </p>

          {/* Value Props Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>{hubData.valueProps?.[0]?.text || 'Instant Browser Math'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>{hubData.valueProps?.[1]?.text || '100% Privacy-First'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-blue-500" />
              <span>{hubData.valueProps?.[2]?.text || 'Mobile-Optimized'}</span>
            </div>
          </div>
        </div>

        {/* Interactive Hub Grid (Client Component) */}
        <div dir="ltr">
          <CalculatorHubClient
            categories={localizedCategories}
            calculators={localizedCalculators}
          />
        </div>

        {/* Supporting Educational SEO Section */}
        <div className="mt-16 pt-12 border-t border-slate-200 space-y-12">
          {/* Categories Overview */}
          <section aria-labelledby="categories-heading" className="space-y-6">
            <h2 id="categories-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {hubData.categoriesHeading || 'Comprehensive Calculator Categories'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {localizedCategories.map((cat) => (
                <div key={cat.id} className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                    {cat.badge}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {cat.name} ({cat.count})
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Why Use BestAIToolsFree Calculators */}
          <section aria-labelledby="why-heading" className="space-y-6">
            <h2 id="why-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {hubData.whyHeading || 'Why Choose BestAIToolsFree Online Calculators?'}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex items-start gap-3.5 p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {hubData.whyItems?.[0]?.title || 'Zero Latency & Client-Side Execution'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {hubData.whyItems?.[0]?.description}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {hubData.whyItems?.[1]?.title || 'Strict Confidentiality & Privacy'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {hubData.whyItems?.[1]?.description}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {hubData.whyItems?.[2]?.title || 'Transparent Mathematical Formulas'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {hubData.whyItems?.[2]?.description}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {hubData.whyItems?.[3]?.title || 'Mobile-First Responsive Design'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {hubData.whyItems?.[3]?.description}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Hub FAQs */}
          {hubData.faqs && hubData.faqs.length > 0 && (
            <section aria-labelledby="hub-faq-heading" className="space-y-6">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>Questions & Answers</span>
              </div>
              <h2 id="hub-faq-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {hubData.faqsHeading || 'Frequently Asked Questions'}
              </h2>

              <div className="space-y-4">
                {hubData.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs"
                  >
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
