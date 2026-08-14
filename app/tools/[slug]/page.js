import { Suspense } from 'react';
import { unstable_cache } from 'next/cache';
import { getToolBySlug, getTools } from '@/lib/getTools';
import { getSimilarTools } from '@/lib/similarTools';
import { getRelatedBlogs, getRelatedCategories } from '@/lib/internalLinks';
import ToolDetailClient from './ToolDetailClient';
import { notFound } from 'next/navigation';

import { getLocalizedDescription, TRANSLATIONS } from '@/lib/languages';

export async function generateMetadata({ params, searchParams }) {
  const tool = await getToolBySlug(params.slug);
  const lang = searchParams?.lang || 'en';
  
  if (!tool) {
    return {
      title: 'Tool Not Found',
    };
  }

  const categoryName = tool.categories?.[0] ? tool.categories[0].replace(/-/g, ' ') : 'AI';
  
  // Localized SEO Tags
  const localizedInfo = getLocalizedDescription(tool, lang);
  const translationOverride = tool.translations?.[lang] || {};
  const localizedDesc = translationOverride.fullDescription 
    ? translationOverride.fullDescription.substring(0, 160) 
    : (localizedInfo.description || tool.shortDescription || '').substring(0, 160);
  const baseTitle = `${tool.name} Review & Alternatives (2026) - Best Free ${categoryName} AI Tool`;
  const title = translationOverride.title || baseTitle;
  const description = localizedDesc;
  const baseUrl = 'https://www.bestaitoolsfree.com';
  const canonicalPath = lang === 'en' ? `/tools/${tool.slug}` : `/${lang}/tools/${tool.slug}`;
  const url = `${baseUrl}${canonicalPath}`;

  const robots = tool.contentStatus === 'draft' ? { index: false, follow: false } : undefined;

  return {
    title,
    description,
    robots,
    alternates: {
      canonical: url,
      languages: {
        'x-default': `${baseUrl}/tools/${tool.slug}`,
        'en': `${baseUrl}/tools/${tool.slug}`,
        'es': `${baseUrl}/es/tools/${tool.slug}`,
        'fr': `${baseUrl}/fr/tools/${tool.slug}`,
        'de': `${baseUrl}/de/tools/${tool.slug}`,
        'pt': `${baseUrl}/pt/tools/${tool.slug}`,
        'ar': `${baseUrl}/ar/tools/${tool.slug}`,
        'ru': `${baseUrl}/ru/tools/${tool.slug}`,
        'ja': `${baseUrl}/ja/tools/${tool.slug}`,
        'zh': `${baseUrl}/zh/tools/${tool.slug}`,
        'it': `${baseUrl}/it/tools/${tool.slug}`,
        'nl': `${baseUrl}/nl/tools/${tool.slug}`,
      }
    },
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: tool.logo,
          width: 800,
          height: 800,
          alt: tool.name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [tool.logo],
    },
  };
}

export default async function ToolPage({ params, searchParams }) {
  const tool = await getToolBySlug(params.slug);
  const lang = searchParams?.lang || 'en';

  if (!tool) {
    return notFound();
  }

  // Fetch all related data concurrently for faster loading and better SEO
  // unstable_cache is keyed per slug to avoid cross-tool cache pollution
  const getCachedSimilar = unstable_cache(
    () => getSimilarTools(tool.slug, 5, 3),
    [`getSimilarTools-${tool.slug}`],
    { revalidate: 300, tags: ['tools'] }
  );
  const [{ strongSimilar, relatedTools }, relatedBlogs, relatedCats] = await Promise.all([
    getCachedSimilar(),
    getRelatedBlogs(tool.slug),
    getRelatedCategories(tool.categories?.[0] || tool.slug),
  ]);
  
  const primaryCategory = tool.categories?.[0] || 'general';
  const baseUrl = 'https://www.bestaitoolsfree.com';
  const canonicalPath = lang === 'en' ? `/tools/${tool.slug}` : `/${lang}/tools/${tool.slug}`;

  // Localized Info
  const localizedInfo = getLocalizedDescription(tool, lang);
  const translationOverride = tool.translations?.[lang] || {};
  const displayFullDescription = translationOverride.fullDescription || localizedInfo.description || tool.shortDescription;
  
  let displayFaqs = tool.faqs;
  if (lang !== 'en' && translationOverride.faqs && translationOverride.faqs.length > 0) {
    displayFaqs = translationOverride.faqs;
  }

  // Server-rendered Graph Schema for Rich Snippets (Star Ratings, Breadcrumbs, FAQs)
  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: tool.name,
        description: displayFullDescription,
        url: `${baseUrl}${canonicalPath}`,
        applicationCategory: 'AI Tool',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: tool.pricing === 'Free' ? '0' : undefined,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: tool.rating || 4.5,
          ratingCount: tool.votes || 12,
          bestRating: 5,
          worstRating: 1
        },
        image: tool.logo,
        author: {
          '@type': 'Organization',
          name: 'Best AI Tools Free'
        }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: baseUrl
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Tools',
            item: `${baseUrl}/tools`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: primaryCategory.replace(/-/g, ' '),
            item: `${baseUrl}/tools?category=${encodeURIComponent(primaryCategory)}`
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: tool.name,
            item: `${baseUrl}/tools/${tool.slug}`
          }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: displayFaqs && displayFaqs.length > 0 ? displayFaqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        })) : [
          {
            '@type': 'Question',
            name: `Is ${tool.name} free to use?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${tool.name} is available as a ${tool.pricing || 'Free'} AI tool. Discover full pricing options, features, and user reviews on Best AI Tools Free.`
            }
          },
          {
            '@type': 'Question',
            name: `What is ${tool.name} best used for?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${tool.name} is designed for ${primaryCategory.replace(/-/g, ' ')} tasks, offering automated AI workflows and intuitive features.`
            }
          }
        ]
      }
    ]
  };

  const getLangUrl = (path) => lang === 'en' ? path : `/${lang}${path}`;
  const t = (key) => TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en']?.[key] || key;

  const breadcrumbData = [
    { label: t('home'), href: getLangUrl('/') },
    { label: t('tools'), href: getLangUrl('/tools') },
    { label: primaryCategory.replace(/-/g, ' '), href: getLangUrl(`/tools?category=${encodeURIComponent(primaryCategory)}`), capitalize: true },
    { label: tool.name }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />
      <ToolDetailClient 
        initialTool={tool} 
        initialStrongSimilar={strongSimilar}
        initialRelatedTools={relatedTools} 
        initialLang={lang}
        relatedBlogs={relatedBlogs}
        relatedCats={relatedCats}
        breadcrumbData={breadcrumbData}
      />
    </>
  );
}
