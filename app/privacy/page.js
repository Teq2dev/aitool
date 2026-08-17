import Breadcrumbs from '@/components/seo/Breadcrumbs';
import staticTranslations from '@/lib/static-page-translations.json';

export async function generateMetadata({ searchParams }) {
  const lang = searchParams?.lang || 'en';
  const t = staticTranslations[lang]?.privacy || staticTranslations.en.privacy;
  const baseUrl = 'https://www.bestaitoolsfree.com';
  const canonicalUrl = lang === 'en' ? `${baseUrl}/privacy` : `${baseUrl}/${lang}/privacy`;

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': `${baseUrl}/privacy`,
        'en': `${baseUrl}/privacy`,
        'es': `${baseUrl}/es/privacy`,
        'fr': `${baseUrl}/fr/privacy`,
        'de': `${baseUrl}/de/privacy`,
        'pt': `${baseUrl}/pt/privacy`,
        'ar': `${baseUrl}/ar/privacy`,
        'ru': `${baseUrl}/ru/privacy`,
        'ja': `${baseUrl}/ja/privacy`,
        'zh': `${baseUrl}/zh/privacy`,
        'it': `${baseUrl}/it/privacy`,
        'nl': `${baseUrl}/nl/privacy`,
      }
    },
  };
}

export default function PrivacyPage({ searchParams }) {
  const lang = searchParams?.lang || 'en';
  const t = staticTranslations[lang]?.privacy || staticTranslations.en.privacy;
  const isRtl = lang === 'ar';

  const breadcrumbData = [
    { label: 'Home', href: lang === 'en' ? '/' : `/${lang}` },
    { label: t.h1 }
  ];

  return (
    <div className={`bg-gray-50 min-h-screen py-12 ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs data={breadcrumbData} />
        
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-200 mt-6 space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
              {t.h1}
            </h1>
            <p className="text-sm text-slate-500">{t.lastUpdated}</p>
          </div>

          <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">{t.sec1Title}</h2>
              <p>{t.sec1P}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">{t.sec2Title}</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>{t.sec2L1}</li>
                <li>{t.sec2L2}</li>
                <li>{t.sec2L3}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">{t.sec3Title}</h2>
              <p>{t.sec3Lead}</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>{t.sec3L1}</li>
                <li>{t.sec3L2}</li>
                <li>{t.sec3L3}</li>
                <li>{t.sec3L4}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">{t.sec4Title}</h2>
              <p>{t.sec4P}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">{t.sec5Title}</h2>
              <p>{t.sec5P}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">{t.sec6Title}</h2>
              <p>{t.sec6P}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
