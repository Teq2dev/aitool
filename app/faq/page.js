import Breadcrumbs from '@/components/seo/Breadcrumbs';
import Link from 'next/link';
import staticTranslations from '@/lib/static-page-translations.json';

export async function generateMetadata({ searchParams }) {
  const lang = searchParams?.lang || 'en';
  const t = staticTranslations[lang]?.faq || staticTranslations.en.faq;
  const baseUrl = 'https://www.bestaitoolsfree.com';
  const canonicalUrl = lang === 'en' ? `${baseUrl}/faq` : `${baseUrl}/${lang}/faq`;

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': `${baseUrl}/faq`,
        'en': `${baseUrl}/faq`,
        'es': `${baseUrl}/es/faq`,
        'fr': `${baseUrl}/fr/faq`,
        'de': `${baseUrl}/de/faq`,
        'pt': `${baseUrl}/pt/faq`,
        'ar': `${baseUrl}/ar/faq`,
        'ru': `${baseUrl}/ru/faq`,
        'ja': `${baseUrl}/ja/faq`,
        'zh': `${baseUrl}/zh/faq`,
        'it': `${baseUrl}/it/faq`,
        'nl': `${baseUrl}/nl/faq`,
      }
    },
  };
}

export default function FAQPage({ searchParams }) {
  const lang = searchParams?.lang || 'en';
  const t = staticTranslations[lang]?.faq || staticTranslations.en.faq;
  const isRtl = lang === 'ar';

  const breadcrumbData = [
    { label: 'Home', href: lang === 'en' ? '/' : `/${lang}` },
    { label: t.h1 }
  ];

  const faqs = t.items || staticTranslations.en.faq.items;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  return (
    <div className={`bg-gray-50 min-h-screen py-12 ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs data={breadcrumbData} />
        
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-200 mt-6 space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
              {t.h1}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              {t.lead}
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6 bg-gray-50/70 rounded-xl border border-gray-200">
                <h2 className="text-lg font-bold text-slate-900 mb-2">
                  {faq.question}
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900">{t.ctaTitle}</h3>
              <p className="text-sm text-slate-500">{t.ctaDesc}</p>
            </div>
            <Link 
              href={lang === 'en' ? '/contact' : `/${lang}/contact`} 
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
