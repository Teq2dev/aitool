import Breadcrumbs from '@/components/seo/Breadcrumbs';
import staticTranslations from '@/lib/static-page-translations.json';

export async function generateMetadata({ searchParams }) {
  const lang = searchParams?.lang || 'en';
  const t = staticTranslations[lang]?.terms || staticTranslations.en.terms;
  const baseUrl = 'https://www.bestaitoolsfree.com';
  const canonicalUrl = lang === 'en' ? `${baseUrl}/terms` : `${baseUrl}/${lang}/terms`;

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': `${baseUrl}/terms`,
        'en': `${baseUrl}/terms`,
        'es': `${baseUrl}/es/terms`,
        'fr': `${baseUrl}/fr/terms`,
        'de': `${baseUrl}/de/terms`,
        'pt': `${baseUrl}/pt/terms`,
        'ar': `${baseUrl}/ar/terms`,
        'ru': `${baseUrl}/ru/terms`,
        'ja': `${baseUrl}/ja/terms`,
        'zh': `${baseUrl}/zh/terms`,
        'it': `${baseUrl}/it/terms`,
        'nl': `${baseUrl}/nl/terms`,
      }
    },
  };
}

export default function TermsPage({ searchParams }) {
  const lang = searchParams?.lang || 'en';
  const t = staticTranslations[lang]?.terms || staticTranslations.en.terms;
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
            <p className="text-sm text-slate-500">{t.effectiveDate}</p>
          </div>

          <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">{t.sec1Title}</h2>
              <p>{t.sec1P}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">{t.sec2Title}</h2>
              <p>{t.sec2P1}</p>
              <p>{t.sec2P2}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">{t.sec3Title}</h2>
              <p>{t.sec3P1}</p>
              <p>{t.sec3P2}</p>
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
