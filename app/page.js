import { getFeaturedTools, getTrendingTools, getCategories, getTools } from '@/lib/getTools';
import HomeClient from './HomeClient';

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

  return (
    <HomeClient 
      initialFeatured={featured}
      initialTrending={trending}
      initialCategories={categories.slice(0, 12)}
      initialLatest={latestData.tools || []}
    />
  );
}
