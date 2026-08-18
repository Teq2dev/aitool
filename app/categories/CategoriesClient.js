'use client';

import { useState, useMemo } from 'react';
import CategoryCard from '@/components/CategoryCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function CategoriesClient({ initialCategories }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) {
      return initialCategories;
    }
    const query = searchQuery.toLowerCase();
    return initialCategories.filter(cat => 
      cat.name?.toLowerCase().includes(query) || 
      cat.slug?.toLowerCase().includes(query)
    );
  }, [initialCategories, searchQuery]);

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">AI Tool Categories</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Explore {initialCategories.length} specialized categories with {initialCategories.reduce((sum, c) => sum + (c.toolCount || 0), 0)} hand-picked AI tools.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative group">
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" aria-hidden="true" />
          <Input
            type="text"
            placeholder="Search categories (e.g. Writing, Image, Coding...)"
            aria-label="Search categories"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-14 pr-6 py-8 w-full rounded-2xl border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-lg shadow-sm"
          />
        </div>
        {searchQuery.length >= 2 && (
          <p className="text-sm text-slate-500 mt-4 text-center animate-fade-in">
            Found <span className="font-bold text-slate-900">{filteredCategories.length}</span> categories matching "{searchQuery}"
            <button 
              onClick={() => setSearchQuery('')}
              className="ml-2 text-blue-600 hover:underline font-semibold"
            >
              Clear Search
            </button>
          </p>
        )}
      </div>

      {/* Categories Grid */}
      {filteredCategories.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <p className="text-slate-500 text-lg">No categories found matching your search.</p>
          <button onClick={() => setSearchQuery('')} className="mt-4 text-blue-600 font-bold hover:underline">
            View all categories
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredCategories.map((category) => (
            <CategoryCard key={category._id || category.slug} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}
