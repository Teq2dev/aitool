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
  
  let title = 'Browse AI Tools - Best Free AI Tools Directory';
  let description = 'Discover 3000+ free AI tools across multiple categories. Find the best AI tools for writing, image generation, coding, productivity and more.';
  let url = `${baseUrl}/tools`;

  if (category) {
    const formattedCat = category.replace(/-/g, ' ');
    title = `Best ${formattedCat} AI Tools - Free AI Directory`;
    description = `Explore the top-rated free AI tools for ${formattedCat}. Compare features, read reviews, and find the best ${formattedCat} AI solutions.`;
    url = `${baseUrl}/tools?category=${category}`;
  } else if (search) {
    title = `Search results for "${search}" - Best AI Tools Free`;
    url = `${baseUrl}/tools?search=${search}`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
    },
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

  // Schema for CollectionPage
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Browse AI Tools - Best Free AI Tools Directory',
    description: 'Discover 3000+ free AI tools across multiple categories.',
    url: 'https://www.bestaitoolsfree.com/tools',
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
          url: `https://www.bestaitoolsfree.com/tools/${tool.slug}`,
          applicationCategory: 'AI Tool',
          offers: {
            '@type': 'Offer',
            price: tool.pricing === 'Free' ? '0' : undefined,
            priceCurrency: 'USD'
          }
        }
      }))
    }
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
    </>
  );
}
