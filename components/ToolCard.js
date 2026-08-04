'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, TrendingUp, ExternalLink, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalizedPricing, getLocalizedBadge, getLocalizedDescription } from '@/lib/languages';

export default function ToolCard({ tool }) {
  const isFree = tool.pricing === 'Free';
  const { currentLang, t, getLangUrl } = useLanguage();
  const detailLink = getLangUrl(`/tools/${tool.slug}`);
  const localizedInfo = getLocalizedDescription(tool, currentLang);
  const localizedPricing = getLocalizedPricing(tool.pricing, currentLang);
  
  return (
    <Card className="group relative overflow-hidden bg-white border border-slate-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 flex flex-col h-full rounded-2xl">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent -mr-16 -mt-16 rounded-full group-hover:scale-150 transition-transform duration-700 opacity-50" />

      {/* Badge Overlays */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {tool.featured && (
          <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200 transition-colors px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold">
            {getLocalizedBadge('Featured', currentLang)}
          </Badge>
        )}
        {tool.trending && (
          <Badge className="bg-blue-600 text-white border-transparent hover:bg-blue-700 transition-colors flex items-center gap-1 px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold">
            <TrendingUp className="w-2.5 h-2.5" /> {getLocalizedBadge('Trending', currentLang)}
          </Badge>
        )}
      </div>

      <Link href={detailLink} className="flex-grow">
        <CardHeader className="pt-8 pb-4 relative">
          <div className="flex items-start gap-5">
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-50 flex-shrink-0 border border-slate-100 shadow-sm group-hover:shadow-md transition-all duration-300">
              <img
                src={tool.logo || '/placeholder-logo.png'}
                alt={tool.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-2">
                {tool.name}
              </CardTitle>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-bold text-slate-700">{tool.rating || '0.0'}</span>
                </div>
                <span className="text-xs font-medium text-slate-400">
                  {tool.votes || 0} {t('reviews')}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pb-4">
          <CardDescription className="text-slate-600 line-clamp-2 text-sm leading-relaxed min-h-[40px]">
            {localizedInfo.shortDescription}
          </CardDescription>
          
          <div className="flex flex-wrap gap-2 mt-5">
            {tool.categories?.slice(0, 2).map((cat) => (
              <span key={cat} className="text-[11px] font-semibold text-slate-500 bg-slate-100/50 px-2 py-1 rounded-md capitalize">
                {cat.replace('-', ' ')}
              </span>
            ))}
          </div>
        </CardContent>
      </Link>

      <CardFooter className="mt-auto pt-4 pb-6 px-6 border-t border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-black uppercase tracking-tighter px-2 py-1 rounded ${
            isFree ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'
          }`}>
            {localizedPricing}
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="w-9 h-9 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50"
            onClick={(e) => {
              e.preventDefault();
              window.open(tool.website, '_blank');
            }}
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
          <Link href={detailLink}>
            <Button
              variant="secondary"
              size="sm"
              className="rounded-xl font-bold text-xs bg-slate-900 text-white hover:bg-blue-600 hover:text-white transition-all shadow-lg shadow-slate-200"
            >
              Details
            </Button>
          </Link>
        </div>
      </CardFooter>
      
      {/* Interactive border element */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </Card>
  );
}