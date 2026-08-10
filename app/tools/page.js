import { Suspense } from 'react';
import { getTools, getCategories } from '@/lib/getTools';
import ToolsClient from './ToolsClient';
import Script from 'next/script';

// Enable Next.js caching with revalidation
export const revalidate = 60; // Revalidate every 60 seconds

export async function generateMetadata({ searchParams }) {
  const category = searchParams?.category || '';
  const search = searchParams?.search || '';
  const baseUrl = 'https://www.bestaitoolsfree.com';
  
  let title = 'Browse 1000+ Best Free AI Tools Directory (2026) | Best AI Tools Free';
  let description = 'Discover and compare 1000+ curated free & freemium AI tools across writing, image generation, coding, audio, and productivity categories.';
  let url = `${baseUrl}/tools`;

  if (category) {
    const formattedCat = category.replace(/-/g, ' ');
    title = `15+ Best Free AI ${formattedCat.charAt(0).toUpperCase() + formattedCat.slice(1)} Tools (2026) - Best AI Directory`;
    description = `Explore top-rated free & paid AI ${formattedCat} tools in 2026. Compare key features, user ratings, and alternatives on Best AI Tools Free.`;
    url = `${baseUrl}/tools?category=${encodeURIComponent(category)}`;
  } else if (search) {
    title = `Search results for "${search}" - Best AI Tools Free`;
    url = `${baseUrl}/tools?search=${encodeURIComponent(search)}`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        'x-default': `${baseUrl}/tools`,
        'en': `${baseUrl}/tools`,
        'es': `${baseUrl}/es/tools`,
        'fr': `${baseUrl}/fr/tools`,
        'de': `${baseUrl}/de/tools`,
        'pt': `${baseUrl}/pt/tools`,
        'ar': `${baseUrl}/ar/tools`,
        'ru': `${baseUrl}/ru/tools`,
        'ja': `${baseUrl}/ja/tools`,
        'zh': `${baseUrl}/zh/tools`,
        'it': `${baseUrl}/it/tools`,
        'nl': `${baseUrl}/nl/tools`,
      }
    },
    openGraph: {
      title,
      description,
      url,
    },
    // Noindex search results to avoid 'thin content' flags from Google
    // but keep category pages indexed
    robots: search ? { index: false, follow: true } : undefined,
  };
}


// Server Component - fetches data before rendering
export default async function ToolsPage({ searchParams }) {
  // Extract search params
  const category = searchParams?.category || '';
  const search = searchParams?.search || '';
  const sort = searchParams?.sort || 'trending';
  const page = parseInt(searchParams?.page || '1');
  const limit = parseInt(searchParams?.limit || '40');

  // Fetch data on the server (parallel for better performance)
  const [toolsData, categories] = await Promise.all([
    getTools({ 
      category, 
      search, 
      sort, 
      page,
      limit: limit
    }),
    getCategories()
  ]);

  const baseUrl = 'https://www.bestaitoolsfree.com';

  // Schema for CollectionPage & Breadcrumbs
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: category ? `Best Free AI ${category.replace(/-/g, ' ')} Tools` : 'Browse AI Tools - Best Free AI Tools Directory',
        description: 'Discover curated free AI tools across multiple categories.',
        url: category ? `${baseUrl}/tools?category=${encodeURIComponent(category)}` : `${baseUrl}/tools`,
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: toolsData.total || 0,
          itemListElement: (toolsData.tools || []).slice(0, 10).map((tool, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'SoftwareApplication',
              name: tool.name,
              description: tool.shortDescription || tool.description,
              url: `${baseUrl}/tools/${tool.slug}`,
              applicationCategory: 'AI Tool',
              offers: {
                '@type': 'Offer',
                price: tool.pricing === 'Free' ? '0' : undefined,
                priceCurrency: 'USD'
              }
            }
          }))
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
          ...(category ? [{
            '@type': 'ListItem',
            position: 3,
            name: category.replace(/-/g, ' '),
            item: `${baseUrl}/tools?category=${encodeURIComponent(category)}`
          }] : [])
        ]
      }
    ]
  };

  // Handle error state
  if (toolsData.error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Unable to Load Tools</h1>
            <p className="text-gray-600 mb-4">There was an error loading the tools. Please try again later.</p>
            <p className="text-sm text-gray-500">{toolsData.error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Pass server-fetched data to client component for interactivity
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Suspense fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
        <ToolsClient 
          initialTools={toolsData.tools}
          initialPagination={{
            page: toolsData.page,
            totalPages: toolsData.totalPages,
            total: toolsData.total
          }}
          categories={categories}
          initialFilters={{
            category,
            search,
            sort
          }}
          suggestion={toolsData.suggestion}
        />
      </Suspense>
    </>
  );
}
