import { Suspense } from 'react';
import { getCategories, getTools } from '@/lib/getTools';
import CategoryDetailClient from './CategoryDetailClient';
import { notFound } from 'next/navigation';

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
  const displayDescription = translationOverride.longDescription || translationOverride.description || category.longDescription || category.description;

  const title = `Best Free ${displayName} Tools & Software (2026)`;
  const description = displayDescription ? displayDescription.substring(0, 160) : '';
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

export default async function CategoryPage({ params }) {
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
  
  const tools = categoryToolsData.tools || [];
  
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
        name: `Best Free ${category.name} Tools`,
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />
      <Suspense fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
        <CategoryDetailClient 
          category={category} 
          popularTools={popularTools}
          freeTools={freeTools}
          newTools={newTools}
          allTools={tools}
        />
      </Suspense>
    </>
  );
}
