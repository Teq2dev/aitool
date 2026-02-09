'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SearchBar from '@/components/SearchBar';
import ToolCard from '@/components/ToolCard';
import CategoryCard from '@/components/CategoryCard';
import { ArrowRight, Sparkles, TrendingUp, Zap, LayoutGrid, FileText, Clock, Eye } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [trending, setTrending] = useState([]);
  const [categories, setCategories] = useState([]);
  const [latest, setLatest] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAndFetch = async () => {
      try {
        // Initialize database first
        await fetch('/api/init');
        
        // Fetch all data
        const [featuredRes, trendingRes, categoriesRes, latestRes, blogsRes] = await Promise.all([
          fetch('/api/featured'),
          fetch('/api/trending'),
          fetch('/api/categories'),
          fetch('/api/tools?sort=newest&limit=6'),
          fetch('/api/blogs?limit=3'),
        ]);

        const [featuredData, trendingData, categoriesData, latestData, blogsData] = await Promise.all([
          featuredRes.json(),
          trendingRes.json(),
          categoriesRes.json(),
          latestRes.json(),
          blogsRes.json(),
        ]);

        setFeatured(featuredData);
        setTrending(trendingData);
        setCategories(categoriesData.slice(0, 12));
        setLatest(latestData.tools || []);
        setBlogs(blogsData.blogs || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    initAndFetch();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading amazing AI tools...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-700 border-blue-200 px-4 py-2 text-sm">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              3000+ AI Tools Available
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
              Discover the Best
              <span className="block bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                AI Tools Directory
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Browse, compare, and find the perfect AI tools to supercharge your productivity and creativity.
            </p>

            <SearchBar className="max-w-2xl mx-auto mb-8" />

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/tools">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 rounded-full">
                  Browse All Tools
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/submit">
                <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 rounded-full">
                  Submit Your Tool
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-black mb-1">3000+</div>
              <div className="text-gray-600">AI Tools</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                <LayoutGrid className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-black mb-1">{categories.length}+</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-black mb-1">100%</div>
              <div className="text-gray-600">Free to Browse</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      {featured.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-black mb-2">Featured AI Tools</h2>
                <p className="text-gray-600">Handpicked tools recommended by our team</p>
              </div>
              <Link href="/tools?featured=true">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  View All <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((tool) => (
                <ToolCard key={tool._id} tool={tool} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trending Tools Section */}
      {trending.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-black mb-2 flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                  Trending Now
                </h2>
                <p className="text-gray-600">Most popular AI tools this week</p>
              </div>
              <Link href="/tools?sort=trending">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  View All <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trending.slice(0, 8).map((tool) => (
                <ToolCard key={tool._id} tool={tool} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-black mb-2">Explore by Category</h2>
              <p className="text-gray-600">Find AI tools organized by topics, tasks, and roles</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {categories.map((category) => (
                <CategoryCard key={category._id} category={category} />
              ))}
            </div>

            <div className="text-center">
              <Link href="/categories">
                <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                  View All Categories
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Latest Tools Section */}
      {latest.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-black mb-2">Latest Additions</h2>
                <p className="text-gray-600">Recently added AI tools to explore</p>
              </div>
              <Link href="/tools?sort=newest">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  View All <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latest.map((tool) => (
                <ToolCard key={tool._id} tool={tool} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Submit Your AI Tool</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Are you building an AI tool? Share it with thousands of users looking for solutions like yours.
          </p>
          <Link href="/submit">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 rounded-full">
              Submit Your Tool Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
