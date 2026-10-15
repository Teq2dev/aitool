'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SearchBar from '@/components/SearchBar';
import ToolCard from '@/components/ToolCard';
import CategoryCard from '@/components/CategoryCard';
import HomeSEOContent from '@/components/HomeSEOContent';
import { 
  ArrowRightIcon, 
  SparklesIcon, 
  TrendingUpIcon, 
  ZapIcon, 
  LayoutGridIcon, 
  Star,
  Image as ImageIcon,
  FileText,
  Layers,
  CreditCard,
  Calendar,
  Percent,
  ShieldCheck,
  Calculator
} from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function HomeClient({
  initialFeatured = [],
  initialTrending = [],
  initialCategories = [],
  initialLatest = []
}) {
  const featured = initialFeatured;
  const trending = initialTrending;
  const categories = initialCategories;
  const latest = initialLatest;
  const { t, getLangUrl } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl opacity-50"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="mb-8 bg-white/80 backdrop-blur-sm text-blue-1000 border-blue-200 px-6 py-2 text-sm rounded-full shadow-sm animate-fade-in">
            <SparklesIcon className="w-4 h-4 mr-2 inline" />
            {t('heroBadge')}
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 sm:mb-8 leading-tight tracking-tight">
            {t('heroTitlePrefix')}{' '}
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-1000 bg-clip-text text-transparent">
              {t('heroTitleSuffix')}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
            {t('heroSubtitle')}
          </p>

          <div className="max-w-3xl mx-auto mb-8 shadow-2xl rounded-2xl overflow-hidden animate-slide-up">
            <SearchBar className="p-2" />
          </div>

          {/* Quick Category Hub Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-1">{t('quickExplore')}</span>
            <Link href="#featured-free-tools" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-100/90 text-blue-800 hover:bg-blue-200 transition-colors">
              <ZapIcon className="w-3.5 h-3.5 text-blue-600" />
              {t('freeOnlineTools')}
            </Link>
            <Link href={getLangUrl('/pdf-tools')} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 text-gray-700 hover:bg-gray-100 border border-gray-200 transition-colors shadow-sm">
              <FileText className="w-3.5 h-3.5 text-red-500" />
              {t('pdfTools')}
            </Link>
            <Link href={getLangUrl('/image-tools')} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 text-gray-700 hover:bg-gray-100 border border-gray-200 transition-colors shadow-sm">
              <ImageIcon className="w-3.5 h-3.5 text-blue-500" />
              {t('imageTools')}
            </Link>
            <Link href={getLangUrl('/calculators')} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 text-gray-700 hover:bg-gray-100 border border-gray-200 transition-colors shadow-sm">
              <Calculator className="w-3.5 h-3.5 text-emerald-500" />
              {t('twentyFourCalculators')}
            </Link>
            <Link href={getLangUrl('/tools')} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 text-gray-700 hover:bg-gray-100 border border-gray-200 transition-colors shadow-sm">
              <SparklesIcon className="w-3.5 h-3.5 text-indigo-500" />
              {t('aiDirectoryCount')}
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="#featured-free-tools">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-base md:text-lg px-8 py-7 rounded-2xl shadow-xl shadow-blue-200 transition-all hover:scale-105 active:scale-95 font-semibold">
                {t('exploreFreeToolsBtn')}
                <ArrowRightIcon className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href={getLangUrl('/tools')}>
              <Button size="lg" variant="outline" className="border-2 border-gray-200 bg-white/80 backdrop-blur-sm text-gray-800 hover:bg-white hover:border-blue-600 hover:text-blue-600 text-base md:text-lg px-8 py-7 rounded-2xl transition-all font-semibold">
                {t('browseAiDirectoryBtn')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Free Tools Section */}
      <section id="featured-free-tools" className="py-20 bg-gradient-to-b from-white via-blue-50/20 to-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{t('privacyBadge')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
              {t('featuredFreeToolsTitle')}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal max-w-2xl mx-auto">
              {t('featuredFreeToolsSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {/* 1. Image Compressor */}
            <Link
              href={getLangUrl('/image-compressor')}
              className="group relative p-6 bg-white rounded-2xl border border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                    {t('imageCompressorBadge')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                  {t('imageCompressorTitle')}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t('imageCompressorDesc')}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-sm font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                <span>{t('imageCompressorCta')}</span>
                <ArrowRightIcon className="w-4 h-4 ml-1" />
              </div>
            </Link>

            {/* 2. Merge PDF */}
            <Link
              href={getLangUrl('/merge-pdf')}
              className="group relative p-6 bg-white rounded-2xl border border-gray-200 hover:border-red-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-100">
                    {t('mergePdfBadge')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors mb-2">
                  {t('mergePdfTitle')}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t('mergePdfDesc')}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-sm font-semibold text-red-600 group-hover:translate-x-1 transition-transform">
                <span>{t('mergePdfCta')}</span>
                <ArrowRightIcon className="w-4 h-4 ml-1" />
              </div>
            </Link>

            {/* 3. Image Converter */}
            <Link
              href={getLangUrl('/image-converter')}
              className="group relative p-6 bg-white rounded-2xl border border-gray-200 hover:border-purple-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <Layers className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-100">
                    {t('imageConverterBadge')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                  {t('imageConverterTitle')}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t('imageConverterDesc')}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-sm font-semibold text-purple-600 group-hover:translate-x-1 transition-transform">
                <span>{t('imageConverterCta')}</span>
                <ArrowRightIcon className="w-4 h-4 ml-1" />
              </div>
            </Link>

            {/* 4. EMI Calculator */}
            <Link
              href={getLangUrl('/calculators/emi-calculator')}
              className="group relative p-6 bg-white rounded-2xl border border-gray-200 hover:border-emerald-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                    {t('emiCalculatorBadge')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors mb-2">
                  {t('emiCalculatorTitle')}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t('emiCalculatorDesc')}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-sm font-semibold text-emerald-600 group-hover:translate-x-1 transition-transform">
                <span>{t('emiCalculatorCta')}</span>
                <ArrowRightIcon className="w-4 h-4 ml-1" />
              </div>
            </Link>

            {/* 5. Age Calculator */}
            <Link
              href={getLangUrl('/calculators/age-calculator')}
              className="group relative p-6 bg-white rounded-2xl border border-gray-200 hover:border-amber-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                    {t('ageCalculatorBadge')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors mb-2">
                  {t('ageCalculatorTitle')}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t('ageCalculatorDesc')}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-sm font-semibold text-amber-600 group-hover:translate-x-1 transition-transform">
                <span>{t('ageCalculatorCta')}</span>
                <ArrowRightIcon className="w-4 h-4 ml-1" />
              </div>
            </Link>

            {/* 6. Percentage Calculator */}
            <Link
              href={getLangUrl('/calculators/percentage-calculator')}
              className="group relative p-6 bg-white rounded-2xl border border-gray-200 hover:border-indigo-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <Percent className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {t('percentageCalculatorBadge')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2">
                  {t('percentageCalculatorTitle')}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t('percentageCalculatorDesc')}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-sm font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform">
                <span>{t('percentageCalculatorCta')}</span>
                <ArrowRightIcon className="w-4 h-4 ml-1" />
              </div>
            </Link>
          </div>

          {/* Dedicated Hub Exploration Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-center">
            <Link
              href={getLangUrl('/pdf-tools')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-gray-200 text-gray-800 text-sm font-bold hover:border-red-500 hover:text-red-600 shadow-sm transition-all"
            >
              <FileText className="w-4 h-4 text-red-500" />
              <span>{t('browseAllPdfTools')}</span>
            </Link>
            <Link
              href={getLangUrl('/image-tools')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-gray-200 text-gray-800 text-sm font-bold hover:border-blue-500 hover:text-blue-600 shadow-sm transition-all"
            >
              <ImageIcon className="w-4 h-4 text-blue-500" />
              <span>{t('browseAllImageTools')}</span>
            </Link>
            <Link
              href={getLangUrl('/calculators')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-gray-200 text-gray-800 text-sm font-bold hover:border-emerald-500 hover:text-emerald-600 shadow-sm transition-all"
            >
              <Calculator className="w-4 h-4 text-emerald-500" />
              <span>{t('exploreAllCalculators')}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center group">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform bg-white border border-blue-100 shadow-sm">
                <SparklesIcon className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-4xl font-black text-gray-900 mb-1">1,400+</div>
              <div className="text-gray-500 font-medium">{t('aiApps')}</div>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform bg-white border border-emerald-100 shadow-sm">
                <Calculator className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="text-4xl font-black text-gray-900 mb-1">24</div>
              <div className="text-gray-500 font-medium">{t('statsFreeCalculators')}</div>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform bg-white border border-purple-100 shadow-sm">
                <Layers className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-4xl font-black text-gray-900 mb-1">21+</div>
              <div className="text-gray-500 font-medium">{t('statsPdfImageTools')}</div>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform bg-white border border-amber-100 shadow-sm">
                <ShieldCheck className="w-8 h-8 text-amber-500" />
              </div>
              <div className="text-4xl font-black text-gray-900 mb-1">100%</div>
              <div className="text-gray-500 font-medium">{t('statsPrivateInBrowser')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
                <SparklesIcon className="w-3.5 h-3.5" />
                <span>{t('curatedDirectoryShowcase')}</span>
              </div>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-3">{t('featuredInnovation')}</h2>
              <p className="text-xl text-gray-500 font-medium">{t('featuredSubtitle')}</p>
            </div>
            <Link href={getLangUrl('/tools?featured=true')}>
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl px-8 transition-all">
                {t('viewAllExcellence')} <ArrowRightIcon className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.length > 0 ? (
              featured.map((tool) => (
                <ToolCard key={tool._id} tool={tool} />
              ))
            ) : (
              <p className="text-gray-400 col-span-3 text-center py-16 text-lg italic">Curating excellence, please wait...</p>
            )}
          </div>
        </div>
      </section>

      {/* Trending Tools Section */}
      <section className="py-24 bg-gray-50 rounded-[4rem] mx-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-3 flex items-center gap-4 py-2">
                <TrendingUpIcon className="w-10 h-10 text-red-500 animate-pulse" />
                {t('hyperGrowthTools')}
              </h2>
              <p className="text-xl text-gray-500 font-medium">{t('trendingSubtitle')}</p>
            </div>
            <Link href={getLangUrl('/tools?sort=trending')}>
              <Button variant="default" className="bg-gray-900 hover:bg-black text-white rounded-xl px-8 shadow-lg">
                {t('seeTrends')} <ArrowRightIcon className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trending.length > 0 ? (
              trending.slice(0, 8).map((tool) => (
                <ToolCard key={tool._id} tool={tool} />
              ))
            ) : (
              <p className="text-gray-400 col-span-4 text-center py-16 text-lg italic">Searching for trending stars...</p>
            )}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{t('discoverByIntent')}</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">{t('intentSubtitle')}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-16">
            {categories.length > 0 ? (
              categories.map((category) => (
                <CategoryCard key={category._id || category.name} category={category} />
              ))
            ) : (
              <p className="text-gray-400 col-span-6 text-center py-16 italic">Mapping the ecosystem...</p>
            )}
          </div>

          <div className="text-center">
            <Link href={getLangUrl('/categories')}>
              <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-12 py-7 text-lg font-bold rounded-2xl transition-all">
                {t('exploreAllCategories')} ({categories.length}+)
                <ArrowRightIcon className="ml-2 w-6 h-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Tools Section */}
      {latest.length > 0 && (
        <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-3">{t('freshArrivals')}</h2>
                <p className="text-xl text-gray-500 font-medium">{t('arrivalsSubtitle')}</p>
              </div>
              <Link href={getLangUrl('/tools?sort=newest')}>
                <Button variant="outline" className="border-gray-300 text-gray-1000 hover:bg-gray-100 rounded-xl px-8">
                  {t('recentArrivals')} <ArrowRightIcon className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latest.map((tool) => (
                <ToolCard key={tool._id} tool={tool} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-32 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-dark.svg')] opacity-20"></div>
        <div className="absolute -top-48 -right-48 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight">{t('featureYourProduct')}</h2>
          <p className="text-2xl text-blue-100/80 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            {t('ctaSubtitle')}
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link href={getLangUrl('/submit')}>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-1000 text-white text-xl px-12 py-9 rounded-2xl shadow-2xl shadow-blue-500/20 transition-all font-black">
                {t('submitTool')}
                <ArrowRightIcon className="ml-4 w-7 h-7" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO & Topical Content Section */}
      <HomeSEOContent />
    </div>
  );
}
