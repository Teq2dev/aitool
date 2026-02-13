'use client';

import { useState, useTransition, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ToolCard from '@/components/ToolCard';
import SearchBar from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Filter, X, Loader2 } from 'lucide-react';

export default function ToolsClient({ initialTools, initialPagination, categories, initialFilters }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  const [filters, setFilters] = useState(initialFilters || { category: '', search: '', sort: 'trending' });
  const [tools, setTools] = useState(initialTools || []);
  const [pagination, setPagination] = useState(initialPagination || { page: 1, totalPages: 1, total: 0 });
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const loadMoreRef = useRef(null);
  const observerRef = useRef(null);

  // Initialize hasMore based on pagination
  useEffect(() => {
    if (initialPagination) {
      setHasMore(initialPagination.page < initialPagination.totalPages);
    }
  }, [initialPagination]);

  // Load more tools function
  const loadMoreTools = async () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    try {
      const nextPage = pagination.page + 1;
      const params = new URLSearchParams();
      if (filters.category) params.set('category', filters.category);
      if (filters.search) params.set('search', filters.search);
      if (filters.sort) params.set('sort', filters.sort);
      params.set('page', nextPage.toString());
      params.set('limit', '80');
      
      const res = await fetch(`/api/tools?${params.toString()}`);
      const data = await res.json();
      
      if (data.tools && data.tools.length > 0) {
        setTools(prev => [...prev, ...data.tools]);
        setPagination(prev => ({ 
          ...prev, 
          page: nextPage, 
          totalPages: data.pagination?.totalPages || prev.totalPages 
        }));
        setHasMore(nextPage < (data.pagination?.totalPages || 1));
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more tools:', error);
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  };

  // Setup intersection observer
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMoreTools();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    observerRef.current = observer;

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [hasMore, loadingMore]);

  // Reset tools when initial data changes
  useEffect(() => {
    if (initialTools) {
      setTools(initialTools);
    }
    if (initialPagination) {
      setPagination(initialPagination);
      setHasMore(initialPagination.page < initialPagination.totalPages);
    }
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialTools, initialPagination, initialFilters]);

  // Update URL and trigger server-side data fetch
  const updateFilters = (newFilters) => {
    const params = new URLSearchParams(searchParams);
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    
    // Reset to page 1 when filters change
    params.set('page', '1');
    params.set('limit', '80');
    
    // Use startTransition for smoother UX
    startTransition(() => {
      router.push(`/tools?${params.toString()}`);
    });
    
    setFilters(newFilters);
  };

  const handleCategoryChange = (value) => {
    updateFilters({ ...filters, category: value === 'all' ? '' : value });
  };

  const handleSortChange = (value) => {
    updateFilters({ ...filters, sort: value });
  };

  const clearFilters = () => {
    startTransition(() => {
      router.push('/tools');
    });
    setFilters({ category: '', search: '', sort: 'trending' });
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    
    startTransition(() => {
      router.push(`/tools?${params.toString()}`);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">Browse AI Tools</h1>
          <p className="text-gray-600">Discover {pagination.total} amazing AI tools</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <SearchBar />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-700">Filters:</span>
          </div>

          <Select value={filters.category || 'all'} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat._id} value={cat.slug}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.sort} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="trending">Trending</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>

          {(filters.category || filters.search) && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          )}
        </div>

        {/* Active Filters */}
        {(filters.category || filters.search) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.category && (
              <Badge variant="secondary" className="px-3 py-1">
                Category: {filters.category}
              </Badge>
            )}
            {filters.search && (
              <Badge variant="secondary" className="px-3 py-1">
                Search: {filters.search}
              </Badge>
            )}
          </div>
        )}

        {/* Loading indicator during transition */}
        {isPending && (
          <div className="text-center py-8">
            <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 mt-2">Updating...</p>
          </div>
        )}

        {/* Tools Grid */}
        {!isPending && tools.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 mb-4">No tools found</p>
            <Button onClick={clearFilters}>Clear Filters</Button>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-4">Showing {tools.length} of {pagination.total} tools</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {tools.map((tool) => (
                <ToolCard key={tool._id} tool={tool} />
              ))}
            </div>

            {/* Infinite Scroll Loading */}
            <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
              {loadingMore && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Loading more tools...</span>
                </div>
              )}
              {!hasMore && tools.length > 0 && (
                <p className="text-gray-500">You've seen all {tools.length} tools</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
