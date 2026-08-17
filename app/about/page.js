import Breadcrumbs from '@/components/seo/Breadcrumbs';
import Link from 'next/link';
import staticTranslations from '@/lib/static-page-translations.json';

export async function generateMetadata({ searchParams }) {
  const lang = searchParams?.lang || 'en';
  const t = staticTranslations[lang]?.about || staticTranslations.en.about;
  const baseUrl = 'https://www.bestaitoolsfree.com';
  const canonicalUrl = lang === 'en' ? `${baseUrl}/about` : `${baseUrl}/${lang}/about`;

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': `${baseUrl}/about`,
        'en': `${baseUrl}/about`,
        'es': `${baseUrl}/es/about`,
        'fr': `${baseUrl}/fr/about`,
        'de': `${baseUrl}/de/about`,
        'pt': `${baseUrl}/pt/about`,
        'ar': `${baseUrl}/ar/about`,
        'ru': `${baseUrl}/ru/about`,
        'ja': `${baseUrl}/ja/about`,
        'zh': `${baseUrl}/zh/about`,
        'it': `${baseUrl}/it/about`,
        'nl': `${baseUrl}/nl/about`,
      }
    },
  };
}

export default function AboutPage({ searchParams }) {
  const lang = searchParams?.lang || 'en';
  const t = staticTranslations[lang]?.about || staticTranslations.en.about;
  const isRtl = lang === 'ar';

  const breadcrumbData = [
    { label: lang === 'en' ? 'Home' : (staticTranslations[lang]?.about?.h1 ? 'Home' : 'Home'), href: lang === 'en' ? '/' : `/${lang}` },
    { label: t.metaTitle.split('|')[0].trim() }
  ];

  return (
    <div className={`bg-gray-50 min-h-screen py-12 ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs data={breadcrumbData} />
        
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-200 mt-6 space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              {t.h1}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              {t.lead}
            </p>
          </div>

          <div className="border-t border-gray-100 pt-6 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">{t.missionTitle}</h2>
            <p className="text-slate-600 leading-relaxed">
              {t.missionP1}
            </p>
            <p className="text-slate-600 leading-relaxed">
              {t.missionP2}
            </p>
          </div>

          <div className="border-t border-gray-100 pt-6 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">{t.offerTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                <h3 className="font-bold text-blue-950 mb-1">🔍 {t.card1Title}</h3>
                <p className="text-sm text-slate-600">{t.card1Desc}</p>
              </div>
              <div className="p-4 bg-green-50/50 rounded-xl border border-green-100">
                <h3 className="font-bold text-green-950 mb-1">💰 {t.card2Title}</h3>
                <p className="text-sm text-slate-600">{t.card2Desc}</p>
              </div>
              <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-100">
                <h3 className="font-bold text-purple-950 mb-1">🌍 {t.card3Title}</h3>
                <p className="text-sm text-slate-600">{t.card3Desc}</p>
              </div>
              <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                <h3 className="font-bold text-amber-950 mb-1">🚀 {t.card4Title}</h3>
                <p className="text-sm text-slate-600">{t.card4Desc}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900">{t.ctaTitle}</h3>
              <p className="text-sm text-slate-500">{t.ctaDesc}</p>
            </div>
            <Link 
              href={lang === 'en' ? '/submit' : `/${lang}/submit`} 
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-colors"
            >
              {t.ctaBtn}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
