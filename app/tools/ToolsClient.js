'use client';

import { useState, useTransition, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ToolCard from '@/components/ToolCard';
import SearchBar from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, X, Loader2, ArrowUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function ToolsClient({ initialTools, initialPagination, categories, initialFilters, suggestion }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const { getLangUrl } = useLanguage();
  
  const [filters, setFilters] = useState(initialFilters || { category: '', search: '', sort: 'trending' });
  const [tools, setTools] = useState(initialTools || []);
  const [pagination, setPagination] = useState(initialPagination || { page: 1, totalPages: 1, total: 0 });
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Sync state with props when server-side data changes (e.g., on navigation)
  useEffect(() => {
    setTools(initialTools || []);
    setPagination(initialPagination || { page: 1, totalPages: 1, total: 0 });
    if (initialFilters) setFilters(initialFilters);
  }, [initialTools, initialPagination, initialFilters]);

  // Handle scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update URL and trigger server-side data fetch
  const updateFilters = (newFilters, page = 1) => {
    const params = new URLSearchParams();
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    
    params.set('page', page.toString());
    params.set('limit', '40');
    
    startTransition(() => {
      router.push(getLangUrl(`/tools?${params.toString()}`), { scroll: true });
    });
    
    setFilters(newFilters);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    updateFilters(filters, newPage);
  };

  const handleCategoryChange = (value) => {
    updateFilters({ ...filters, category: value === 'all' ? '' : value });
  };

  const handleSortChange = (value) => {
    updateFilters({ ...filters, sort: value });
  };

  const clearFilters = () => {
    startTransition(() => {
      router.push(getLangUrl('/tools'), { scroll: true });
    });
    setFilters({ category: '', search: '', sort: 'trending' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to generate page numbers for pagination
  const getPageNumbers = () => {
    const total = pagination.totalPages;
    const current = pagination.page;
    const pages = [];
    
    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      if (current <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('ellipsis');
        pages.push(total);
      } else if (current >= total - 3) {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = total - 4; i <= total; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = current - 1; i <= current + 1; i++) pages.push(i);
        pages.push('ellipsis');
        pages.push(total);
      }
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
              Explore AI Tools
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl">
              Discover and compare {pagination.total} industry-leading AI tools curated for your workflow.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            {pagination.total} Tools Available
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-md py-4 mb-8 border-b border-slate-100">
          <div className="space-y-4">
            <SearchBar className="max-w-3xl" />
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 pr-2 border-r border-slate-200">
                <Filter className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-semibold text-slate-700">Refine:</span>
              </div>

              <Select value={filters.category || 'all'} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-[180px] h-10 rounded-lg border-slate-200 focus:ring-blue-500">
                  <SelectValue placeholder="Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat._id || cat.slug} value={cat.slug}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.sort} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[160px] h-10 rounded-lg border-slate-200 focus:ring-blue-500">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trending">Trending</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>

              {(filters.category || filters.search) && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <X className="w-4 h-4 mr-2" />
                  Reset Filters
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Results Info */}
        {!isPending && tools.length > 0 && (
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-medium text-slate-500">
              Showing page {pagination.page} of {pagination.totalPages} ({pagination.total} tools)
            </h2>
          </div>
        )}

        {/* Content Area */}
        <div className="relative">
          {isPending && (
            <div className="absolute inset-0 z-20 bg-white/60 backdrop-blur-[1px] flex items-start justify-center pt-20">
              <div className="bg-white p-4 rounded-full shadow-xl border border-slate-100">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
            </div>
          )}

          {tools.length === 0 && !isPending ? (
            <div className="text-center py-32 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Filter className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No matching tools found</h3>
                <p className="text-slate-500 mb-8">
                  We couldn't find any tools matching your current filters. Try adjusting your search or categories.
                </p>
                <Button onClick={clearFilters} className="rounded-xl px-8 shadow-lg shadow-blue-200">
                  Clear All Filters
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {tools.map((tool) => (
                  <ToolCard key={tool._id || tool.slug} tool={tool} />
                ))}
              </div>

              {/* Semantic Pagination */}
              {pagination.totalPages > 1 && (
                <div className="mt-16 py-8 border-t border-slate-100">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          href={pagination.page > 1 ? `/tools?${new URLSearchParams({...filters, page: pagination.page - 1}).toString()}` : '#'}
                          onClick={(e) => { e.preventDefault(); handlePageChange(pagination.page - 1); }}
                          className={pagination.page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                      </PaginationItem>
                      
                      {getPageNumbers().map((pageNum, idx) => (
                        <PaginationItem key={idx}>
                          {pageNum === 'ellipsis' ? (
                            <PaginationEllipsis />
                          ) : (
                            <PaginationLink
                              href={`/tools?${new URLSearchParams({...filters, page: pageNum}).toString()}`}
                              onClick={(e) => { e.preventDefault(); handlePageChange(pageNum); }}
                              isActive={pagination.page === pageNum}
                              className="cursor-pointer"
                            >
                              {pageNum}
                            </PaginationLink>
                          )}
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationNext 
                          href={pagination.page < pagination.totalPages ? `/tools?${new URLSearchParams({...filters, page: pagination.page + 1}).toString()}` : '#'}
                          onClick={(e) => { e.preventDefault(); handlePageChange(pagination.page + 1); }}
                          className={pagination.page === pagination.totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Floating Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-slate-900 text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all z-50 group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
        </button>
      )}
    </div>
  );
}


