import { Suspense } from 'react';
import { getTools, getCategories } from '@/lib/getTools';
import ToolsClient from './ToolsClient';

// Enable Next.js caching with revalidation
export const revalidate = 60; // Revalidate every 60 seconds

export const metadata = {
  title: 'Browse AI Tools - AI Directory',
  description: 'Discover and explore AI tools across multiple categories. Filter by category, search, and sort.',
};

// Server Component - fetches data before rendering
export default async function ToolsPage({ searchParams }) {
  // Extract search params
  const category = searchParams?.category || '';
  const search = searchParams?.search || '';
  const sort = searchParams?.sort || 'trending';
  const page = parseInt(searchParams?.page || '1');

  // Fetch data on the server (parallel for better performance)
  const [toolsData, categories] = await Promise.all([
    getTools({ 
      category, 
      search, 
      sort, 
      page,
      limit: 12 
    }),
    getCategories()
  ]);

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
    />
  );
}
