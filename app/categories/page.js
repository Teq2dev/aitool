'use client';

import { useEffect, useState } from 'react';
import CategoryCard from '@/components/CategoryCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.length >= 2) {
        performSearch(searchQuery);
      } else {
        setSearchResults(null);
      }
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const performSearch = async (query) => {
    setSearching(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&type=categories`);
      const data = await res.json();
      setSearchResults(data.categories || []);
    } catch (error) {
      console.error('Error searching:', error);
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading categories...</p>
        </div>
      </div>
    );
  }

  const displayCategories = searchResults !== null ? searchResults : categories;
  const topicCategories = displayCategories.filter((c) => c.type === 'topic');
  const taskCategories = displayCategories.filter((c) => c.type === 'task');
  const roleCategories = displayCategories.filter((c) => c.type === 'role');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-black mb-2">AI Tool Categories</h1>
          <p className="text-gray-600">Explore AI tools organized by topics, tasks, and roles</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 w-full rounded-full border-2 border-gray-200 focus:border-blue-500 focus:ring-0"
            />
            {searching && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          {searchQuery.length > 0 && searchQuery.length < 2 && (
            <p className="text-sm text-gray-500 mt-2 text-center">Type at least 2 characters to search</p>
          )}
          {searchResults !== null && (
            <p className="text-sm text-gray-600 mt-2 text-center">
              Found {searchResults.length} categories matching "{searchQuery}"
              <button 
                onClick={() => { setSearchQuery(''); setSearchResults(null); }}
                className="ml-2 text-blue-600 hover:underline"
              >
                Clear search
              </button>
            </p>
          )}
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-8">
            <TabsTrigger value="all">All ({displayCategories.length})</TabsTrigger>
            <TabsTrigger value="topic">Topics ({topicCategories.length})</TabsTrigger>
            <TabsTrigger value="task">Tasks ({taskCategories.length})</TabsTrigger>
            <TabsTrigger value="role">Roles ({roleCategories.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {displayCategories.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No categories found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayCategories.map((category) => (
                  <CategoryCard key={category._id} category={category} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="topic">
            <h2 className="text-2xl font-bold text-black mb-6">By Topic / Context</h2>
            {topicCategories.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No topic categories found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {topicCategories.map((category) => (
                  <CategoryCard key={category._id} category={category} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="task">
            <h2 className="text-2xl font-bold text-black mb-6">By Task / Action</h2>
            {taskCategories.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No task categories found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {taskCategories.map((category) => (
                  <CategoryCard key={category._id} category={category} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="role">
            <h2 className="text-2xl font-bold text-black mb-6">By Job Role</h2>
            {roleCategories.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No role categories found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {roleCategories.map((category) => (
                  <CategoryCard key={category._id} category={category} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}