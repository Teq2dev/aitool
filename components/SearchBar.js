'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

function SearchInput({ placeholder, className = '' }) {
  const searchParams = useSearchParams();
  const currentSearch = searchParams ? searchParams.get('search') || '' : '';
  const [search, setSearch] = useState(currentSearch);
  const router = useRouter();
  const { t, getLangUrl } = useLanguage();

  const activePlaceholder = placeholder || t('searchPlaceholder');

  // Sync with URL search params when they change
  useEffect(() => {
    setSearch(currentSearch);
  }, [currentSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(getLangUrl(`/tools?search=${encodeURIComponent(search)}`));
    }
  };

  return (
    <form onSubmit={handleSearch} role="search" className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#94A3B8] w-5 h-5 pointer-events-none" aria-hidden="true" />
        <Input
          type="text"
          placeholder={activePlaceholder}
          aria-label={activePlaceholder || "Search AI tools"}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-12 pr-28 sm:pr-32 py-5 sm:py-6 text-base sm:text-lg bg-white border border-[#E2E8F0] focus:border-[#4338CA] focus:ring-2 focus:ring-[#4338CA]/20 rounded-full shadow-xs hover:border-[#CBD5E1] transition-all text-[#0F172A] placeholder:text-[#94A3B8]"
        />
        <Button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#4338CA] hover:bg-[#3730A3] active:bg-[#312E81] text-white font-semibold rounded-full px-5 sm:px-7 py-2 sm:py-2.5 transition-all shadow-xs text-sm sm:text-base"
        >
          {t('searchBtn')}
        </Button>
      </div>
    </form>
  );
}

export default function SearchBar(props) {
  return (
    <Suspense fallback={
      <div className={`relative ${props.className || ''}`}>
        <div className="h-14 bg-slate-100 rounded-full animate-pulse border border-[#E2E8F0]"></div>
      </div>
    }>
      <SearchInput {...props} />
    </Suspense>
  );
}