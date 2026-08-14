import { getFeaturedTools, getTrendingTools, getCategories, getTools } from '@/lib/getTools';
import HomeClient from './HomeClient';
import Script from 'next/script';

export const metadata = {
  title: 'Best AI Tools Free - Discover 3000+ Top AI Tools Directory',
  description: 'Explore the most comprehensive directory of best free AI tools. Browse, compare, and discover trending AI solutions for writing, image generation, business, and more.',
  alternates: {
    canonical: 'https://www.bestaitoolsfree.com',
  },
};

export const revalidate = 3600; // Revalidate home page every hour

export default async function HomePage() {
  // Fetch all data for the homepage on the server
  // This is better for SEO as the content is pre-rendered
  const [featured, trending, categories, latestData] = await Promise.all([
    getFeaturedTools(6),
    getTrendingTools(8),
    getCategories(),
    getTools({ sort: 'newest', limit: 6 })
  ]);

  // Homepage Schema
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Best AI Tools Free - Discovery Home',
    description: 'Explore 3000+ top free AI tools across multiple categories.',
    url: 'https://www.bestaitoolsfree.com',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: featured.length,
      itemListElement: featured.map((tool, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'SoftwareApplication',
          name: tool.name,
          description: tool.shortDescription || tool.description,
          url: `https://www.bestaitoolsfree.com/tools/${tool.slug}`,
          applicationCategory: 'AI Tool',
          image: tool.logo,
          offers: {
            '@type': 'Offer',
            price: tool.pricing === 'Free' ? '0' : undefined,
            priceCurrency: 'USD'
          }
        }
      }))
    }
  };

  return (
    <>
      <Script
        id="home-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <HomeClient 
        initialFeatured={featured}
        initialTrending={trending}
        initialCategories={categories}
        initialLatest={latestData.tools || []}
      />
    </>
  );
}

