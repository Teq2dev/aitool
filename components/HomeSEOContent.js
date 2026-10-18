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
  Headphones, 
  ArrowRight, 
  CheckCircle2, 
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe2,
  Check
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import HomeFAQ from '@/components/home/HomeFAQ';

export default function HomeSEOContent() {
  const { getLangUrl, t } = useLanguage();

  return (
    <section aria-label="AI Tools and In-Browser Utilities Comprehensive Guide and FAQ" className="relative bg-gradient-to-b from-[#F8FAFC] via-[#EEF2FF]/15 to-[#F8FAFC] border-t border-slate-200/80 py-16 sm:py-20 lg:py-24 text-slate-800 overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#4338CA]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-2/3 -right-48 w-96 h-96 bg-[#06B6D4]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-20 lg:space-y-28 relative z-10">

        {/* ========================================================= */}
        {/* 0. IN-BROWSER ONLINE UTILITIES & CLIENT-SIDE PRIVACY      */}
        {/* ========================================================= */}
        <div className="relative rounded-3xl p-8 sm:p-10 lg:p-12 bg-gradient-to-br from-slate-900 via-[#0F172A] to-slate-950 text-white shadow-2xl border border-slate-800 overflow-hidden">
          {/* Ambient Glows inside the Privacy card */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="relative z-10 space-y-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
                <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span>{t('clientSidePrivacyBadge')}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                {t('whyInBrowserTitle')}
              </h2>
              <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed">
                {t('inBrowserIntro')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Micro-Card 1: Image Tools */}
              <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xs flex flex-col justify-between hover:bg-white/[0.07] hover:border-cyan-500/40 transition-all duration-300 group">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition-transform" aria-hidden="true">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-base mb-2 group-hover:text-cyan-300 transition-colors">
                    {t('highPerfImageTools')}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                    {t('highPerfImageToolsDesc')}
                  </p>
                </div>
                <Link 
                  href={getLangUrl('/image-tools')} 
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 group-hover:translate-x-1 transition-all"
                >
                  <span>{t('exploreImageToolsHub')}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>

              {/* Micro-Card 2: PDF Tools */}
              <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xs flex flex-col justify-between hover:bg-white/[0.07] hover:border-rose-500/40 transition-all duration-300 group">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition-transform" aria-hidden="true">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-base mb-2 group-hover:text-rose-300 transition-colors">
                    {t('zeroServerPdfProcessing')}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                    {t('zeroServerPdfProcessingDesc')}
                  </p>
                </div>
                <Link 
                  href={getLangUrl('/pdf-tools')} 
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 hover:text-rose-300 group-hover:translate-x-1 transition-all"
                >
                  <span>{t('explorePdfToolsHub')}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>

              {/* Micro-Card 3: Calculators */}
              <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xs flex flex-col justify-between hover:bg-white/[0.07] hover:border-emerald-500/40 transition-all duration-300 group">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition-transform" aria-hidden="true">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-base mb-2 group-hover:text-emerald-300 transition-colors">
                    {t('twentyFourInstantCalculators')}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                    {t('twentyFourInstantCalculatorsDesc')}
                  </p>
                </div>
                <Link 
                  href={getLangUrl('/calculators')} 
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 group-hover:translate-x-1 transition-all"
                >
                  <span>{t('exploreAll24Calculators')}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 1. WHAT AI TOOLS ARE & DIRECTORY PHILOSOPHY (EDITORIAL)   */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF2FF] border border-indigo-200 text-[#4338CA] text-xs font-bold uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t('aiEcosystemBadge')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight leading-tight">
              {t('understandingAiTitle')}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {t('understandingAiP1')}
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              {t('understandingAiP2')}
            </p>
          </div>

          <div className="lg:col-span-5 space-y-3.5">
            <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs hover:shadow-md hover:border-[#4338CA]/40 transition-all flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold flex-shrink-0 shadow-2xs" aria-hidden="true">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#0F172A] text-sm">{t('pillarVerifiedTitle')}</h3>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">{t('pillarVerifiedDesc')}</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs hover:shadow-md hover:border-emerald-500/40 transition-all flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold flex-shrink-0 shadow-2xs" aria-hidden="true">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#0F172A] text-sm">{t('pillarNoAdsTitle')}</h3>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">{t('pillarNoAdsDesc')}</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs hover:shadow-md hover:border-purple-500/40 transition-all flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold flex-shrink-0 shadow-2xs" aria-hidden="true">
                <Globe2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#0F172A] text-sm">{t('pillarMultiLangTitle')}</h3>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">{t('pillarMultiLangDesc')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. MAJOR AI TOOL CATEGORIES (CURATED TILES)               */}
        {/* ========================================================= */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECFEFF] border border-cyan-200 text-[#0E7490] text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Curated Taxonomies</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight leading-tight">
                {t('exploreByCategoryTitle')}
              </h2>
              <p className="mt-2 text-base text-slate-600 leading-relaxed">
                {t('exploreByCategorySubtitle')}
              </p>
            </div>

            <Link 
              href={getLangUrl('/categories')} 
              className="btn-tactile-secondary whitespace-nowrap self-start md:self-auto text-xs sm:text-sm"
            >
              <span>{t('viewAllCategories')}</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 1. Writing */}
            <Link 
              href={getLangUrl('/categories/ai-writers')}
              className="group p-5 rounded-2xl bg-white border border-[#E2E8F0] hover:border-blue-500/70 hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold group-hover:scale-105 transition-transform shadow-2xs" aria-hidden="true">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    LLMs & Copy
                  </span>
                </div>
                <h3 className="font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors text-base mb-1.5 line-clamp-1">
                  {t('catAiWritingTitle')}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">
                  {t('catAiWritingDesc')}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                <span>Explore Writers</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
            </Link>

            {/* 2. Image */}
            <Link 
              href={getLangUrl('/categories/text-to-image')}
              className="group p-5 rounded-2xl bg-white border border-[#E2E8F0] hover:border-purple-500/70 hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold group-hover:scale-105 transition-transform shadow-2xs" aria-hidden="true">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                    Diffusion & Art
                  </span>
                </div>
                <h3 className="font-bold text-[#0F172A] group-hover:text-purple-600 transition-colors text-base mb-1.5 line-clamp-1">
                  {t('catImageGenTitle')}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">
                  {t('catImageGenDesc')}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-600 group-hover:translate-x-1 transition-transform">
                <span>Explore Images</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
            </Link>

            {/* 3. Video */}
            <Link 
              href={getLangUrl('/categories/video-editing')}
              className="group p-5 rounded-2xl bg-white border border-[#E2E8F0] hover:border-rose-500/70 hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold group-hover:scale-105 transition-transform shadow-2xs" aria-hidden="true">
                    <Video className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                    Video Gen
                  </span>
                </div>
                <h3 className="font-bold text-[#0F172A] group-hover:text-rose-600 transition-colors text-base mb-1.5 line-clamp-1">
                  {t('catVideoEditingTitle')}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">
                  {t('catVideoEditingDesc')}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-rose-600 group-hover:translate-x-1 transition-transform">
                <span>Explore Video</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
            </Link>

            {/* 4. Code */}
            <Link 
              href={getLangUrl('/categories/dev-tools')}
              className="group p-5 rounded-2xl bg-white border border-[#E2E8F0] hover:border-emerald-500/70 hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold group-hover:scale-105 transition-transform shadow-2xs" aria-hidden="true">
                    <Code className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Copilots
                  </span>
                </div>
                <h3 className="font-bold text-[#0F172A] group-hover:text-emerald-600 transition-colors text-base mb-1.5 line-clamp-1">
                  {t('catCodeAssistantsTitle')}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">
                  {t('catCodeAssistantsDesc')}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">
                <span>Explore Code</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
            </Link>

            {/* 5. Audio */}
            <Link 
              href={getLangUrl('/categories/audioediting')}
              className="group p-5 rounded-2xl bg-white border border-[#E2E8F0] hover:border-cyan-500/70 hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold group-hover:scale-105 transition-transform shadow-2xs" aria-hidden="true">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200">
                    Speech AI
                  </span>
                </div>
                <h3 className="font-bold text-[#0F172A] group-hover:text-cyan-600 transition-colors text-base mb-1.5 line-clamp-1">
                  {t('catAudioVoiceTitle')}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">
                  {t('catAudioVoiceDesc')}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-cyan-600 group-hover:translate-x-1 transition-transform">
                <span>Explore Voice</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
            </Link>

            {/* 6. SEO */}
            <Link 
              href={getLangUrl('/categories/seo')}
              className="group p-5 rounded-2xl bg-white border border-[#E2E8F0] hover:border-amber-500/70 hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold group-hover:scale-105 transition-transform shadow-2xs" aria-hidden="true">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                    SERP Growth
                  </span>
                </div>
                <h3 className="font-bold text-[#0F172A] group-hover:text-amber-600 transition-colors text-base mb-1.5 line-clamp-1">
                  {t('catSeoMarketingTitle')}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">
                  {t('catSeoMarketingDesc')}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600 group-hover:translate-x-1 transition-transform">
                <span>Explore SEO</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
            </Link>

            {/* 7. Productivity */}
            <Link 
              href={getLangUrl('/categories/productivity')}
              className="group p-5 rounded-2xl bg-white border border-[#E2E8F0] hover:border-indigo-500/70 hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold group-hover:scale-105 transition-transform shadow-2xs" aria-hidden="true">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Workflows
                  </span>
                </div>
                <h3 className="font-bold text-[#0F172A] group-hover:text-indigo-600 transition-colors text-base mb-1.5 line-clamp-1">
                  {t('catProductivityTitle')}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">
                  {t('catProductivityDesc')}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
                <span>Explore Workflows</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
            </Link>

            {/* 8. Research */}
            <Link 
              href={getLangUrl('/categories/aisearchengines')}
              className="group p-5 rounded-2xl bg-white border border-[#E2E8F0] hover:border-sky-500/70 hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold group-hover:scale-105 transition-transform shadow-2xs" aria-hidden="true">
                    <Search className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                    Deep Search
                  </span>
                </div>
                <h3 className="font-bold text-[#0F172A] group-hover:text-sky-600 transition-colors text-base mb-1.5 line-clamp-1">
                  {t('catResearchDataTitle')}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">
                  {t('catResearchDataDesc')}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600 group-hover:translate-x-1 transition-transform">
                <span>Explore Research</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
            </Link>

          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. FREE VS FREEMIUM VS PAID AI TOOLS (COMPARISON MATRIX)   */}
        {/* ========================================================= */}
        <div className="relative rounded-3xl p-8 sm:p-10 lg:p-12 bg-gradient-to-br from-[#4338CA] via-[#4F46E5] to-[#3730A3] text-white shadow-xl overflow-hidden">
          {/* Ambient circles */}
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-white/10 rounded-full blur-[70px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-cyan-400/15 rounded-full blur-[70px] pointer-events-none" />
          
          <div className="relative z-10 space-y-8">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-200 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                Transparent Pricing Models
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-3">
                {t('pricingModelsTitle')}
              </h2>
              <p className="text-indigo-100 text-base sm:text-lg leading-relaxed mt-2">
                {t('pricingModelsSubtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-slate-900">
              
              {/* Tier 1: 100% Free */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white/95 backdrop-blur-md shadow-md border-t-4 border-emerald-500 space-y-3 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                    100% Free
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-lg mt-2">
                    {t('pricingModelFreeTitle')}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                    {t('pricingModelFreeDesc')}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>No credit card required</span>
                </div>
              </div>

              {/* Tier 2: Freemium */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white shadow-xl border-t-4 border-[#4338CA] space-y-3 flex flex-col justify-between ring-2 ring-white/60 relative">
                <div className="absolute -top-3 right-5 bg-gradient-to-r from-[#4338CA] to-cyan-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-2xs">
                  Most Popular
                </div>
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-full bg-indigo-100 text-[#4338CA] font-bold text-xs uppercase tracking-wider">
                    Freemium
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-lg mt-2">
                    {t('pricingModelFreemiumTitle')}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                    {t('pricingModelFreemiumDesc')}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-[#4338CA]">
                  <Check className="w-4 h-4 text-[#4338CA]" />
                  <span>Monthly free usage allowance</span>
                </div>
              </div>

              {/* Tier 3: Free Trial */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white/95 backdrop-blur-md shadow-md border-t-4 border-amber-500 space-y-3 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-xs uppercase tracking-wider">
                    Free Trial
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-lg mt-2">
                    {t('pricingModelTrialTitle')}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                    {t('pricingModelTrialDesc')}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-amber-700">
                  <Check className="w-4 h-4 text-amber-600" />
                  <span>Full access evaluation period</span>
                </div>
              </div>

            </div>

            <div className="pt-2">
              <Link 
                href={getLangUrl('/tools?pricing=Free')}
                className="btn-tactile-secondary text-sm font-bold shadow-lg"
              >
                <span>{t('browseFreeAiDirectory')}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4. AI TOOLS BY USER ROLE (PERSONA HUB)                    */}
        {/* ========================================================= */}
        <div className="space-y-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-[#4338CA] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Audience Breakdown</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight leading-tight">
              {t('whoUsesTitle')}
            </h2>
            <p className="mt-2 text-base text-slate-600 leading-relaxed">
              {t('whoUsesSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* Creators */}
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs hover:shadow-md hover:border-purple-500/50 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold shadow-2xs" aria-hidden="true">
                    <Palette className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">Creative Ops</span>
                    <h3 className="text-base font-extrabold text-[#0F172A] mt-1">{t('personaCreatorsTitle')}</h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  {t('personaCreatorsDesc')}
                </p>
              </div>
            </div>

            {/* Developers */}
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs hover:shadow-md hover:border-emerald-500/50 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shadow-2xs" aria-hidden="true">
                    <Code className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Engineering</span>
                    <h3 className="text-base font-extrabold text-[#0F172A] mt-1">{t('personaDevsTitle')}</h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  {t('personaDevsDesc')}
                </p>
              </div>
            </div>

            {/* Marketers */}
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs hover:shadow-md hover:border-amber-500/50 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold shadow-2xs" aria-hidden="true">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">Growth & SEO</span>
                    <h3 className="text-base font-extrabold text-[#0F172A] mt-1">{t('personaMarketersTitle')}</h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  {t('personaMarketersDesc')}
                </p>
              </div>
            </div>

            {/* Designers */}
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs hover:shadow-md hover:border-rose-500/50 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold shadow-2xs" aria-hidden="true">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">UI / Visual</span>
                    <h3 className="text-base font-extrabold text-[#0F172A] mt-1">{t('personaDesignersTitle')}</h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  {t('personaDesignersDesc')}
                </p>
              </div>
            </div>

            {/* Students */}
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs hover:shadow-md hover:border-cyan-500/50 transition-all flex flex-col justify-between md:col-span-2 lg:col-span-2">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold shadow-2xs" aria-hidden="true">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-200">Academia & Research</span>
                    <h3 className="text-base font-extrabold text-[#0F172A] mt-1">{t('personaStudentsTitle')}</h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  {t('personaStudentsDesc')}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* 5. HOW TO COMPARE & EVALUATE AI TOOLS (6-STEP CRITERIA)   */}
        {/* ========================================================= */}
        <div className="space-y-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Evaluation Framework</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight leading-tight">
              {t('howToCompareTitle')}
            </h2>
            <p className="mt-2 text-base text-slate-600 leading-relaxed">
              {t('howToCompareSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* Step 01 */}
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs hover:shadow-md hover:border-[#4338CA]/40 transition-all relative overflow-hidden group">
              <span className="absolute -bottom-2 -right-1 text-5xl font-black text-slate-100 group-hover:text-indigo-50/80 transition-colors pointer-events-none select-none">
                01
              </span>
              <div className="relative z-10">
                <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#4338CA] font-black text-xs flex items-center justify-center mb-3">
                  01
                </div>
                <h3 className="font-bold text-[#0F172A] text-base mb-1.5">{t('evalPillar1Title')}</h3>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  {t('evalPillar1Desc')}
                </p>
              </div>
            </div>

            {/* Step 02 */}
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs hover:shadow-md hover:border-[#4338CA]/40 transition-all relative overflow-hidden group">
              <span className="absolute -bottom-2 -right-1 text-5xl font-black text-slate-100 group-hover:text-indigo-50/80 transition-colors pointer-events-none select-none">
                02
              </span>
              <div className="relative z-10">
                <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#4338CA] font-black text-xs flex items-center justify-center mb-3">
                  02
                </div>
                <h3 className="font-bold text-[#0F172A] text-base mb-1.5">{t('evalPillar2Title')}</h3>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  {t('evalPillar2Desc')}
                </p>
              </div>
            </div>

            {/* Step 03 */}
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs hover:shadow-md hover:border-[#4338CA]/40 transition-all relative overflow-hidden group">
              <span className="absolute -bottom-2 -right-1 text-5xl font-black text-slate-100 group-hover:text-indigo-50/80 transition-colors pointer-events-none select-none">
                03
              </span>
              <div className="relative z-10">
                <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#4338CA] font-black text-xs flex items-center justify-center mb-3">
                  03
                </div>
                <h3 className="font-bold text-[#0F172A] text-base mb-1.5">{t('evalPillar3Title')}</h3>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  {t('evalPillar3Desc')}
                </p>
              </div>
            </div>

            {/* Step 04 */}
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs hover:shadow-md hover:border-[#4338CA]/40 transition-all relative overflow-hidden group">
              <span className="absolute -bottom-2 -right-1 text-5xl font-black text-slate-100 group-hover:text-indigo-50/80 transition-colors pointer-events-none select-none">
                04
              </span>
              <div className="relative z-10">
                <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#4338CA] font-black text-xs flex items-center justify-center mb-3">
                  04
                </div>
                <h3 className="font-bold text-[#0F172A] text-base mb-1.5">{t('evalPillar4Title')}</h3>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  {t('evalPillar4Desc')}
                </p>
              </div>
            </div>

            {/* Step 05 */}
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs hover:shadow-md hover:border-[#4338CA]/40 transition-all relative overflow-hidden group">
              <span className="absolute -bottom-2 -right-1 text-5xl font-black text-slate-100 group-hover:text-indigo-50/80 transition-colors pointer-events-none select-none">
                05
              </span>
              <div className="relative z-10">
                <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#4338CA] font-black text-xs flex items-center justify-center mb-3">
                  05
                </div>
                <h3 className="font-bold text-[#0F172A] text-base mb-1.5">{t('evalPillar5Title')}</h3>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  {t('evalPillar5Desc')}
                </p>
              </div>
            </div>

            {/* Step 06 */}
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs hover:shadow-md hover:border-[#4338CA]/40 transition-all relative overflow-hidden group">
              <span className="absolute -bottom-2 -right-1 text-5xl font-black text-slate-100 group-hover:text-indigo-50/80 transition-colors pointer-events-none select-none">
                06
              </span>
              <div className="relative z-10">
                <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#4338CA] font-black text-xs flex items-center justify-center mb-3">
                  06
                </div>
                <h3 className="font-bold text-[#0F172A] text-base mb-1.5">{t('evalPillar6Title')}</h3>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  {t('evalPillar6Desc')}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* 6. WHY BEST AI TOOLS FREE? (EDITORIAL MANIFESTO)          */}
        {/* ========================================================= */}
        <div className="rounded-3xl bg-white border border-[#E2E8F0] p-8 sm:p-10 lg:p-12 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#4338CA] to-[#06B6D4]" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
                Editorial Ethos
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight leading-tight">
                {t('whyUseDirectoryTitle')}
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              <p>
                {t('whyUseDirectoryP1')}
              </p>
              <p>
                {t('whyUseDirectoryP2')}
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 7. FREQUENTLY ASKED QUESTIONS (ACCESSIBLE INTERACTIVE)    */}
        {/* ========================================================= */}
        <HomeFAQ />

      </div>
    </section>
  );
}
