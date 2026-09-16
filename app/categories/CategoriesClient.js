'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { getCategoryVisuals } from '@/lib/categoryIcons';
import { ChevronRight, Sparkles, Grid } from 'lucide-react';

export default function CategoriesClient({ initialCategories = [] }) {
  const { getLangUrl } = useLanguage();
  const safeCategories = Array.isArray(initialCategories) ? initialCategories : [];

  // Calculate total tool count across all categories
  const totalTools = safeCategories.reduce(
    (sum, c) => sum + (c.toolCount || c.count || 0),
    0
  );

  return (
    <div className="w-full">
      {/* ========================================== */}
      {/* 1. HERO SECTION                            */}
      {/* ========================================== */}
      <section className="relative overflow-hidden bg-slate-900 text-white rounded-3xl mb-10 p-6 sm:p-10 md:p-14 shadow-2xl border border-slate-800">
        {/* Subtle Background Glow Elements */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>EXPLORE BY CATEGORY</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Find the Right AI Tool for{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
              Every Need
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            Browse{' '}
            <span className="font-semibold text-white">
              {safeCategories.length} curated categories
            </span>{' '}
            featuring{' '}
            <span className="font-semibold text-white">
              {totalTools.toLocaleString()}+ hand-picked AI tools
            </span>
            . Discover, compare, and supercharge your workflow.
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-lg mx-auto pt-2 border-t border-slate-800/80 text-center">
            <div className="p-2">
              <div className="text-xl sm:text-2xl font-bold text-white">
                {safeCategories.length}
              </div>
              <div className="text-xs text-slate-400 font-medium">Categories</div>
            </div>
            <div className="p-2 border-x border-slate-800/80">
              <div className="text-xl sm:text-2xl font-bold text-white">
                {totalTools.toLocaleString()}+
              </div>
              <div className="text-xs text-slate-400 font-medium">AI Tools</div>
            </div>
            <div className="p-2">
              <div className="text-xl sm:text-2xl font-bold text-white">100%</div>
              <div className="text-xs text-slate-400 font-medium">Verified Free</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 2. CATEGORY SECTION HEADER                 */}
      {/* ========================================== */}
      <div className="max-w-6xl mx-auto mb-6 px-1 sm:px-0 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            All Categories
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Explore {safeCategories.length} specialized topics, tasks, and roles
          </p>
        </div>
        <span className="px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold text-xs border border-blue-100 dark:border-blue-900/40">
          {safeCategories.length} Categories
        </span>
      </div>

      {/* ========================================== */}
      {/* 3. CATEGORY GRID SECTION                   */}
      {/* ========================================== */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
          {/* Featured "All Tools Catalog" Entry Card */}
          <Link
            href={getLangUrl('/tools')}
            className="group relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl border border-indigo-800/50 p-5 shadow-lg hover:shadow-2xl hover:border-indigo-400/60 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer hover:-translate-y-1 h-full min-h-[160px]"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-300">
                  <Grid className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  All Directory
                </span>
              </div>

              <h3 className="font-extrabold text-white text-base group-hover:text-indigo-200 transition-colors">
                All AI Tools
              </h3>
              <p className="text-xs text-slate-300 mt-1 font-normal line-clamp-2">
                Browse entire catalog of {totalTools.toLocaleString()}+ verified AI solutions
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 mt-2 border-t border-indigo-900/60 text-xs font-semibold text-indigo-300 group-hover:text-white transition-colors">
              <span>Explore Catalog</span>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Render 43 Category Cards */}
          {safeCategories.map((category) => {
            const toolCount = category.toolCount || category.count || 0;
            const { Icon, theme } = getCategoryVisuals(category);

            return (
              <Link
                key={category._id || category.slug}
                href={getLangUrl(`/categories/${category.slug}`)}
                className={`group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm hover:shadow-xl ${theme.hoverBorder} transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden h-full min-h-[160px] hover:-translate-y-1`}
              >
                <div>
                  {/* Top Row: Icon Badge & Count Pill */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div
                      className={`w-11 h-11 rounded-xl ${theme.bg} ${theme.text} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-xs`}
                    >
                      <Icon className="w-5.5 h-5.5" />
                    </div>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${theme.badge} shrink-0 transition-colors`}
                    >
                      {toolCount} tools
                    </span>
                  </div>

                  {/* Category Title */}
                  <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-blue-600 transition-colors line-clamp-1">
                    {category.name}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-normal line-clamp-2 min-h-[2rem]">
                    {category.description ||
                      `Discover free ${category.name} AI tools and software.`}
                  </p>
                </div>

                {/* Bottom Row: Interaction Affordance */}
                <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-400 group-hover:text-blue-600 transition-colors">
                  <span>View Tools</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
