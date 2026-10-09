import { notFound } from 'next/navigation';
import {
  CALCULATORS_LIST,
  getCalculatorBySlug,
  getRelatedCalculators
} from '@/lib/calculatorData';
import { getLocalizedCalculatorData } from '@/lib/calculators/seo';
import { generateCalculatorSchemas } from '@/lib/calculatorSchemaHelper';
import CalculatorBreadcrumb from '@/components/calculators/shared/CalculatorBreadcrumb';
import CalculatorContentSection from '@/components/calculators/shared/CalculatorContentSection';
import RelatedCalculators from '@/components/calculators/shared/RelatedCalculators';
import CalculatorDispatcher from '@/components/calculators/CalculatorDispatcher';
import { Sparkles } from 'lucide-react';

const BASE_URL = 'https://www.bestaitoolsfree.com';

export async function generateStaticParams() {
  return CALCULATORS_LIST.map((c) => ({
    slug: c.slug
  }));
}

export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  const sParams = await searchParams;
  const lang = sParams?.lang || 'en';
  const calc = getLocalizedCalculatorData(slug, lang) || getCalculatorBySlug(slug);

  if (!calc) {
    return {
      title: 'Calculator Not Found | Best AI Tools Free',
      description: 'The requested calculator could not be found.'
    };
  }

  const langPrefix = lang === 'en' ? '' : `/${lang}`;
  const canonicalUrl = `${BASE_URL}${langPrefix}/calculators/${calc.slug}`;

  const languages = {
    'x-default': `${BASE_URL}/calculators/${calc.slug}`,
    'en': `${BASE_URL}/calculators/${calc.slug}`,
    'es': `${BASE_URL}/es/calculators/${calc.slug}`,
    'fr': `${BASE_URL}/fr/calculators/${calc.slug}`,
    'de': `${BASE_URL}/de/calculators/${calc.slug}`,
    'pt': `${BASE_URL}/pt/calculators/${calc.slug}`,
    'ar': `${BASE_URL}/ar/calculators/${calc.slug}`,
    'ru': `${BASE_URL}/ru/calculators/${calc.slug}`,
    'ja': `${BASE_URL}/ja/calculators/${calc.slug}`,
    'zh': `${BASE_URL}/zh/calculators/${calc.slug}`,
    'it': `${BASE_URL}/it/calculators/${calc.slug}`,
    'nl': `${BASE_URL}/nl/calculators/${calc.slug}`
  };

  return {
    title: calc.seoTitle,
    description: calc.seoDescription,
    alternates: {
      canonical: canonicalUrl,
      languages
    },
    openGraph: {
      title: calc.seoTitle,
      description: calc.seoDescription,
      url: canonicalUrl,
      type: 'website',
      siteName: 'Best AI Tools Free',
      locale: lang === 'en' ? 'en_US' : `${lang}_${lang.toUpperCase()}`
    },
    twitter: {
      card: 'summary_large_image',
      title: calc.seoTitle,
      description: calc.seoDescription
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    }
  };
}

export default async function CalculatorDetailPage({ params, searchParams }) {
  const { slug } = await params;
  const sParams = await searchParams;
  const lang = sParams?.lang || 'en';

  const calc = getLocalizedCalculatorData(slug, lang) || getCalculatorBySlug(slug);
  if (!calc) {
    notFound();
  }

  const related = getRelatedCalculators(calc.slug);
  const schemas = generateCalculatorSchemas(calc, lang);
  const isRtl = lang === 'ar';

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl" dir={isRtl ? 'rtl' : 'ltr'}>
        {/* Localized Breadcrumb */}
        <CalculatorBreadcrumb items={[{ label: calc.breadcrumbName || calc.name }]} lang={lang} />

        {/* Hero Header */}
        <div className="text-center mb-8 md:mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-50 border border-blue-200/80 text-blue-700 rounded-full text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>{calc.badge || 'Free Online Calculator'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
            {calc.h1}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {calc.heroSubtitle}
          </p>
        </div>

        {/* Interactive Calculator Workspace */}
        <div className="shadow-xs rounded-2xl" dir="ltr">
          <CalculatorDispatcher slug={calc.slug} />
        </div>

        {/* Server-Rendered Educational SEO Content */}
        <CalculatorContentSection data={calc} />

        {/* Related Calculators Grid */}
        <RelatedCalculators calculators={related} />
      </div>
    </>
  );
}
