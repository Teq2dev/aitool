import { Suspense } from 'react';
import { getCategories, getTools } from '@/lib/getTools';
import { getRelatedCategories, getRelatedBlogs } from '@/lib/internalLinks';
import { serializeData } from '@/lib/utils';
import CategoryDetailClient from './CategoryDetailClient';
import { notFound } from 'next/navigation';
import { TRANSLATIONS } from '@/lib/languages';

// Strip HTML tags and decode basic entities for safe use in meta tags
function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]+>/g, ' ')          // Remove all HTML tags
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')              // Collapse whitespace
    .trim();
}

export async function generateMetadata({ params, searchParams }) {
  const allCategories = await getCategories();
  const category = allCategories.find(c => c.slug === params.slug);
  const lang = searchParams?.lang || 'en';
  
  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  const translationOverride = category.translations?.[lang] || {};
  const displayName = translationOverride.name || category.name;

  // Use the clean metaDescription field first; fall back to stripping HTML from longDescription.
  // This ensures the <meta name="description"> tag always contains plain text.
  const rawMetaDesc = translationOverride.metaDescription || category.metaDescription || null;
  const rawLongDesc = translationOverride.longDescription || translationOverride.description || category.longDescription || category.description || '';
  const description = rawMetaDesc
    ? stripHtml(rawMetaDesc).substring(0, 160)
    : stripHtml(rawLongDesc).substring(0, 160);

  // Option C: use the custom DB title; fall back to the template for any category without one.
  const titleFromDb = translationOverride.title || category.title || null;
  const title = titleFromDb || `Best Free ${displayName} Tools & Software (2026)`;
  const baseUrl = 'https://www.bestaitoolsfree.com';
  const canonicalPath = lang === 'en' ? `/categories/${category.slug}` : `/${lang}/categories/${category.slug}`;
  const url = `${baseUrl}${canonicalPath}`;

  const robots = category.contentStatus === 'draft' ? { index: false, follow: false } : undefined;

  return {
    title,
    description,
    robots,
    alternates: {
      canonical: url,
      languages: {
        'x-default': `${baseUrl}/categories/${category.slug}`,
        'en': `${baseUrl}/categories/${category.slug}`,
        'es': `${baseUrl}/es/categories/${category.slug}`,
        'fr': `${baseUrl}/fr/categories/${category.slug}`,
        'de': `${baseUrl}/de/categories/${category.slug}`,
        'pt': `${baseUrl}/pt/categories/${category.slug}`,
        'ar': `${baseUrl}/ar/categories/${category.slug}`,
        'ru': `${baseUrl}/ru/categories/${category.slug}`,
        'ja': `${baseUrl}/ja/categories/${category.slug}`,
        'zh': `${baseUrl}/zh/categories/${category.slug}`,
        'it': `${baseUrl}/it/categories/${category.slug}`,
        'nl': `${baseUrl}/nl/categories/${category.slug}`,
      }
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

export default async function CategoryPage({ params, searchParams }) {
  const lang = searchParams?.lang || 'en';
  const allCategories = await getCategories();
  const category = allCategories.find(c => c.slug === params.slug);

  if (!category) {
    notFound();
  }

  // Fetch tools for this category (Popular, Free, All)
  // Since getTools has a limit of 12 by default, we can fetch all or specific ones
  // We'll fetch all approved tools for this category (max 50 to segment)
  const categoryToolsData = await getTools({ 
    category: category.slug, 
    limit: 50 
  });
  
  // Trim tools to only the fields rendered by the category page and ToolCard
  const tools = (categoryToolsData.tools || []).map(t => ({
    _id: t._id,
    name: t.name,
    slug: t.slug,
    shortDescription: t.shortDescription || '',
    logo: t.logo || '',
    pricing: t.pricing || 'Free',
    rating: t.rating || 0,
    votes: t.votes || 0,
    website: t.website || '',
    featured: Boolean(t.featured),
    trending: Boolean(t.trending),
    categories: t.categories || [],
    createdAt: t.createdAt,
    translations: t.translations ? {
      [lang]: {
        shortDescription: t.translations[lang]?.shortDescription || ''
      }
    } : undefined
  }));

  const [relatedCats, relatedBlogs] = await Promise.all([getRelatedCategories(category.slug), getRelatedBlogs(category.slug)]);
  
  // Segment them
  const popularTools = [...tools].sort((a, b) => (b.votes || 0) - (a.votes || 0)).slice(0, 6);
  const freeTools = tools.filter(t => t.pricing?.toLowerCase() === 'free' || t.pricing?.toLowerCase() === 'freemium').slice(0, 6);
  const newTools = [...tools].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6);

  const baseUrl = 'https://www.bestaitoolsfree.com';

  // Server-rendered Graph Schema for Rich Snippets
  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: category.title || `Best Free ${category.name} Tools`,
        description: category.longDescription || category.description,
        url: `${baseUrl}/categories/${category.slug}`,
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
            name: 'Categories',
            item: `${baseUrl}/categories`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: category.name,
            item: `${baseUrl}/categories/${category.slug}`
          }
        ]
      }
    ]
  };

  // Add FAQs to JSON-LD if they exist
  if (category.faqs && category.faqs.length > 0) {
    jsonLdGraph['@graph'].push({
      '@type': 'FAQPage',
      mainEntity: category.faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    });
  }

  const lang = searchParams?.lang || 'en';
  const getLangUrl = (path) => lang === 'en' ? path : `/${lang}${path}`;
  const t = (key) => TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en']?.[key] || key;

  const breadcrumbData = [
    { label: t('home'), href: getLangUrl('/') },
    { label: t('categories'), href: getLangUrl('/categories') },
    { label: category.name }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />
      <CategoryDetailClient 
        category={serializeData(category)} 
        popularTools={popularTools}
        freeTools={freeTools}
        newTools={newTools}
        allTools={tools}
        relatedCats={relatedCats}
        relatedBlogs={relatedBlogs}
        breadcrumbData={breadcrumbData}
      />
    </>
  );
}
