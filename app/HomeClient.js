'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SearchBar from '@/components/SearchBar';
import ToolCard from '@/components/ToolCard';
import CategoryCard from '@/components/CategoryCard';
import { ArrowRightIcon, SparklesIcon, TrendingUpIcon, ZapIcon, LayoutGridIcon, Star } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function HomeClient({ 
  initialFeatured = [], 
  initialTrending = [], 
  initialCategories = [], 
  initialLatest = [] 
}) {
  const [featured] = useState(initialFeatured);
  const [trending] = useState(initialTrending);
  const [categories] = useState(initialCategories);
  const [latest] = useState(initialLatest);
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl opacity-50"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="mb-8 bg-white/80 backdrop-blur-sm text-blue-700 border-blue-200 px-6 py-2 text-sm rounded-full shadow-sm animate-fade-in">
            <SparklesIcon className="w-4 h-4 mr-2 inline" />
            {t('heroBadge')}
          </Badge>
          
          <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-8 leading-tight tracking-tight">
            {t('heroTitlePrefix')}{' '}
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              {t('heroTitleSuffix')}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            {t('heroSubtitle')}
          </p>

          <div className="max-w-3xl mx-auto mb-10 shadow-2xl rounded-2xl overflow-hidden animate-slide-up">
            <SearchBar className="p-2" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/tools">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-8 rounded-2xl shadow-xl shadow-blue-200 transition-all hover:scale-105 active:scale-95">
                {t('exploreAllTools')}
                <ArrowRightIcon className="ml-2 w-6 h-6" />
              </Button>
            </Link>
            <Link href="/submit">
              <Button size="lg" variant="outline" className="border-2 border-gray-200 bg-white/50 backdrop-blur-sm text-gray-800 hover:bg-white hover:border-blue-600 hover:text-blue-600 text-lg px-10 py-8 rounded-2xl transition-all">
                {t('submitYourProject')}
              </Button>
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
              <div className="text-4xl font-black text-gray-900 mb-1">700+</div>
              <div className="text-gray-500 font-medium">{t('aiApps')}</div>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform bg-white border border-indigo-100 shadow-sm">
                <LayoutGridIcon className="w-8 h-8 text-indigo-600" />
              </div>
              <div className="text-4xl font-black text-gray-900 mb-1">{categories.length}+</div>
              <div className="text-gray-500 font-medium">{t('categories')}</div>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform bg-white border border-green-100 shadow-sm">
                <ZapIcon className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-4xl font-black text-gray-900 mb-1">10k+</div>
              <div className="text-gray-500 font-medium">{t('monthlyVisits')}</div>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 rounded-2xl bg-yellow-50 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform bg-white border border-yellow-100 shadow-sm">
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="text-4xl font-black text-gray-900 mb-1">#1</div>
              <div className="text-gray-500 font-medium">{t('freeDirectory')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-3">{t('featuredInnovation')}</h2>
              <p className="text-xl text-gray-500 font-medium">{t('featuredSubtitle')}</p>
            </div>
            <Link href="/tools?featured=true">
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
            <Link href="/tools?sort=trending">
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
            <Link href="/categories">
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
              <Link href="/tools?sort=newest">
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 rounded-xl px-8">
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
            <Link href="/submit">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-12 py-9 rounded-2xl shadow-2xl shadow-blue-500/20 transition-all font-black">
                {t('submitTool')}
                <ArrowRightIcon className="ml-4 w-7 h-7" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
