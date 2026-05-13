import { getCategories } from '@/lib/getTools';
import CategoriesClient from './CategoriesClient';
import Script from 'next/script';

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata() {
  const categories = await getCategories();
  
  return {
    title: 'AI Tool Categories - Best Free AI Tools Directory',
    description: `Browse ${categories.length} AI tool categories. Find the best AI tools organized by topics, tasks, and roles. Discover free AI solutions for every need.`,
    alternates: {
      canonical: 'https://www.bestaitoolsfree.com/categories',
    },
    openGraph: {
      title: 'AI Tool Categories - Discover Top AI Solutions',
      description: `Explore ${categories.length} categories of free AI tools. Find the perfect AI software for your workflow.`,
      url: 'https://www.bestaitoolsfree.com/categories',
    }
  };
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  // Schema for categories page
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'AI Tool Categories - Best AI Tools Free',
    description: `Browse ${categories.length} categories with AI tools organized by topics, tasks, and roles.`,
    url: 'https://www.bestaitoolsfree.com/categories',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: categories.length,
      itemListElement: categories.slice(0, 40).map((cat, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Thing',
          name: cat.name,
          url: `https://www.bestaitoolsfree.com/tools?category=${cat.slug || cat.name}`
        }
      }))
    }
  };

  return (
    <>
      <Script
        id="categories-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="min-h-screen bg-white py-12 md:py-20">
        <CategoriesClient initialCategories={categories} />
      </div>
    </>
  );
}