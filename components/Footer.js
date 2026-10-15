'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer({ topCategories }) {
  const { getLangUrl, t } = useLanguage();

  return (
    <footer className="border-t bg-gray-50 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          <div className="sm:col-span-2 md:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <img src="/logo.png" alt="Best AI Tools Free logo" className="w-8 h-8 rounded-lg object-contain" />
              <span className="font-bold text-lg text-slate-900">Best AI Tools Free</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {t('footerSubtitle') || 'Your trusted platform for 100% private, in-browser online tools and over 1,400+ curated artificial intelligence applications.'}
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{t('freeInBrowserBadge') || '100% Free & In-Browser'}</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-slate-900 mb-5 uppercase tracking-wider text-xs">{t('freeOnlineTools') || 'Free Online Tools'}</h3>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li><Link href={getLangUrl('/image-compressor')} className="hover:text-blue-600 transition-colors">{t('imageCompressorTitle')}</Link></li>
              <li><Link href={getLangUrl('/merge-pdf')} className="hover:text-blue-600 transition-colors">{t('mergePdfTitle')}</Link></li>
              <li><Link href={getLangUrl('/image-converter')} className="hover:text-blue-600 transition-colors">{t('imageConverterTitle')}</Link></li>
              <li><Link href={getLangUrl('/calculators/emi-calculator')} className="hover:text-blue-600 transition-colors">{t('emiCalculatorTitle')}</Link></li>
              <li><Link href={getLangUrl('/calculators/age-calculator')} className="hover:text-blue-600 transition-colors">{t('ageCalculatorTitle')}</Link></li>
              <li><Link href={getLangUrl('/calculators/percentage-calculator')} className="hover:text-blue-600 transition-colors">{t('percentageCalculatorTitle')}</Link></li>
              <li><Link href={getLangUrl('/pdf-tools')} className="text-red-600 font-semibold hover:underline">{t('allPdfTools')}</Link></li>
              <li><Link href={getLangUrl('/image-tools')} className="text-blue-600 font-semibold hover:underline">{t('allImageTools')}</Link></li>
              <li><Link href={getLangUrl('/calculators')} className="text-emerald-600 font-semibold hover:underline">{t('allCalculatorsLink')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-5 uppercase tracking-wider text-xs">{t('topCategories')}</h3>
            <ul className="space-y-2.5 text-sm text-gray-600">
              {topCategories?.map(cat => (
                <li key={cat.slug}>
                  <Link href={getLangUrl(`/tools?category=${cat.slug}`)} className="hover:text-blue-600 transition-colors">
                    {cat.name} AI Tools
                  </Link>
                </li>
              ))}
              <li><Link href={getLangUrl('/categories')} className="text-blue-600 font-bold hover:underline">View All Categories →</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-5 uppercase tracking-wider text-xs">{t('quickLinks')}</h3>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li><Link href={getLangUrl('/tools')} className="hover:text-blue-600">Browse 1,400+ AI Tools</Link></li>
              <li><Link href={getLangUrl('/tools?sort=trending')} className="hover:text-blue-600">Trending AI Tools</Link></li>
              <li><Link href={getLangUrl('/blogs')} className="hover:text-blue-600">AI Blog & Guides</Link></li>
              <li><Link href={getLangUrl('/submit')} className="hover:text-blue-600">Submit Your AI Tool</Link></li>
              <li><Link href={getLangUrl('/events')} className="hover:text-blue-600 font-medium text-blue-600">AI Events & Conferences</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-slate-900 mb-5 uppercase tracking-wider text-xs">{t('legalInfo')}</h3>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li><Link href={getLangUrl('/about')} className="hover:text-blue-600">About Our Directory</Link></li>
              <li><Link href={getLangUrl('/contact')} className="hover:text-blue-600">Contact Us</Link></li>
              <li><Link href={getLangUrl('/privacy')} className="hover:text-blue-600">Privacy & Cookie Policy</Link></li>
              <li><Link href={getLangUrl('/terms')} className="hover:text-blue-600">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-sm text-gray-600">
          <p>© 2026 Best AI Tools Free. {t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
}
