'use client';

import { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Zap, 
  Image as ImageIcon, 
  FileText, 
  Layers, 
  CreditCard, 
  Calendar, 
  Percent, 
  ShieldCheck, 
  Calculator, 
  FileSpreadsheet,
  Scissors,
  Maximize2,
  FileEdit,
  DollarSign,
  Coins,
  BookOpen,
  ArrowUpRight,
  HelpCircle,
  CheckCircle2,
  PlusCircle,
  Users,
  Clock,
  Globe,
  Lock
} from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import SearchBar from '@/components/SearchBar';
import HomeToolCard from '@/components/home/HomeToolCard';
import HomeCategoryCard from '@/components/home/HomeCategoryCard';
import HomeSEOContent from '@/components/HomeSEOContent';
import styles from '@/components/home/homepage.module.css';

export default function HomeClient({
  initialFeatured = [],
  initialTrending = [],
  initialCategories = [],
  initialLatest = []
}) {
  const featured = (initialFeatured.length >= 6)
    ? initialFeatured.slice(0, 6)
    : (initialFeatured.length >= 3 ? initialFeatured.slice(0, 3) : initialFeatured);
  const trending = initialTrending;
  const categories = initialCategories;
  const latest = initialLatest;
  const { t, getLangUrl } = useLanguage();

  const [activeIntentFilter, setActiveIntentFilter] = useState('all');

  const intentFilters = [
    { id: 'all', label: 'All Superpowers', icon: '✨' },
    { id: 'writing', label: 'Writing & Copy', icon: '✍️' },
    { id: 'creative', label: 'Visual & Video', icon: '🎨' },
    { id: 'dev', label: 'Code & Dev', icon: '💻' },
    { id: 'workflow', label: 'Productivity & Ops', icon: '⚡' },
    { id: 'marketing', label: 'Marketing & SEO', icon: '📈' }
  ];

  const filteredCategories = categories.filter((cat) => {
    if (activeIntentFilter === 'all') return true;
    const slug = cat.slug || '';
    if (activeIntentFilter === 'writing') {
      return ['ai-writers', 'blog-content', 'copy-writing', 'paraphrase', 'content-creators'].includes(slug);
    }
    if (activeIntentFilter === 'creative') {
      return ['text-to-image', 'image-editing', 'video-editing', 'text-to-video', 'logo-generator', 'designing', 'ui-ux-designers'].includes(slug);
    }
    if (activeIntentFilter === 'dev') {
      return ['dev-tools', 'developers', 'code-assistants'].includes(slug);
    }
    if (activeIntentFilter === 'workflow') {
      return ['productivity', 'business', 'customer-support', 'education', 'students', 'healthcare'].includes(slug);
    }
    if (activeIntentFilter === 'marketing') {
      return ['digital-marketing', 'seo', 'social-media'].includes(slug);
    }
    return true;
  });

  return (
    <div className={styles.homepageRoot}>
      {/* ========================================================= */}
      {/* SECTION 1: HERO & SEARCH                                   */}
      {/* ========================================================= */}
      <section className={styles.heroContainer}>
        <div className={styles.heroGlowLeft} />
        <div className={styles.heroGlowRight} />

        <div className="container mx-auto px-4 py-20 sm:py-24 lg:py-28 relative z-10 text-center max-w-5xl">
          {/* Hero Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF2FF] border border-[rgba(67,56,202,0.15)] text-[#4338CA] text-xs font-bold uppercase tracking-wider mb-8 shadow-2xs">
            <Sparkles className="w-4 h-4 text-[#4338CA]" aria-hidden="true" />
            <span>{t('heroBadge')}</span>
          </div>

          {/* H1 Heading - Exact semantic match */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#0F172A] mb-6 sm:mb-8 leading-[1.12] tracking-tight">
            {t('heroTitlePrefix')}{' '}
            <span className="bg-gradient-to-r from-[#4338CA] via-[#3730A3] to-[#06B6D4] bg-clip-text text-transparent block sm:inline">
              {t('heroTitleSuffix')}
            </span>
          </h1>

          {/* Subtitle - Exact semantic match */}
          <p className="text-lg sm:text-xl md:text-2xl text-[#64748B] mb-10 max-w-3xl mx-auto leading-relaxed font-normal">
            {t('heroSubtitle')}
          </p>

          {/* Search Component with Indigo Design Tokens */}
          <div className="max-w-3xl mx-auto mb-8">
            <SearchBar className="p-1" />
          </div>

          {/* Quick Hub Exploration Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider mr-1">
              {t('quickExplore') || 'Quick Access:'}
            </span>
            <Link 
              href="#products" 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#EEF2FF] text-[#4338CA] hover:bg-[#E0E7FF] border border-[rgba(67,56,202,0.12)] transition-all"
            >
              <Zap className="w-3.5 h-3.5 text-[#4338CA]" aria-hidden="true" />
              <span>{t('freeOnlineTools') || 'All Free Utilities'}</span>
            </Link>
            <Link 
              href={getLangUrl('/jpg-to-excel')} 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#ECFEFF] text-[#0E7490] hover:bg-[#CFFAFE] border border-[rgba(6,182,212,0.2)] transition-all"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#06B6D4]" aria-hidden="true" />
              <span>AI JPG to Excel</span>
            </Link>
            <Link 
              href={getLangUrl('/pdf-tools')} 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white text-[#0F172A] hover:border-[#4338CA] hover:text-[#4338CA] border border-[#E2E8F0] shadow-2xs transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-rose-500" aria-hidden="true" />
              <span>{t('pdfTools') || 'PDF Tools'}</span>
            </Link>
            <Link 
              href={getLangUrl('/image-tools')} 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white text-[#0F172A] hover:border-[#4338CA] hover:text-[#4338CA] border border-[#E2E8F0] shadow-2xs transition-all"
            >
              <ImageIcon className="w-3.5 h-3.5 text-[#4338CA]" aria-hidden="true" />
              <span>{t('imageTools') || 'Image Tools'}</span>
            </Link>
            <Link 
              href={getLangUrl('/calculators')} 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white text-[#0F172A] hover:border-[#4338CA] hover:text-[#4338CA] border border-[#E2E8F0] shadow-2xs transition-all"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
              <span>{t('twentyFourCalculators') || '24 Calculators'}</span>
            </Link>
            <Link 
              href={getLangUrl('/tools')} 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white text-[#0F172A] hover:border-[#4338CA] hover:text-[#4338CA] border border-[#E2E8F0] shadow-2xs transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
              <span>{t('aiDirectoryCount') || '1,400+ AI Directory'}</span>
            </Link>
          </div>

          {/* Primary Hero Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="#products" className={styles.btnPrimary}>
              <span>{t('exploreFreeToolsBtn') || 'Explore Free Utilities'}</span>
              <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
            </Link>
            <Link href={getLangUrl('/tools')} className={styles.btnSecondary}>
              <span>{t('browseAiDirectoryBtn') || 'Browse AI Directory'}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 3: AI JPG-TO-EXCEL CONVERTER (PRIMARY SHOWCASE)   */}
      {/* ========================================================= */}
      <section className="py-12 bg-white border-b border-[#E2E8F0]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className={styles.excelHeroCard}>
            <div className="p-6 sm:p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECFEFF] border border-[rgba(6,182,212,0.25)] text-[#0E7490] text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-[#06B6D4]" aria-hidden="true" />
                  <span>Powered by Google Gemini 2.5 Flash</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F172A] tracking-tight leading-tight">
                  AI JPG to Excel Converter
                </h2>
                <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                  Transform scanned receipts, invoices, financial tables, and screenshot charts into genuine, fully formatted 
                  <strong className="text-[#0F172A] font-semibold"> .xlsx workbooks</strong>. Multimodal table structure recognition with cell coordinate preservation and formula-injection safeguards.
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F172A] bg-slate-100 px-3 py-1 rounded-lg">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4338CA]" aria-hidden="true" />
                    Zero OCR Drift
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F172A] bg-slate-100 px-3 py-1 rounded-lg">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4338CA]" aria-hidden="true" />
                    Multi-Table Detection
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F172A] bg-slate-100 px-3 py-1 rounded-lg">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4338CA]" aria-hidden="true" />
                    100% Private Processing
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-4 shrink-0 w-full sm:w-auto">
                <Link
                  href={getLangUrl('/jpg-to-excel')}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#4338CA] hover:bg-[#3730A3] text-white text-base font-bold shadow-md hover:shadow-lg transition-all text-center inline-flex items-center justify-center gap-2 group"
                >
                  <span>Try JPG-to-Excel Converter</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
                <span className="text-xs text-[#64748B] text-center">
                  Instant free conversion • No credit card required
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 2: AI TOOLS DIRECTORY (CURATED INNOVATION)        */}
      {/* ========================================================= */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] text-[#4338CA] text-xs font-bold uppercase tracking-wider mb-2 border border-[rgba(67,56,202,0.12)]">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t('curatedDirectoryShowcase') || 'Curated AI Innovation'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                {t('featuredInnovation')}
              </h2>
              <p className="text-base sm:text-lg text-[#64748B] mt-1 font-normal">
                {t('featuredSubtitle')}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href={getLangUrl('/submit')} className={styles.btnSecondary}>
                <PlusCircle className="w-4 h-4 text-[#4338CA]" aria-hidden="true" />
                <span>{t('submitTool') || 'Submit an AI Tool'}</span>
              </Link>
              <Link href={getLangUrl('/tools')} className={styles.btnPrimary}>
                <span>View All AI Tools</span>
                <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.length > 0 ? (
              featured.map((tool) => (
                <HomeToolCard key={tool._id || tool.slug} tool={tool} />
              ))
            ) : (
              <p className="text-[#64748B] col-span-3 text-center py-16 text-base italic">
                Curating excellence, please wait...
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Anchor for Hub Products */}
      <div id="products" />

      {/* ========================================================= */}
      {/* SECTION 4: FREE ONLINE IMAGE TOOLS                         */}
      {/* ========================================================= */}
      <section className="py-20 bg-gradient-to-b from-white via-cyan-50/15 to-white border-t border-[#E2E8F0] relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFEFF] text-[#0E7490] text-xs font-bold uppercase tracking-wider mb-2 border border-[rgba(6,182,212,0.25)]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#06B6D4]" aria-hidden="true" />
                <span>100% In-Browser Privacy • WebAssembly Canvas</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                Free Online Image Utilities
              </h2>
              <p className="text-base sm:text-lg text-[#64748B] mt-1 font-normal">
                Optimize, compress, convert, and edit images client-side without sending files to remote servers.
              </p>
            </div>
            <Link href={getLangUrl('/image-tools')} className={styles.btnSecondary}>
              <span>View All Image Tools</span>
              <ArrowRight className="w-4 h-4 ml-1 text-[#4338CA]" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* 1. Image Compressor */}
            <Link
              href={getLangUrl('/image-compressor')}
              className="group relative p-5 bg-white border border-[#E2E8F0] hover:border-[#06B6D4] rounded-2xl shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-50 to-cyan-100/60 text-[#0E7490] border border-cyan-200/50 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                    <ImageIcon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    ✦ -90% Lossless
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#0E7490] transition-colors mb-1.5 line-clamp-1">
                  {t('imageCompressorTitle') || 'Smart Image Compressor'}
                </h3>
                <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                  {t('imageCompressorDesc') || 'Reduce JPEG, PNG, and WebP file sizes directly in your browser with zero visual degradation.'}
                </p>
                <div className="mt-3.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 text-[11px] font-mono text-slate-600">
                  <span>WASM Engine</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-emerald-600 font-semibold">Zero Uploads</span>
                </div>
              </div>
              <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0E7490]">
                <span>{t('imageCompressorCta') || 'Compress Images'}</span>
                <span className="w-6 h-6 rounded-full bg-cyan-50 group-hover:bg-[#06B6D4] group-hover:text-white flex items-center justify-center transition-all duration-200">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>

            {/* 2. Image Converter */}
            <Link
              href={getLangUrl('/image-converter')}
              className="group relative p-5 bg-white border border-[#E2E8F0] hover:border-[#06B6D4] rounded-2xl shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-50 to-cyan-100/60 text-[#0E7490] border border-cyan-200/50 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                    <Layers className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200">
                    ✦ Multi-Format
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#0E7490] transition-colors mb-1.5 line-clamp-1">
                  {t('imageConverterTitle') || 'Universal Image Converter'}
                </h3>
                <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                  {t('imageConverterDesc') || 'Seamlessly convert photos between JPG, PNG, WebP, and AVIF formats in seconds.'}
                </p>
                <div className="mt-3.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 text-[11px] font-mono text-slate-600">
                  <span>JPG</span>
                  <span className="text-cyan-600">⇄</span>
                  <span>PNG</span>
                  <span className="text-cyan-600">⇄</span>
                  <span>WEBP</span>
                </div>
              </div>
              <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0E7490]">
                <span>{t('imageConverterCta') || 'Convert Images'}</span>
                <span className="w-6 h-6 rounded-full bg-cyan-50 group-hover:bg-[#06B6D4] group-hover:text-white flex items-center justify-center transition-all duration-200">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>

            {/* 3. Image Resizer */}
            <Link
              href={getLangUrl('/image-resizer')}
              className="group relative p-5 bg-white border border-[#E2E8F0] hover:border-[#06B6D4] rounded-2xl shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/60 text-blue-600 border border-blue-200/50 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                    <Maximize2 className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    ✦ Exact Pixels
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#0E7490] transition-colors mb-1.5 line-clamp-1">
                  Image Resizer
                </h3>
                <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                  Change image dimensions to target widths and heights while maintaining crisp aspect ratio proportions.
                </p>
                <div className="mt-3.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 text-[11px] font-mono text-slate-600">
                  <span>Custom W×H</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-blue-600 font-semibold">Aspect Lock</span>
                </div>
              </div>
              <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0E7490]">
                <span>Resize Dimensions</span>
                <span className="w-6 h-6 rounded-full bg-cyan-50 group-hover:bg-[#06B6D4] group-hover:text-white flex items-center justify-center transition-all duration-200">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>

            {/* 4. Image Cropper */}
            <Link
              href={getLangUrl('/image-cropper')}
              className="group relative p-5 bg-white border border-[#E2E8F0] hover:border-[#06B6D4] rounded-2xl shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/60 text-purple-700 border border-purple-200/50 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                    <Scissors className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                    ✦ Custom Framing
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#0E7490] transition-colors mb-1.5 line-clamp-1">
                  Image Cropper
                </h3>
                <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                  Crop profile photos, banner graphics, and screenshots with interactive crop ratios (16:9, 1:1, 4:3).
                </p>
                <div className="mt-3.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 text-[11px] font-mono text-slate-600">
                  <span>16:9</span>
                  <span className="text-slate-300">•</span>
                  <span>1:1</span>
                  <span className="text-slate-300">•</span>
                  <span>4:3 Preset</span>
                </div>
              </div>
              <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0E7490]">
                <span>Crop Photos</span>
                <span className="w-6 h-6 rounded-full bg-cyan-50 group-hover:bg-[#06B6D4] group-hover:text-white flex items-center justify-center transition-all duration-200">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>

            {/* 5. JPG to PNG */}
            <Link
              href={getLangUrl('/jpg-to-png')}
              className="group relative p-5 bg-white border border-[#E2E8F0] hover:border-[#06B6D4] rounded-2xl shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100/60 text-amber-700 border border-amber-200/50 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                    <ImageIcon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                    ✦ Alpha Support
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#0E7490] transition-colors mb-1.5 line-clamp-1">
                  JPG to PNG Converter
                </h3>
                <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                  Convert lossy JPEG files into clean, uncompressed PNG format for design and editing workflows.
                </p>
                <div className="mt-3.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 text-[11px] font-mono text-slate-600">
                  <span>Transparent Alpha</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-amber-700 font-semibold">Lossless</span>
                </div>
              </div>
              <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0E7490]">
                <span>Convert JPG to PNG</span>
                <span className="w-6 h-6 rounded-full bg-cyan-50 group-hover:bg-[#06B6D4] group-hover:text-white flex items-center justify-center transition-all duration-200">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>

            {/* 6. PNG to JPG */}
            <Link
              href={getLangUrl('/png-to-jpg')}
              className="group relative p-5 bg-white border border-[#E2E8F0] hover:border-[#06B6D4] rounded-2xl shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/60 text-emerald-700 border border-emerald-200/50 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                    <ImageIcon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    ✦ Web Optimized
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#0E7490] transition-colors mb-1.5 line-clamp-1">
                  PNG to JPG Converter
                </h3>
                <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                  Flatten large transparent PNG files into lightweight JPG images optimized for fast website loading.
                </p>
                <div className="mt-3.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 text-[11px] font-mono text-slate-600">
                  <span>RGB Flattening</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-emerald-700 font-semibold">Minimal KB</span>
                </div>
              </div>
              <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0E7490]">
                <span>Convert PNG to JPG</span>
                <span className="w-6 h-6 rounded-full bg-cyan-50 group-hover:bg-[#06B6D4] group-hover:text-white flex items-center justify-center transition-all duration-200">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 5: FREE ONLINE PDF TOOLS                           */}
      {/* ========================================================= */}
      <section className="py-20 bg-gradient-to-b from-[#F1F5F9] via-[#FFF1F2]/25 to-[#F1F5F9] border-t-2 border-rose-200/60 border-b border-[#E2E8F0] relative overflow-hidden">
        <div className="absolute top-0 right-10 w-80 h-80 bg-rose-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold uppercase tracking-wider mb-2 border border-rose-200">
                <FileText className="w-3.5 h-3.5 text-rose-600" aria-hidden="true" />
                <span>Zero Server Uploads • In-Memory pdf-lib</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                Free Online PDF Utilities
              </h2>
              <p className="text-base sm:text-lg text-[#64748B] mt-1 font-normal">
                Merge, compress, edit, and convert documents locally in your web browser memory via pdf-lib.
              </p>
            </div>
            <Link href={getLangUrl('/pdf-tools')} className={styles.btnSecondary}>
              <span>View All PDF Tools</span>
              <ArrowRight className="w-4 h-4 ml-1 text-[#4338CA]" aria-hidden="true" />
            </Link>
          </div>

          {/* Row 1: Two Wide Hero Bento Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            {/* 1. Merge PDF (Wide Bento Card) */}
            <Link
              href={getLangUrl('/merge-pdf')}
              className="group relative p-6 sm:p-7 bg-white border border-[#E2E8F0] hover:border-rose-300 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200/60 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                    <FileText className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                    Unlimited Pages
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-[#0F172A] group-hover:text-rose-600 transition-colors mb-2">
                  {t('mergePdfTitle') || 'Merge PDF'}
                </h3>
                <p className="text-sm text-[#64748B] leading-relaxed mb-4">
                  {t('mergePdfDesc') || 'Combine multiple PDF files into one clean document with drag-and-drop page reordering.'}
                </p>

                {/* Visual Document Stack Mockup */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3 text-xs font-mono text-slate-700 my-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-white rounded border border-slate-200 shadow-2xs font-semibold text-rose-700">📄 Doc1.pdf</span>
                    <span className="text-slate-400 font-bold">+</span>
                    <span className="px-2.5 py-1 bg-white rounded border border-slate-200 shadow-2xs font-semibold text-rose-700">📄 Doc2.pdf</span>
                  </div>
                  <span className="text-rose-500 font-bold">➔</span>
                  <span className="px-2.5 py-1 bg-rose-50 rounded border border-rose-200 text-rose-700 font-bold">📄 Merged.pdf</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-rose-600 group-hover:text-rose-700">
                <span>{t('mergePdfCta') || 'Merge PDFs'}</span>
                <span className="w-7 h-7 rounded-full bg-rose-50 group-hover:bg-rose-600 group-hover:text-white flex items-center justify-center transition-all duration-200">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>

            {/* 2. Compress PDF (Wide Bento Card) */}
            <Link
              href={getLangUrl('/compress-pdf')}
              className="group relative p-6 sm:p-7 bg-white border border-[#E2E8F0] hover:border-orange-300 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 border border-orange-200/60 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                    <FileText className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200">
                    Shrink Size
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-[#0F172A] group-hover:text-orange-600 transition-colors mb-2">
                  Compress PDF
                </h3>
                <p className="text-sm text-[#64748B] leading-relaxed mb-4">
                  Optimize document structure and embedded images to shrink oversized PDF files for email attachments.
                </p>

                {/* Visual Reduction Meter Mockup */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3 text-xs font-mono text-slate-700 my-2">
                  <span className="text-slate-500 line-through">24.5 MB</span>
                  <div className="flex-1 max-w-[140px] h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="w-[12%] h-full bg-gradient-to-r from-orange-400 to-emerald-500 rounded-full" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[11px]">2.1 MB (-91%)</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-orange-600 group-hover:text-orange-700">
                <span>Compress PDF</span>
                <span className="w-7 h-7 rounded-full bg-orange-50 group-hover:bg-orange-600 group-hover:text-white flex items-center justify-center transition-all duration-200">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          </div>

          {/* Row 2: Four Precision Conversion Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 3. PDF to Word */}
            <Link
              href={getLangUrl('/pdf-to-word')}
              className="group p-5 bg-white border border-[#E2E8F0] hover:border-blue-400 rounded-2xl shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                    <FileText className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    DOCX Export
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors mb-1.5 line-clamp-1">
                  PDF to Word Converter
                </h3>
                <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                  Convert PDF documents into editable Microsoft Word (.docx) files preserving headings and paragraphs.
                </p>
                <div className="mt-3 text-[11px] font-medium text-slate-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>Preserves Headings & Tables</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                <span>Convert to Word</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
            </Link>

            {/* 4. Word to PDF */}
            <Link
              href={getLangUrl('/word-to-pdf')}
              className="group p-5 bg-white border border-[#E2E8F0] hover:border-indigo-400 rounded-2xl shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                    <FileText className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Universal
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0F172A] group-hover:text-indigo-600 transition-colors mb-1.5 line-clamp-1">
                  Word to PDF Converter
                </h3>
                <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                  Export Word documents to universally readable, print-ready PDF files with exact typography formatting.
                </p>
                <div className="mt-3 text-[11px] font-medium text-slate-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span>Print-Ready 300 DPI</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:translate-x-0.5 transition-transform">
                <span>Convert to PDF</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
            </Link>

            {/* 5. PDF to Excel */}
            <Link
              href={getLangUrl('/pdf-to-excel')}
              className="group p-5 bg-white border border-[#E2E8F0] hover:border-emerald-400 rounded-2xl shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                    <FileSpreadsheet className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Data Sheets
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0F172A] group-hover:text-emerald-600 transition-colors mb-1.5 line-clamp-1">
                  PDF to Excel Converter
                </h3>
                <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                  Extract tables, transaction figures, and financial statements from PDF files directly into Excel spreadsheets.
                </p>
                <div className="mt-3 text-[11px] font-medium text-slate-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Cell Grid & Number Parser</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600 group-hover:translate-x-0.5 transition-transform">
                <span>Extract Tables</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
            </Link>

            {/* 6. Edit PDF */}
            <Link
              href={getLangUrl('/edit-pdf')}
              className="group p-5 bg-white border border-[#E2E8F0] hover:border-violet-400 rounded-2xl shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                    <FileEdit className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-violet-50 text-violet-700 border border-violet-200">
                    Interactive
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0F172A] group-hover:text-violet-600 transition-colors mb-1.5 line-clamp-1">
                  Edit PDF Online
                </h3>
                <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                  Add text, highlight key sections, insert signatures, and modify pages directly inside your web browser.
                </p>
                <div className="mt-3 text-[11px] font-medium text-slate-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                  <span>Annotations & Signatures</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-violet-600 group-hover:translate-x-0.5 transition-transform">
                <span>Edit Document</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 6: FREE ONLINE CALCULATORS                         */}
      {/* ========================================================= */}
      <section className="py-20 bg-gradient-to-b from-emerald-50/20 via-white to-slate-50/50 border-t-2 border-emerald-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">
                <Calculator className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                <span>24 Free Calculators • Real-Time Math Engine</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                Free Online Calculators
              </h2>
              <p className="text-base sm:text-lg text-[#64748B] mt-1 font-normal">
                Perform instant financial, math, date, and fitness calculations with clear visual breakdowns and formulas.
              </p>
            </div>
            <Link href={getLangUrl('/calculators')} className={styles.btnSecondary}>
              <span>Explore Calculators</span>
              <ArrowRight className="w-4 h-4 ml-1 text-[#4338CA]" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* 1. EMI Calculator */}
            <Link
              href={getLangUrl('/calculators/emi-calculator')}
              className="group relative p-5 bg-white border border-[#E2E8F0] hover:border-emerald-500 rounded-2xl shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/50 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                    <CreditCard className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Finance • EMI
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0F172A] group-hover:text-emerald-700 transition-colors mb-1.5 line-clamp-1">
                  {t('emiCalculatorTitle') || 'EMI Calculator'}
                </h3>
                <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                  {t('emiCalculatorDesc') || 'Calculate exact monthly loan repayments, interest rates, and total payable amount with interactive charts.'}
                </p>
                <div className="mt-3.5 p-2 rounded-lg bg-emerald-50/60 border border-emerald-100/80 flex items-center justify-between text-[11px] font-mono text-emerald-950">
                  <span className="text-emerald-700 font-semibold">P × r × (1+r)ⁿ</span>
                  <span className="text-[10px] text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200 font-bold">Chart Ready</span>
                </div>
              </div>
              <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                <span>{t('emiCalculatorCta') || 'Calculate EMI'}</span>
                <span className="w-6 h-6 rounded-full bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition-all duration-200">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>

            {/* 2. Loan Calculator */}
            <Link
              href={getLangUrl('/calculators/loan-calculator')}
              className="group relative p-5 bg-white border border-[#E2E8F0] hover:border-emerald-500 rounded-2xl shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/50 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                    <DollarSign className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 border border-blue-200">
                    Amortization
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0F172A] group-hover:text-emerald-700 transition-colors mb-1.5 line-clamp-1">
                  Loan Calculator
                </h3>
                <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                  Compare auto, personal, and mortgage loan repayment schedules with yearly interest amortization tables.
                </p>
                <div className="mt-3.5 p-2 rounded-lg bg-blue-50/60 border border-blue-100/80 flex items-center justify-between text-[11px] font-mono text-blue-950">
                  <span className="text-blue-700 font-semibold">Principal vs Interest</span>
                  <span className="text-[10px] text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-200 font-bold">1-30 Yrs</span>
                </div>
              </div>
              <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                <span>Calculate Loan</span>
                <span className="w-6 h-6 rounded-full bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition-all duration-200">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>

            {/* 3. Age Calculator */}
            <Link
              href={getLangUrl('/calculators/age-calculator')}
              className="group relative p-5 bg-white border border-[#E2E8F0] hover:border-emerald-500 rounded-2xl shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/50 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                    <Calendar className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                    Date & Time
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0F172A] group-hover:text-emerald-700 transition-colors mb-1.5 line-clamp-1">
                  {t('ageCalculatorTitle') || 'Age Calculator'}
                </h3>
                <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                  {t('ageCalculatorDesc') || 'Find your exact age in years, months, weeks, days, and discover your upcoming birthday countdown.'}
                </p>
                <div className="mt-3.5 p-2 rounded-lg bg-amber-50/60 border border-amber-100/80 flex items-center justify-between text-[11px] font-mono text-amber-950">
                  <span className="text-amber-800 font-semibold">Yrs • Mths • Days</span>
                  <span className="text-[10px] text-amber-800 bg-white px-2 py-0.5 rounded border border-amber-200 font-bold">Countdown</span>
                </div>
              </div>
              <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                <span>{t('ageCalculatorCta') || 'Calculate Age'}</span>
                <span className="w-6 h-6 rounded-full bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition-all duration-200">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>

            {/* 4. Percentage Calculator */}
            <Link
              href={getLangUrl('/calculators/percentage-calculator')}
              className="group relative p-5 bg-white border border-[#E2E8F0] hover:border-emerald-500 rounded-2xl shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200/50 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                    <Percent className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-800 border border-indigo-200">
                    Math • Δ%
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0F172A] group-hover:text-emerald-700 transition-colors mb-1.5 line-clamp-1">
                  {t('percentageCalculatorTitle') || 'Percentage Calculator'}
                </h3>
                <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                  {t('percentageCalculatorDesc') || 'Solve percent changes, discount amounts, retail markups, and ratio differences instantly.'}
                </p>
                <div className="mt-3.5 p-2 rounded-lg bg-indigo-50/60 border border-indigo-100/80 flex items-center justify-between text-[11px] font-mono text-indigo-950">
                  <span className="text-indigo-700 font-semibold">Δ% = (V₂ - V₁) / V₁</span>
                  <span className="text-[10px] text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200 font-bold">Markups</span>
                </div>
              </div>
              <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                <span>{t('percentageCalculatorCta') || 'Calculate Percentage'}</span>
                <span className="w-6 h-6 rounded-full bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition-all duration-200">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>

            {/* 5. Salary Calculator */}
            <Link
              href={getLangUrl('/calculators/salary-calculator')}
              className="group relative p-5 bg-white border border-[#E2E8F0] hover:border-emerald-500 rounded-2xl shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 border border-purple-200/50 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                    <CreditCard className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-purple-50 text-purple-800 border border-purple-200">
                    Income • Gross
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0F172A] group-hover:text-emerald-700 transition-colors mb-1.5 line-clamp-1">
                  Salary Calculator
                </h3>
                <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                  Convert hourly wages to annual salary, evaluate overtime earnings, and project take-home earnings.
                </p>
                <div className="mt-3.5 p-2 rounded-lg bg-purple-50/60 border border-purple-100/80 flex items-center justify-between text-[11px] font-mono text-purple-950">
                  <span className="text-purple-700 font-semibold">Hourly ⇄ Annualized</span>
                  <span className="text-[10px] text-purple-700 bg-white px-2 py-0.5 rounded border border-purple-200 font-bold">Net Pay</span>
                </div>
              </div>
              <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                <span>Calculate Salary</span>
                <span className="w-6 h-6 rounded-full bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition-all duration-200">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>

            {/* 6. Currency Converter */}
            <Link
              href={getLangUrl('/calculators/currency-calculator')}
              className="group relative p-5 bg-white border border-[#E2E8F0] hover:border-emerald-500 rounded-2xl shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-11 h-11 rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-200/50 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                    <Coins className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-cyan-50 text-cyan-800 border border-cyan-200">
                    Live FX
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0F172A] group-hover:text-emerald-700 transition-colors mb-1.5 line-clamp-1">
                  Currency Converter
                </h3>
                <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                  Convert international currencies with transparent exchange rates across USD, EUR, GBP, JPY, and INR.
                </p>
                <div className="mt-3.5 p-2 rounded-lg bg-cyan-50/60 border border-cyan-100/80 flex items-center justify-between text-[11px] font-mono text-cyan-950">
                  <span className="text-cyan-800 font-semibold">USD • EUR • GBP • INR</span>
                  <span className="text-[10px] text-cyan-700 bg-white px-2 py-0.5 rounded border border-cyan-200 font-bold">Mid-Market</span>
                </div>
              </div>
              <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                <span>Convert Currency</span>
                <span className="w-6 h-6 rounded-full bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition-all duration-200">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 7: EXPLORE AI TOOLS BY CATEGORY                   */}
      {/* ========================================================= */}
      <section className="py-14 sm:py-16 bg-[#F8FAFC] border-t border-[#E2E8F0]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between mb-7 gap-6">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] text-[#4338CA] text-xs font-bold uppercase tracking-wider mb-2 border border-[rgba(67,56,202,0.12)]">
                <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Ecosystem Directory</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                {t('discoverByIntent')}
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] mt-1 font-normal">
                {t('intentSubtitle')}
              </p>
            </div>
            <Link href={getLangUrl('/categories')} className={styles.btnSecondary}>
              <span>{t('exploreAllCategories') || 'Explore All Categories'}</span>
              <ArrowRight className="w-4 h-4 ml-1 text-[#4338CA]" aria-hidden="true" />
            </Link>
          </div>

          {/* Interactive Intent Filter Switcher Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 custom-scrollbar">
            {intentFilters.map((filter) => {
              const isActive = activeIntentFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveIntentFilter(filter.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive 
                      ? 'bg-[#4338CA] text-white shadow-md shadow-indigo-500/20' 
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-[#E2E8F0]'
                  }`}
                >
                  <span aria-hidden="true">{filter.icon}</span>
                  <span>{filter.label}</span>
                </button>
              );
            })}
          </div>

          {/* Responsive Compact Intent Cards Grid (Max 2 Rows: 8 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredCategories.length > 0 ? (
              filteredCategories.slice(0, 8).map((category) => (
                <HomeCategoryCard key={category._id || category.slug} category={category} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-dashed border-[#CBD5E1]">
                <p className="text-[#64748B] text-sm">
                  No tools found for this specific filter.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveIntentFilter('all')}
                  className="mt-3 text-xs font-bold text-[#4338CA] hover:underline"
                >
                  Show all categories
                </button>
              </div>
            )}
          </div>

          {/* Centered See All Categories CTA Button */}
          <div className="mt-8 text-center">
            <Link
              href={getLangUrl('/categories')}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-[#E2E8F0] hover:border-[#4338CA] text-sm font-bold text-[#0F172A] hover:text-[#4338CA] shadow-2xs hover:shadow-md transition-all group"
            >
              <span>See All Categories</span>
              <ArrowRight className="w-4 h-4 text-[#4338CA] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 8: POPULAR AI TOOLS                               */}
      {/* ========================================================= */}
      <section className="py-20 bg-white border-t border-[#E2E8F0]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] text-[#4338CA] text-xs font-bold uppercase tracking-wider mb-2 border border-[rgba(67,56,202,0.12)]">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Most Trusted Software</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                {t('popularToolsTitle') || 'Popular AI Tools'}
              </h2>
              <p className="text-base sm:text-lg text-[#64748B] mt-1 font-normal">
                High-adoption artificial intelligence solutions recognized across developer and creative communities.
              </p>
            </div>
            <Link href={getLangUrl('/tools')} className={styles.btnSecondary}>
              <span>View All AI Tools</span>
              <ArrowRight className="w-4 h-4 ml-1 text-[#4338CA]" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.slice(0, 6).map((tool, index) => (
              <HomeToolCard key={`pop-${tool._id || tool.slug}`} tool={tool} rank={index + 1} variant="popular" />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 9: TRENDING AI TOOLS                              */}
      {/* ========================================================= */}
      <section className="py-20 bg-[#F8FAFC] border-t border-[#E2E8F0]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold uppercase tracking-wider mb-2 border border-rose-200">
                <TrendingUp className="w-3.5 h-3.5 text-rose-600" aria-hidden="true" />
                <span>Velocity & Search Growth</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                {t('hyperGrowthTools')}
              </h2>
              <p className="text-base sm:text-lg text-[#64748B] mt-1 font-normal">
                {t('trendingSubtitle')}
              </p>
            </div>
            <Link href={getLangUrl('/tools?sort=trending')} className={styles.btnSecondary}>
              <span>Explore Trending Tools</span>
              <ArrowRight className="w-4 h-4 ml-1 text-[#4338CA]" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
            {trending.length > 0 ? (
              trending.slice(0, 8).map((tool) => (
                <HomeToolCard key={`trend-${tool._id || tool.slug}`} tool={tool} badge="🔥 Trending" variant="trending" />
              ))
            ) : (
              <p className="text-[#64748B] col-span-4 text-center py-16 text-base italic">
                Searching for trending tools...
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 10: RECENTLY ADDED AI TOOLS                       */}
      {/* ========================================================= */}
      {latest.length > 0 && (
        <section className="py-20 bg-white border-t border-[#E2E8F0]">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] text-[#4338CA] text-xs font-bold uppercase tracking-wider mb-2 border border-[rgba(67,56,202,0.12)]">
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Verified Submissions</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                  {t('freshArrivals')}
                </h2>
                <p className="text-base sm:text-lg text-[#64748B] mt-1 font-normal">
                  {t('arrivalsSubtitle')}
                </p>
              </div>
              <Link href={getLangUrl('/tools?sort=newest')} className={styles.btnSecondary}>
                <span>View All AI Tools</span>
                <ArrowRight className="w-4 h-4 ml-1 text-[#4338CA]" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {latest.map((tool) => (
                <HomeToolCard key={`latest-${tool._id || tool.slug}`} tool={tool} badge="✦ New" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* SECTION 11: LATEST AI NEWS & UPDATES                      */}
      {/* ========================================================= */}
      <section className="py-20 bg-[#F8FAFC] border-t border-[#E2E8F0]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFEFF] text-[#0E7490] text-xs font-bold uppercase tracking-wider mb-2 border border-[rgba(6,182,212,0.25)]">
                <BookOpen className="w-3.5 h-3.5 text-[#06B6D4]" aria-hidden="true" />
                <span>Industry Insights</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                Latest AI News & Editorial Updates
              </h2>
              <p className="text-base sm:text-lg text-[#64748B] mt-1 font-normal">
                Curated reports, ecosystem changes, model updates, and practical application breakthroughs.
              </p>
            </div>
            <Link href={getLangUrl('/blogs')} className={styles.btnSecondary}>
              <span>Read All News & Updates</span>
              <ArrowRight className="w-4 h-4 ml-1 text-[#4338CA]" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white border border-[#E2E8F0] hover:border-[#4338CA] rounded-2xl shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#4338CA] bg-[#EEF2FF] px-2.5 py-1 rounded-md mb-3 inline-block">
                  Ecommerce AI
                </span>
                <h3 className="text-lg font-bold text-[#0F172A] mb-2 leading-snug">
                  The AI Ecommerce Stack You’ll Wish You Had Before 2027
                </h3>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  How leading online stores automate product imaging, copy generation, and dynamic inventory management.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E2E8F0]">
                <Link href={getLangUrl('/blogs/ai-ecommerce-stack-2027')} className="text-xs font-bold text-[#4338CA] hover:text-[#3730A3] inline-flex items-center gap-1">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="p-6 bg-white border border-[#E2E8F0] hover:border-[#4338CA] rounded-2xl shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0E7490] bg-[#ECFEFF] px-2.5 py-1 rounded-md mb-3 inline-block">
                  Vision & Multimodal
                </span>
                <h3 className="text-lg font-bold text-[#0F172A] mb-2 leading-snug">
                  Multimodal LLMs Surpass Traditional OCR Engines
                </h3>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  Comparing Google Gemini 2.5 Flash table extraction against legacy optical character recognition pipelines.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E2E8F0]">
                <Link href={getLangUrl('/blogs')} className="text-xs font-bold text-[#4338CA] hover:text-[#3730A3] inline-flex items-center gap-1">
                  <span>Explore Insights</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="p-6 bg-white border border-[#E2E8F0] hover:border-[#4338CA] rounded-2xl shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md mb-3 inline-block">
                  In-Browser Tech
                </span>
                <h3 className="text-lg font-bold text-[#0F172A] mb-2 leading-snug">
                  Client-Side WebAssembly: Zero-Server Privacy by Default
                </h3>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  Why local execution in web workers eliminates data leak risks for confidential documents and photos.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E2E8F0]">
                <Link href={getLangUrl('/blogs')} className="text-xs font-bold text-[#4338CA] hover:text-[#3730A3] inline-flex items-center gap-1">
                  <span>Explore Insights</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION: PLATFORM STATS (PLAYFUL & ELEGANT BENTO)         */}
      {/* ========================================================= */}
      <section className="py-20 bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC] relative overflow-hidden border-t border-[#E2E8F0]">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-indigo-500/5 via-cyan-500/5 to-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          {/* Playful Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] shadow-2xs text-[#4338CA] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#4338CA] animate-pulse" aria-hidden="true" />
              <span>Platform Ecosystem</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Engineered for Speed, Privacy & Power
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] mt-2 font-normal">
              A unified hub combining local in-browser utilities, financial math, and global AI discovery.
            </p>
          </div>

          {/* 4 Tactile & Playful Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Curated AI Tools */}
            <Link
              href={getLangUrl('/tools')}
              className="group relative p-7 bg-white hover:bg-gradient-to-b hover:from-white hover:to-indigo-50/30 border border-[#E2E8F0] hover:border-[#4338CA] rounded-3xl shadow-xs hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#4338CA] to-[#6366F1] text-white flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Sparkles className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100/80">
                  ✦ 50+ Topics
                </span>
              </div>

              <div>
                <div className="text-4xl sm:text-5xl font-black text-[#0F172A] tracking-tight mb-1 flex items-baseline">
                  1,400<span className="text-[#4338CA] text-3xl font-extrabold ml-0.5">+</span>
                </div>
                <h3 className="text-base font-bold text-[#0F172A] mb-1 group-hover:text-[#4338CA] transition-colors">
                  {t('aiApps')}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Curated AI apps with unbiased editorial screening and no sponsored bias.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#4338CA] group-hover:translate-x-1 transition-transform">
                <span>Explore Directory</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
            </Link>

            {/* Card 2: Free Calculators */}
            <Link
              href={getLangUrl('/calculators')}
              className="group relative p-7 bg-white hover:bg-gradient-to-b hover:from-white hover:to-emerald-50/30 border border-[#E2E8F0] hover:border-emerald-500 rounded-3xl shadow-xs hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                  <Calculator className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100/80">
                  ✦ Instant Math
                </span>
              </div>

              <div>
                <div className="text-4xl sm:text-5xl font-black text-[#0F172A] tracking-tight mb-1 flex items-baseline">
                  24<span className="text-emerald-600 text-2xl font-extrabold ml-1">Live</span>
                </div>
                <h3 className="text-base font-bold text-[#0F172A] mb-1 group-hover:text-emerald-700 transition-colors">
                  {t('statsFreeCalculators')}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Loan EMI, mortgage, salary, date differences, and retail discounts.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
                <span>Calculate Now</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
            </Link>

            {/* Card 3: PDF & Image Tools */}
            <Link
              href={getLangUrl('/image-tools')}
              className="group relative p-7 bg-white hover:bg-gradient-to-b hover:from-white hover:to-cyan-50/30 border border-[#E2E8F0] hover:border-[#06B6D4] rounded-3xl shadow-xs hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#06B6D4] to-blue-600 text-white flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Layers className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0E7490] bg-[#ECFEFF] px-2.5 py-1 rounded-full border border-cyan-100/80">
                  ✦ Client-Side
                </span>
              </div>

              <div>
                <div className="text-4xl sm:text-5xl font-black text-[#0F172A] tracking-tight mb-1 flex items-baseline">
                  21<span className="text-[#06B6D4] text-3xl font-extrabold ml-0.5">+</span>
                </div>
                <h3 className="text-base font-bold text-[#0F172A] mb-1 group-hover:text-[#0E7490] transition-colors">
                  {t('statsPdfImageTools')}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Batch compress, format convert, merge, crop, and resize with zero wait.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0E7490] group-hover:translate-x-1 transition-transform">
                <span>Try Free Utilities</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
            </Link>

            {/* Card 4: Private & In-Browser */}
            <div
              className="group relative p-7 bg-white hover:bg-gradient-to-b hover:from-white hover:to-amber-50/30 border border-[#E2E8F0] hover:border-amber-400 rounded-3xl shadow-xs hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                  <ShieldCheck className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100/80">
                  ✦ Zero Storage
                </span>
              </div>

              <div>
                <div className="text-4xl sm:text-5xl font-black text-[#0F172A] tracking-tight mb-1 flex items-baseline">
                  100<span className="text-amber-600 text-3xl font-extrabold ml-0.5">%</span>
                </div>
                <h3 className="text-base font-bold text-[#0F172A] mb-1 group-hover:text-amber-800 transition-colors">
                  {t('statsPrivateInBrowser')}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Processed purely in your device's RAM. Files never upload to remote servers.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-800">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Local Sandbox</span>
                </span>
                <Lock className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION: FOUNDER SUBMIT SHOWCASE (REDESIGNED)             */}
      {/* ========================================================= */}
      <section className="py-24 bg-[#0A0D14] text-white relative overflow-hidden border-t border-slate-800">
        {/* Ambient Glow & Grid Accents */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#4338CA]/25 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#06B6D4]/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-5">
              <Sparkles className="w-3.5 h-3.5 text-[#06B6D4]" aria-hidden="true" />
              <span>For AI Founders & Builders</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
              {t('featureYourProduct')}
            </h2>
            
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              {t('ctaSubtitle')}
            </p>
          </div>

          {/* 4 Value Proposition Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xs hover:border-indigo-500/40 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4 border border-indigo-500/20">
                <Globe className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-white font-bold text-base mb-1.5">Global in 11 Languages</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Get discovered by international users across 11 fully localized language editions with instant translation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xs hover:border-cyan-500/40 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4 border border-cyan-500/20">
                <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-white font-bold text-base mb-1.5">100% Free Listing</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Zero submission fees, recurring costs, or paywalls. Genuine organic discovery for quality products.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xs hover:border-emerald-500/40 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/20">
                <TrendingUp className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-white font-bold text-base mb-1.5">SEO Dofollow Backlink</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Pass high-authority domain authority and crawl equity straight to your project’s homepage.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xs hover:border-purple-500/40 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 border border-purple-500/20">
                <Clock className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-white font-bold text-base mb-1.5">&lt; 24h Review</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Fast human verification process to review metadata, test core utility, and publish your listing promptly.
              </p>
            </div>
          </div>

          {/* Founder Conversion Bar */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-slate-900/80 to-slate-900/60 border border-indigo-500/30 text-center relative overflow-hidden shadow-2xl">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-300">
                <CheckCircle2 className="w-4 h-4 text-[#06B6D4]" aria-hidden="true" />
                <span>Join 1,400+ indexed AI startups, SaaS tools, and developer utilities</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Link 
                  href={getLangUrl('/submit')}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-b from-[#4F46E5] to-[#4338CA] hover:from-[#4338CA] hover:to-[#3730A3] text-white text-base font-bold shadow-lg shadow-indigo-900/50 hover:shadow-indigo-600/40 border border-white/20 transition-all duration-200 text-center inline-flex items-center justify-center gap-2 cursor-pointer select-none hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.98]"
                >
                  <PlusCircle className="w-4 h-4" aria-hidden="true" />
                  <span>{t('submitTool') || 'Submit Your AI Tool — 100% Free'}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>

                <Link
                  href={getLangUrl('/tools')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-slate-200 hover:text-white text-base font-semibold border border-white/[0.15] transition-all duration-200 text-center inline-flex items-center justify-center gap-2 cursor-pointer select-none hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.98]"
                >
                  <span>Explore Existing Directory</span>
                </Link>
              </div>

              <p className="text-[11px] text-slate-400 tracking-wide">
                Free forever listing • No credit card required • Instant editorial queuing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 14: FAQ & IN-DEPTH TOPICAL SEO CONTENT            */}
      {/* ========================================================= */}
      <HomeSEOContent />
    </div>
  );
}
