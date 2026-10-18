'use client';

import { ExternalLink, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalizedDescription } from '@/lib/languages';
import ToolLogo from '@/components/ToolLogo';

export default function HomeToolCard({ tool, rank, badge, variant = 'default' }) {
  const isFree = tool.pricing === 'Free';
  const { currentLang, t, getLangUrl } = useLanguage();
  const detailLink = getLangUrl(`/tools/${tool.slug}`);
  const localizedInfo = getLocalizedDescription(tool, currentLang);
  
  const localizedPricing = isFree 
    ? t('pricingFree') 
    : tool.pricing === 'Freemium' 
      ? t('pricingFreemium') 
      : tool.pricing === 'Paid' 
        ? t('pricingPaid') 
        : (tool.pricing || '—');

  const primaryCategory = Array.isArray(tool.categories) && tool.categories.length > 0 
    ? tool.categories[0] 
    : null;

  return (
    <div className={`group relative bg-white border rounded-2xl shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col h-full overflow-hidden hover:-translate-y-1 ${
      variant === 'trending' 
        ? 'border-slate-200 hover:border-rose-400' 
        : variant === 'popular'
          ? 'border-slate-200 hover:border-[#4338CA]'
          : 'border-[#E2E8F0] hover:border-[#4338CA]'
    }`}>
      {/* Top Accent Line on Hover */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        variant === 'trending'
          ? 'bg-gradient-to-r from-rose-500 to-amber-500'
          : 'bg-gradient-to-r from-[#4338CA] to-[#06B6D4]'
      }`} />

      {/* Main Card Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Header: Logo, Name, Category + Rank/Badge */}
        <div className="flex items-start gap-3.5 mb-3">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-slate-50 flex-shrink-0 border border-slate-100 shadow-2xs group-hover:scale-105 transition-transform duration-300">
            <ToolLogo
              src={tool.logo}
              alt={`${tool.name} logo`}
              name={tool.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1.5">
              <Link href={detailLink} className="block truncate">
                <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#4338CA] transition-colors truncate">
                  {tool.name}
                </h3>
              </Link>
              {rank && (
                <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-[#EEF2FF] text-[#4338CA] border border-[rgba(67,56,202,0.15)] flex-shrink-0">
                  #{rank}
                </span>
              )}
              {badge && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 flex-shrink-0">
                  {badge}
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5 mt-1">
              {primaryCategory && (
                <span className="text-[10px] font-semibold text-[#4338CA] bg-[#EEF2FF] px-2 py-0.5 rounded-md capitalize">
                  {primaryCategory.replace(/-/g, ' ')}
                </span>
              )}
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                isFree 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                  : 'bg-slate-100 text-slate-700 border border-slate-200'
              }`}>
                {localizedPricing}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-[13px] text-[#64748B] line-clamp-2 leading-relaxed flex-1 mb-4">
          {localizedInfo.shortDescription || localizedInfo.description || tool.shortDescription || tool.description}
        </p>

        {/* Action Controls */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 mt-auto">
          {tool.website ? (
            <button
              type="button"
              aria-label={`Visit ${tool.name} official website (opens in new tab)`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] hover:text-[#4338CA] transition-colors py-1 px-1.5 rounded-lg hover:bg-slate-50 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                window.open(tool.website, '_blank', 'noopener,noreferrer');
              }}
            >
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Website</span>
            </button>
          ) : (
            <div />
          )}

          <Link
            href={detailLink}
            aria-label={`View details and guide for ${tool.name}`}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#0F172A] hover:bg-[#4338CA] text-white text-xs font-semibold transition-all shadow-2xs group-hover:shadow-sm"
          >
            <span>{t('details') || 'Details'}</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
