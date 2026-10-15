'use client';

import Link from 'next/link';
import { 
  FileText, 
  Image as ImageIcon, 
  Calculator, 
  Compass, 
  Cpu, 
  Video, 
  Code, 
  BarChart3, 
  Palette, 
  Search, 
  Building2, 
  Headphones, 
  Presentation, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle,
  GraduationCap,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe2
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function HomeSEOContent() {
  const { getLangUrl, t } = useLanguage();

  const faqs = [
    { q: t('faqQ1'), a: t('faqA1') },
    { q: t('faqQ2'), a: t('faqA2') },
    { q: t('faqQ3'), a: t('faqA3') },
    { q: t('faqQ4'), a: t('faqA4') },
    { q: t('faqQ5'), a: t('faqA5') },
    { q: t('faqQ6'), a: t('faqA6') },
    { q: t('faqQ7'), a: t('faqA7') },
    { q: t('faqQ8'), a: t('faqA8') },
    { q: t('faqQ9'), a: t('faqA9') },
    { q: t('faqQ10'), a: t('faqA10') }
  ];

  return (
    <section aria-label="AI Tools and In-Browser Utilities Comprehensive Guide and FAQ" className="bg-slate-50/70 border-t border-slate-200/80 py-16 sm:py-20 lg:py-24 text-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-20 lg:space-y-28">

        {/* 0. In-Browser Online Utilities & Client-Side Privacy */}
        <div className="p-8 sm:p-10 lg:p-12 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t('clientSidePrivacyBadge')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {t('whyInBrowserTitle')}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
              {t('inBrowserIntro')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-4" aria-hidden="true">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">{t('highPerfImageTools')}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {t('highPerfImageToolsDesc')}
                </p>
              </div>
              <Link href={getLangUrl('/image-tools')} className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1">
                {t('exploreImageToolsHub')}
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold mb-4" aria-hidden="true">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">{t('zeroServerPdfProcessing')}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {t('zeroServerPdfProcessingDesc')}
                </p>
              </div>
              <Link href={getLangUrl('/pdf-tools')} className="text-xs font-bold text-red-600 hover:text-red-800 inline-flex items-center gap-1">
                {t('explorePdfToolsHub')}
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4" aria-hidden="true">
                  <Calculator className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">{t('twentyFourInstantCalculators')}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {t('twentyFourInstantCalculatorsDesc')}
                </p>
              </div>
              <Link href={getLangUrl('/calculators')} className="text-xs font-bold text-emerald-600 hover:text-emerald-800 inline-flex items-center gap-1">
                {t('exploreAll24Calculators')}
              </Link>
            </div>
          </div>
        </div>

        {/* 1. What AI Tools Are & How an AI Directory Helps (Balanced 2-Column Desktop Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t('aiEcosystemBadge')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {t('understandingAiTitle')}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {t('understandingAiP1')}
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              {t('understandingAiP2')}
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 pt-2 lg:pt-0">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold flex-shrink-0" aria-hidden="true">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{t('pillarVerifiedTitle')}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{t('pillarVerifiedDesc')}</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold flex-shrink-0" aria-hidden="true">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{t('pillarNoAdsTitle')}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{t('pillarNoAdsDesc')}</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold flex-shrink-0" aria-hidden="true">
                <Globe2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{t('pillarMultiLangTitle')}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{t('pillarMultiLangDesc')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Major AI Tool Categories */}
        <div className="space-y-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {t('exploreByCategoryTitle')}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
              {t('exploreByCategorySubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <Link 
              href={getLangUrl('/categories/ai-writers')}
              className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors" aria-hidden="true">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{t('catAiWritingTitle')}</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t('catAiWritingDesc')}
                </p>
              </div>
            </Link>

            <Link 
              href={getLangUrl('/categories/text-to-image')}
              className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold group-hover:bg-purple-600 group-hover:text-white transition-colors" aria-hidden="true">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-purple-600 transition-colors">{t('catImageGenTitle')}</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t('catImageGenDesc')}
                </p>
              </div>
            </Link>

            <Link 
              href={getLangUrl('/categories/video-editing')}
              className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold group-hover:bg-rose-600 group-hover:text-white transition-colors" aria-hidden="true">
                    <Video className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-rose-600 transition-colors">{t('catVideoEditingTitle')}</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t('catVideoEditingDesc')}
                </p>
              </div>
            </Link>

            <Link 
              href={getLangUrl('/categories/dev-tools')}
              className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold group-hover:bg-emerald-600 group-hover:text-white transition-colors" aria-hidden="true">
                    <Code className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{t('catCodeAssistantsTitle')}</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t('catCodeAssistantsDesc')}
                </p>
              </div>
            </Link>

            <Link 
              href={getLangUrl('/categories/audioediting')}
              className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold group-hover:bg-cyan-600 group-hover:text-white transition-colors" aria-hidden="true">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">{t('catAudioVoiceTitle')}</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t('catAudioVoiceDesc')}
                </p>
              </div>
            </Link>

            <Link 
              href={getLangUrl('/categories/seo')}
              className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold group-hover:bg-amber-600 group-hover:text-white transition-colors" aria-hidden="true">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{t('catSeoMarketingTitle')}</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t('catSeoMarketingDesc')}
                </p>
              </div>
            </Link>

            <Link 
              href={getLangUrl('/categories/productivity')}
              className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold group-hover:bg-indigo-600 group-hover:text-white transition-colors" aria-hidden="true">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{t('catProductivityTitle')}</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t('catProductivityDesc')}
                </p>
              </div>
            </Link>

            <Link 
              href={getLangUrl('/categories/aisearchengines')}
              className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold group-hover:bg-sky-600 group-hover:text-white transition-colors" aria-hidden="true">
                    <Search className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-sky-600 transition-colors">{t('catResearchDataTitle')}</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t('catResearchDataDesc')}
                </p>
              </div>
            </Link>
          </div>

          <div className="pt-2">
            <Link 
              href={getLangUrl('/categories')} 
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline"
            >
              <span>{t('viewAllCategories')}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* 3. Free vs Freemium vs Paid AI Tools (Full Width 3-Column Card Layout) */}
        <div className="p-8 sm:p-10 lg:p-14 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-700 text-white shadow-xl">
          <div className="w-full space-y-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                {t('pricingModelsTitle')}
              </h2>
              <p className="text-blue-100 text-base sm:text-lg leading-relaxed mt-2">
                {t('pricingModelsSubtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-slate-900">
              <div className="p-6 rounded-2xl bg-white/95 backdrop-blur-sm space-y-2.5 shadow-sm">
                <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">100% Free</span>
                <h3 className="font-bold text-slate-900 text-base">{t('pricingModelFreeTitle')}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t('pricingModelFreeDesc')}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/95 backdrop-blur-sm space-y-2.5 shadow-sm">
                <span className="inline-block px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-xs">Freemium</span>
                <h3 className="font-bold text-slate-900 text-base">{t('pricingModelFreemiumTitle')}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t('pricingModelFreemiumDesc')}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/95 backdrop-blur-sm space-y-2.5 shadow-sm">
                <span className="inline-block px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-xs">Free Trial</span>
                <h3 className="font-bold text-slate-900 text-base">{t('pricingModelTrialTitle')}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t('pricingModelTrialDesc')}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link 
                href={getLangUrl('/tools?pricing=Free')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-blue-700 font-bold text-sm shadow-md hover:bg-blue-50 transition-all cursor-pointer"
              >
                <span>{t('browseFreeAiDirectory')}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4. AI Tools by User Role */}
        <div className="space-y-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {t('whoUsesTitle')}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
              {t('whoUsesSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold" aria-hidden="true">
                    <Palette className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{t('personaCreatorsTitle')}</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t('personaCreatorsDesc')}
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold" aria-hidden="true">
                    <Code className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{t('personaDevsTitle')}</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t('personaDevsDesc')}
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold" aria-hidden="true">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{t('personaMarketersTitle')}</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t('personaMarketersDesc')}
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold" aria-hidden="true">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{t('personaDesignersTitle')}</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t('personaDesignersDesc')}
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold" aria-hidden="true">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{t('personaStudentsTitle')}</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t('personaStudentsDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 5. How to Compare & Evaluate AI Tools */}
        <div className="p-8 sm:p-10 lg:p-12 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {t('howToCompareTitle')}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
              {t('howToCompareSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex gap-4 items-start p-2">
              <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-slate-900 mb-1">{t('evalPillar1Title')}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t('evalPillar1Desc')}
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-2">
              <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-slate-900 mb-1">{t('evalPillar2Title')}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t('evalPillar2Desc')}
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-2">
              <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-slate-900 mb-1">{t('evalPillar3Title')}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t('evalPillar3Desc')}
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-2">
              <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-slate-900 mb-1">{t('evalPillar4Title')}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t('evalPillar4Desc')}
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-2">
              <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-slate-900 mb-1">{t('evalPillar5Title')}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t('evalPillar5Desc')}
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-2">
              <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-slate-900 mb-1">{t('evalPillar6Title')}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t('evalPillar6Desc')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Why Best AI Tools Free (Balanced 2-Column Grid on Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start p-8 sm:p-10 lg:p-12 rounded-3xl bg-slate-100/80 border border-slate-200">
          <div className="lg:col-span-5">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {t('whyUseDirectoryTitle')}
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-4 text-base text-slate-600 leading-relaxed">
            <p>
              {t('whyUseDirectoryP1')}
            </p>
            <p>
              {t('whyUseDirectoryP2')}
            </p>
          </div>
        </div>

        {/* 7. Frequently Asked Questions (2-Column FAQ Grid) */}
        <div className="space-y-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
              <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t('faqSectionBadge')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {t('faqSectionTitle')}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
              {t('faqSectionSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2.5"
              >
                <h3 className="font-bold text-slate-900 text-base leading-snug flex items-start gap-2.5">
                  <span className="text-blue-600 font-extrabold text-sm" aria-hidden="true">Q{idx + 1}.</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
