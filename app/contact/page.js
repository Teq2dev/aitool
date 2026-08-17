import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { Mail, MessageSquare, HelpCircle, Send } from 'lucide-react';
import Link from 'next/link';
import staticTranslations from '@/lib/static-page-translations.json';

export async function generateMetadata({ searchParams }) {
  const lang = searchParams?.lang || 'en';
  const t = staticTranslations[lang]?.contact || staticTranslations.en.contact;
  const baseUrl = 'https://www.bestaitoolsfree.com';
  const canonicalUrl = lang === 'en' ? `${baseUrl}/contact` : `${baseUrl}/${lang}/contact`;

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': `${baseUrl}/contact`,
        'en': `${baseUrl}/contact`,
        'es': `${baseUrl}/es/contact`,
        'fr': `${baseUrl}/fr/contact`,
        'de': `${baseUrl}/de/contact`,
        'pt': `${baseUrl}/pt/contact`,
        'ar': `${baseUrl}/ar/contact`,
        'ru': `${baseUrl}/ru/contact`,
        'ja': `${baseUrl}/ja/contact`,
        'zh': `${baseUrl}/zh/contact`,
        'it': `${baseUrl}/it/contact`,
        'nl': `${baseUrl}/nl/contact`,
      }
    },
  };
}

export default function ContactPage({ searchParams }) {
  const lang = searchParams?.lang || 'en';
  const t = staticTranslations[lang]?.contact || staticTranslations.en.contact;
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
            <p className="text-lg text-slate-600 leading-relaxed">
              {t.lead}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                  <Mail className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">{t.card1Title}</h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {t.card1Desc}
                </p>
              </div>
              <a 
                href="mailto:contact@bestaitoolsfree.com" 
                className="text-blue-600 font-bold hover:underline text-lg break-all"
              >
                contact@bestaitoolsfree.com
              </a>
            </div>

            <div className="p-6 bg-purple-50/50 rounded-2xl border border-purple-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-purple-600 text-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">{t.card2Title}</h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {t.card2Desc}
                </p>
              </div>
              <Link 
                href={lang === 'en' ? '/submit' : `/${lang}/submit`} 
                className="inline-flex items-center justify-center px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm"
              >
                <Send className="w-4 h-4 mr-2" /> {t.card2Btn}
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              {t.faqHeader}
            </h2>
            <div className="space-y-4 text-sm text-slate-600">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <h3 className="font-bold text-slate-900 mb-1">{t.q1}</h3>
                <p>{t.a1}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <h3 className="font-bold text-slate-900 mb-1">{t.q2}</h3>
                <p>{t.a2}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
