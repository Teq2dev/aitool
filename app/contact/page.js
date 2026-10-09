import Breadcrumbs from '@/components/seo/Breadcrumbs';
import ContactForm from '@/components/contact/ContactForm';

const BASE_URL = 'https://www.bestaitoolsfree.com';

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const lang = params?.lang || 'en';
  const canonicalUrl = lang === 'en' ? `${BASE_URL}/contact` : `${BASE_URL}/${lang}/contact`;

  return {
    title: {
      absolute: 'Contact Us | BestAIToolsFree',
    },
    description: "Have a question, suggestion, or feedback? Send us a message and the BestAIToolsFree team will get back to you.",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': `${BASE_URL}/contact`,
        en: `${BASE_URL}/contact`,
        es: `${BASE_URL}/es/contact`,
        fr: `${BASE_URL}/fr/contact`,
        de: `${BASE_URL}/de/contact`,
        pt: `${BASE_URL}/pt/contact`,
        ar: `${BASE_URL}/ar/contact`,
        ru: `${BASE_URL}/ru/contact`,
        ja: `${BASE_URL}/ja/contact`,
        zh: `${BASE_URL}/zh/contact`,
        it: `${BASE_URL}/it/contact`,
        nl: `${BASE_URL}/nl/contact`,
      },
    },
    openGraph: {
      title: 'Contact Us | BestAIToolsFree',
      description: "Have a question, suggestion, or feedback? Send us a message and we'll get back to you.",
      url: canonicalUrl,
      siteName: 'BestAIToolsFree',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: 'Contact Us | BestAIToolsFree',
      description: "Have a question, suggestion, or feedback? Send us a message and we'll get back to you.",
    },
  };
}

export default async function ContactPage({ searchParams }) {
  const params = await searchParams;
  const lang = params?.lang || 'en';
  const isRtl = lang === 'ar';

  const breadcrumbData = [
    { label: 'Home', href: lang === 'en' ? '/' : `/${lang}` },
    { label: 'Contact Us' },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Us | BestAIToolsFree',
    description: "Have a question, suggestion, or feedback? Send us a message and we'll get back to you.",
    url: `${BASE_URL}/contact`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: BASE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Contact Us',
          item: `${BASE_URL}/contact`,
        },
      ],
    },
  };

  return (
    <div
      className={`bg-slate-50 min-h-screen py-8 sm:py-12 ${isRtl ? 'rtl' : 'ltr'}`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs data={breadcrumbData} />

        <div className="mt-6 mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Contact Us
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
            Have a question, suggestion, or feedback? Send us a message and we&apos;ll get back to you.
          </p>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
