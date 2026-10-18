'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  Upload, 
  ChevronDown, 
  Check, 
  LogOut, 
  User, 
  Menu, 
  X, 
  Compass, 
  LayoutGrid, 
  BookOpen, 
  LayoutDashboard, 
  Shield, 
  Search,
  FileText,
  Image as ImageIcon,
  Calculator,
  Calendar,
  FileSpreadsheet
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import FlagIcon from '@/components/FlagIcon';
import { PDF_TOOLS } from '@/lib/pdfConfig';
import { IMAGE_TOOL_DATA } from '@/lib/imageToolData';

const FEATURED_CALCULATORS = [
  { name: 'EMI Calculator', slug: 'calculators/emi-calculator' },
  { name: 'Loan Calculator', slug: 'calculators/loan-calculator' },
  { name: 'Age Calculator', slug: 'calculators/age-calculator' },
  { name: 'Percentage Calculator', slug: 'calculators/percentage-calculator' },
  { name: 'Salary Calculator', slug: 'calculators/salary-calculator' },
  { name: 'Compound Interest', slug: 'calculators/compound-interest-calculator' },
  { name: 'Currency Converter', slug: 'calculators/currency-converter' },
  { name: 'BMI Calculator', slug: 'calculators/bmi-calculator' },
];

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const isSignedIn = status === 'authenticated';
  const user = session?.user;
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [freeToolsOpen, setFreeToolsOpen] = useState(false);
  const [freeToolsMobileOpen, setFreeToolsMobileOpen] = useState(false);
  const freeToolsRef = useRef(null);

  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [resourcesMobileOpen, setResourcesMobileOpen] = useState(false);
  const resourcesRef = useRef(null);

  const { currentLang, setLanguage, t, languages, getLangUrl } = useLanguage();

  // Free Tools & Resources click outside & Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setFreeToolsOpen(false);
        setResourcesOpen(false);
      }
    };
    const handleClickOutside = (e) => {
      if (freeToolsRef.current && !freeToolsRef.current.contains(e.target)) {
        setFreeToolsOpen(false);
      }
      if (resourcesRef.current && !resourcesRef.current.contains(e.target)) {
        setResourcesOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const langDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (isSignedIn) {
        try {
          const res = await fetch('/api/admin/check');
          const data = await res.json();
          setIsAdmin(data.isAdmin);
        } catch (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };
    checkAdminStatus();
  }, [isSignedIn]);

  // Close all menus on route change
  useEffect(() => {
    setLangDropdownOpen(false);
    setProfileDropdownOpen(false);
    setSearchOpen(false);
    setMobileMenuOpen(false);
    setFreeToolsOpen(false);
    setResourcesOpen(false);
  }, [pathname]);

  // Focus search input when expanded
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Close dropdowns and search on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
      if (
        mobileMenuOpen && 
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target) && 
        !event.target.closest('#mobile-menu-toggle')
      ) {
        setMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setLangDropdownOpen(false);
        setProfileDropdownOpen(false);
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setSearchOpen(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle header search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(getLangUrl(`/tools?search=${encodeURIComponent(searchQuery.trim())}`));
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
      <div className="container mx-auto px-2 min-[380px]:px-4 lg:px-2 xl:px-6 max-w-7xl">
        <div className="flex h-16 items-center justify-between gap-1.5 lg:gap-1.5 xl:gap-3 2xl:gap-4">
          
          {/* Logo */}
          <Link 
            href={getLangUrl('/')} 
            className="flex items-center space-x-1.5 xl:space-x-2.5 hover:opacity-90 transition-opacity flex-shrink-0" 
            prefetch={true}
          >
            <img 
              src="/logo.png" 
              alt="Best AI Tools Free" 
              className="w-8 h-8 rounded-xl object-contain flex-shrink-0 shadow-2xs border border-slate-200/60" 
            />
            <span className="font-extrabold text-sm sm:text-base xl:text-lg text-[#0F172A] tracking-tight whitespace-nowrap inline-flex items-center">
              Best<span className="text-[#4338CA]">AI</span>Tools<span className="text-[#06B6D4] font-bold text-[9px] xl:text-[10px] ml-1 xl:ml-1.5 px-1.5 xl:px-2 py-0.5 rounded-full bg-[#ECFEFF] border border-[rgba(6,182,212,0.25)] uppercase tracking-wider">FREE</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 2xl:space-x-1.5" aria-label="Main Navigation">
            <Link 
              href={getLangUrl('/tools')} 
              className={`whitespace-nowrap transition-all font-semibold text-xs xl:text-[13px] px-2 xl:px-2.5 2xl:px-3 py-1.5 rounded-xl ${
                pathname === '/tools' || (pathname?.includes('/tools') && !pathname?.includes('/jpg-to-excel'))
                  ? 'text-[#4338CA] bg-[#EEF2FF]' 
                  : 'text-[#0F172A] hover:text-[#4338CA] hover:bg-slate-100/70'
              }`}
              prefetch={true}
            >
              {t('browseTools') || 'Browse Tools'}
            </Link>

            {/* AI JPG to Excel Direct Nav Pill */}
            <Link 
              href={getLangUrl('/jpg-to-excel')} 
              className={`whitespace-nowrap inline-flex items-center gap-1 xl:gap-1.5 transition-all text-xs xl:text-[13px] font-semibold px-2 xl:px-2.5 2xl:px-3 py-1.5 rounded-xl border ${
                pathname?.includes('/jpg-to-excel') 
                  ? 'text-emerald-800 bg-emerald-50 border-emerald-200 shadow-2xs' 
                  : 'text-[#0F172A] hover:text-emerald-700 bg-emerald-50/50 hover:bg-emerald-50 border-emerald-200/60'
              }`}
              prefetch={true}
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" aria-hidden="true" />
              <span>JPG to Excel</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300/60">
                AI
              </span>
            </Link>

            {/* Free Tools Dropdown (Desktop 3-Column Mega-Menu) */}
            <div className="relative" ref={freeToolsRef}>
              <button 
                type="button"
                onClick={() => {
                  setFreeToolsOpen(!freeToolsOpen);
                  setResourcesOpen(false);
                }}
                className={`whitespace-nowrap flex items-center gap-1 xl:gap-1.5 font-semibold text-xs xl:text-[13px] transition-all px-2 xl:px-2.5 2xl:px-3 py-1.5 rounded-xl cursor-pointer focus:outline-none ${freeToolsOpen ? 'text-[#4338CA] bg-[#EEF2FF]' : 'text-[#0F172A] hover:text-[#4338CA] hover:bg-slate-100/70'}`}
                aria-expanded={freeToolsOpen}
                aria-haspopup="true"
              >
                <span>{t('freeTools') || 'Free Utilities'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${freeToolsOpen ? 'rotate-180 opacity-100 text-[#4338CA]' : 'opacity-60'}`} aria-hidden="true" />
              </button>
              
              {freeToolsOpen && (
                <div className="absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 w-[760px] xl:w-[840px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 transition-all duration-200 z-50 animate-in fade-in slide-in-from-top-2 overflow-hidden">
                  {/* Top Featured Bar */}
                  <Link 
                    href={getLangUrl('/jpg-to-excel')}
                    onClick={() => setFreeToolsOpen(false)}
                    className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-[#EEF2FF] to-[#ECFEFF] border-b border-[#E2E8F0] hover:opacity-95 transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#4338CA] text-white flex items-center justify-center text-xs shadow-2xs">
                        <Sparkles className="w-4 h-4 text-cyan-200" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#0F172A] group-hover:text-[#4338CA] transition-colors">
                            AI JPG to Excel Converter
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-[#ECFEFF] text-[#0E7490] border border-[rgba(6,182,212,0.25)]">
                            Gemini 2.5 Flash
                          </span>
                        </div>
                        <p className="text-[11px] text-[#64748B]">Extract formatted table data directly into downloadable .xlsx</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#4338CA] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      <span>Try Now</span>
                      <span>&rarr;</span>
                    </span>
                  </Link>

                  <div className="grid grid-cols-3 gap-0 divide-x divide-slate-100">
                    
                    {/* PDF Tools Column */}
                    <div className="p-4 bg-slate-50/40">
                      <div className="flex items-center justify-between mb-3 px-2">
                        <Link 
                          href={getLangUrl('/pdf-tools')}
                          onClick={() => setFreeToolsOpen(false)} 
                          className="flex items-center gap-2 text-sm font-black text-[#0F172A] hover:text-rose-600 transition-colors group"
                        >
                          <div className="w-6 h-6 rounded-md bg-rose-100 text-rose-600 flex items-center justify-center">
                            <FileText className="w-3.5 h-3.5" />
                          </div>
                          <span>PDF Utilities</span>
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-rose-600">→</span>
                        </Link>
                      </div>
                      <div className="grid grid-cols-1 gap-0.5 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                        {PDF_TOOLS.map((tool) => (
                          <Link
                            key={tool.slug}
                            href={getLangUrl(`/${tool.slug}`)}
                            onClick={() => setFreeToolsOpen(false)}
                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-white hover:shadow-2xs transition-all text-slate-600 hover:text-rose-600 text-[13px] font-medium"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 opacity-60"></span>
                            <span className="truncate">{tool.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Image Tools Column */}
                    <div className="p-4 bg-white">
                      <div className="flex items-center justify-between mb-3 px-2">
                        <Link 
                          href={getLangUrl('/image-tools')}
                          onClick={() => setFreeToolsOpen(false)} 
                          className="flex items-center gap-2 text-sm font-black text-[#0F172A] hover:text-[#4338CA] transition-colors group"
                        >
                          <div className="w-6 h-6 rounded-md bg-[#EEF2FF] text-[#4338CA] flex items-center justify-center">
                            <ImageIcon className="w-3.5 h-3.5" />
                          </div>
                          <span>Image Utilities</span>
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#4338CA]">→</span>
                        </Link>
                      </div>
                      <div className="grid grid-cols-1 gap-0.5 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                        {Object.values(IMAGE_TOOL_DATA).map((tool) => (
                          <Link
                            key={tool.slug}
                            href={getLangUrl(`/${tool.slug}`)}
                            onClick={() => setFreeToolsOpen(false)}
                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 transition-all text-slate-600 hover:text-[#4338CA] text-[13px] font-medium"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4338CA] opacity-60"></span>
                            <span className="truncate">{tool.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Calculators Column */}
                    <div className="p-4 bg-slate-50/40">
                      <div className="flex items-center justify-between mb-3 px-2">
                        <Link 
                          href={getLangUrl('/calculators')}
                          onClick={() => setFreeToolsOpen(false)} 
                          className="flex items-center gap-2 text-sm font-black text-[#0F172A] hover:text-emerald-700 transition-colors group"
                        >
                          <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center">
                            <Calculator className="w-3.5 h-3.5" />
                          </div>
                          <span>Calculators</span>
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-emerald-700">→</span>
                        </Link>
                      </div>
                      <div className="grid grid-cols-1 gap-0.5 max-h-[250px] overflow-y-auto pr-1 custom-scrollbar">
                        {FEATURED_CALCULATORS.map((tool) => (
                          <Link
                            key={tool.slug}
                            href={getLangUrl(`/${tool.slug}`)}
                            onClick={() => setFreeToolsOpen(false)}
                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-white hover:shadow-2xs transition-all text-slate-600 hover:text-emerald-700 text-[13px] font-medium"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-60"></span>
                            <span className="truncate">{tool.name}</span>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-2 pt-2 border-t border-slate-200/60 px-2">
                        <Link
                          href={getLangUrl('/calculators')}
                          onClick={() => setFreeToolsOpen(false)}
                          className="text-xs font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1 group"
                        >
                          <span>All 24 Calculators</span>
                          <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>

            <Link 
              href={getLangUrl('/categories')} 
              className={`whitespace-nowrap transition-all font-semibold text-xs xl:text-[13px] px-2 xl:px-2.5 2xl:px-3 py-1.5 rounded-xl ${
                pathname?.includes('/categories') ? 'text-[#4338CA] bg-[#EEF2FF]' : 'text-[#0F172A] hover:text-[#4338CA] hover:bg-slate-100/70'
              }`}
              prefetch={true}
            >
              {t('categories') || 'Categories'}
            </Link>

            {/* Resources / Insights Dropdown (Blogs + Events) */}
            <div className="relative" ref={resourcesRef}>
              <button 
                type="button"
                onClick={() => {
                  setResourcesOpen(!resourcesOpen);
                  setFreeToolsOpen(false);
                }}
                className={`whitespace-nowrap flex items-center gap-1 xl:gap-1.5 font-semibold text-xs xl:text-[13px] transition-all px-2 xl:px-2.5 2xl:px-3 py-1.5 rounded-xl cursor-pointer focus:outline-none ${
                  resourcesOpen || pathname?.includes('/blogs') || pathname?.includes('/events') 
                    ? 'text-[#4338CA] bg-[#EEF2FF]' 
                    : 'text-[#0F172A] hover:text-[#4338CA] hover:bg-slate-100/70'
                }`}
                aria-expanded={resourcesOpen}
                aria-haspopup="true"
              >
                <span>{t('resources') || 'Resources'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${resourcesOpen ? 'rotate-180 opacity-100 text-[#4338CA]' : 'opacity-60'}`} aria-hidden="true" />
              </button>
              
              {resourcesOpen && (
                <div className="absolute top-[calc(100%+0.5rem)] right-0 w-72 bg-white rounded-2xl shadow-xl border border-slate-200/90 transition-all duration-200 z-50 animate-in fade-in slide-in-from-top-2 p-2">
                  <Link
                    href={getLangUrl('/blogs')}
                    onClick={() => setResourcesOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform shadow-2xs">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {t('blogs') || 'AI Blog & Editorial'}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                        In-depth guides, benchmarks & tool comparisons
                      </p>
                    </div>
                  </Link>

                  <Link
                    href={getLangUrl('/events')}
                    onClick={() => setResourcesOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform shadow-2xs">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-slate-900 group-hover:text-[#4338CA] transition-colors">
                        {t('events') === 'events' ? 'AI Events & Summits' : (t('events') || 'AI Events & Summits')}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                        50+ global conferences, hackathons & expos
                      </p>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Header Right Actions */}
          <div className="flex items-center gap-1 xl:gap-1.5 2xl:gap-2 flex-shrink-0">
            
            {/* Modern Search Trigger & Expandable Input */}
            <div className="relative flex items-center" ref={searchContainerRef}>
              {searchOpen ? (
                <form 
                  onSubmit={handleSearchSubmit} 
                  role="search"
                  className="flex items-center bg-white focus-within:ring-2 focus-within:ring-[#4338CA] rounded-xl border border-slate-300 shadow-md transition-all duration-200 w-48 sm:w-64 md:w-72 px-3 py-1.5"
                >
                  <Search className="w-4 h-4 text-slate-400 flex-shrink-0 mr-2" aria-hidden="true" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('searchPlaceholder') || "Search 1,400+ AI tools..."}
                    aria-label="Search tools"
                    className="w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  >
                  </input>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 transition-colors flex-shrink-0 ml-1 cursor-pointer"
                    aria-label="Close search"
                  >
                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </form>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setSearchOpen(true)}
                    className="hidden 2xl:inline-flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200/70 border border-slate-200 rounded-xl transition-all cursor-pointer shadow-2xs whitespace-nowrap"
                    aria-label="Search tools"
                    title="Search AI tools (Ctrl+K)"
                  >
                    <Search className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                    <span className="font-medium text-slate-500">Search tools...</span>
                    <kbd className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white border border-slate-200 rounded shadow-2xs">
                      ⌘K
                    </kbd>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchOpen(true)}
                    className="hidden lg:inline-flex 2xl:hidden items-center gap-1 p-2 text-slate-600 hover:text-[#4338CA] hover:bg-slate-100 border border-slate-200 rounded-xl transition-all cursor-pointer shadow-2xs"
                    aria-label="Search tools"
                    title="Search AI tools (Ctrl+K)"
                  >
                    <Search className="w-4 h-4 text-slate-500" aria-hidden="true" />
                    <span className="text-[10px] font-semibold text-slate-400">⌘K</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchOpen(true)}
                    className="lg:hidden p-2 text-slate-600 hover:text-[#4338CA] hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                    aria-label="Search tools"
                  >
                    <Search className="w-4 h-4" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            {/* Language Switcher Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 xl:gap-1.5 px-2 xl:px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/70 rounded-xl border border-slate-200 transition-colors cursor-pointer shadow-2xs"
                aria-label="Select Language"
                aria-haspopup="listbox"
                aria-expanded={langDropdownOpen}
                aria-controls="language-dropdown-menu"
              >
                <FlagIcon code={currentLang} className="w-3.5 h-2.5 rounded-[2px] shadow-2xs inline-block object-cover flex-shrink-0" />
                <span className="uppercase font-bold text-[10px] xl:text-[11px]">{currentLang}</span>
                <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>

              {langDropdownOpen && (
                <div
                  id="language-dropdown-menu"
                  role="listbox"
                  aria-label="Languages"
                  className="absolute right-0 mt-2 w-48 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1 mb-1">
                    Select Language
                  </div>
                  <div className="max-h-56 overflow-y-auto overscroll-contain">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        role="option"
                        aria-selected={currentLang === lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer ${
                          currentLang === lang.code ? 'font-bold text-blue-600 bg-blue-50/70' : 'text-slate-700'
                        }`}
                      >
                        <span className="flex items-center gap-2 min-w-0">
                          <FlagIcon code={lang.code} className="w-3.5 h-2.5 rounded-[2px] shadow-2xs flex-shrink-0" />
                          <span className="truncate">{lang.name}</span>
                        </span>
                        {currentLang === lang.code && <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 ml-1.5" aria-hidden="true" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Tool Button (Desktop primary action) */}
            <div className="hidden sm:flex items-center">
              <Link href={isSignedIn ? getLangUrl('/submit') : getLangUrl('/sign-in?callbackUrl=/submit')} prefetch={true}>
                <Button className="h-8 xl:h-9 bg-[#4338CA] hover:bg-[#3730A3] active:bg-[#312E81] text-white font-bold text-xs xl:text-sm px-2 xl:px-4 py-1.5 xl:py-2 rounded-xl shadow-xs transition-all cursor-pointer inline-flex items-center gap-1 xl:gap-1.5 hover:shadow-md hover:-translate-y-0.5">
                  <Upload className="w-3.5 h-3.5 mr-0.5 xl:mr-1" aria-hidden="true" />
                  <span>{t('submitTool') || 'Submit Tool'}</span>
                </Button>
              </Link>
            </div>

            {/* Task 1 & 5: Profile Dropdown (Consolidating My Dashboard, Admin, Sign Out) */}
            {isSignedIn ? (
              <div className="relative" ref={profileDropdownRef}>
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-1 p-0.5 sm:px-1.5 sm:py-1 rounded-full hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-colors cursor-pointer"
                  aria-label="User account menu"
                  aria-haspopup="menu"
                  aria-expanded={profileDropdownOpen}
                >
                  {user?.image ? (
                    <img 
                      src={user.image} 
                      alt={user.name ? `${user.name}'s profile avatar` : 'User profile avatar'} 
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-slate-200 object-cover shadow-2xs" 
                    />
                  ) : (
                    <div 
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-200 shadow-2xs" 
                      aria-hidden="true"
                    >
                      {user?.name?.[0] || 'U'}
                    </div>
                  )}
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>

                {profileDropdownOpen && (
                  <div
                    role="menu"
                    aria-label="User Account Menu"
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200/90 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    {/* User Info Header */}
                    <div className="px-3.5 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {user?.name || 'User Account'}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {user?.email || ''}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <Link
                        href={getLangUrl('/dashboard')}
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        role="menuitem"
                      >
                        <LayoutDashboard className="w-4 h-4 text-slate-500 flex-shrink-0" aria-hidden="true" />
                        <span>{t('myDashboard') || 'My Dashboard'}</span>
                      </Link>

                      {isAdmin && (
                        <Link
                          href={getLangUrl('/admin')}
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center justify-between px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          role="menuitem"
                        >
                          <span className="flex items-center gap-2.5">
                            <Shield className="w-4 h-4 text-blue-600 flex-shrink-0" aria-hidden="true" />
                            <span>{t('admin') || 'Admin Panel'}</span>
                          </span>
                          <span className="text-[10px] font-bold text-blue-600 bg-blue-100/80 px-1.5 py-0.5 rounded-sm">
                            Admin
                          </span>
                        </Link>
                      )}
                    </div>

                    {/* Logout Option */}
                    <div className="pt-1 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          signOut({ callbackUrl: '/' });
                        }}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors text-left cursor-pointer"
                        role="menuitem"
                      >
                        <LogOut className="w-4 h-4 text-red-500 flex-shrink-0" aria-hidden="true" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center">
                <button 
                  type="button"
                  onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                  className="h-8 flex items-center gap-1 xl:gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold px-2 xl:px-3 py-1 rounded-lg text-xs transition-all shadow-xs cursor-pointer"
                  aria-label={t('signIn') || "Sign In with Google"}
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#FFF"/>
                  </svg>
                  <span>{t('signIn') || 'Sign In'}</span>
                </button>
              </div>
            )}

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer / Dropdown Panel */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 top-16 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden animate-in fade-in duration-200"
          aria-hidden="true"
        >
          <div 
            id="mobile-navigation-drawer"
            ref={mobileMenuRef}
            className="bg-white border-b border-[#E2E8F0] shadow-2xl px-4 py-5 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain animate-in slide-in-from-top-4 duration-200"
          >
            {/* Primary Nav Links */}
            <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
              <Link
                href={getLangUrl('/tools')}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  pathname === '/tools' || (pathname?.includes('/tools') && !pathname?.includes('/jpg-to-excel')) ? 'bg-[#EEF2FF] text-[#4338CA]' : 'text-slate-700 hover:bg-slate-50 hover:text-[#4338CA]'
                }`}
              >
                <Compass className="w-4 h-4 text-[#4338CA] flex-shrink-0" aria-hidden="true" />
                <span>{t('browseTools') || 'Browse Tools'}</span>
              </Link>

              {/* Mobile AI JPG to Excel */}
              <Link
                href={getLangUrl('/jpg-to-excel')}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  pathname?.includes('/jpg-to-excel') ? 'bg-[#EEF2FF] text-[#4338CA]' : 'text-slate-700 hover:bg-slate-50 hover:text-[#4338CA]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="w-4 h-4 text-[#06B6D4] flex-shrink-0" aria-hidden="true" />
                  <span>AI JPG to Excel</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#ECFEFF] text-[#0E7490] border border-[rgba(6,182,212,0.25)]">
                  Gemini AI
                </span>
              </Link>

              {/* Mobile Free Tools Section */}
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setFreeToolsMobileOpen(!freeToolsMobileOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-blue-500" aria-hidden="true" />
                    <span>{t('freeTools') || 'Free Tools'}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${freeToolsMobileOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
                </button>
                
                {freeToolsMobileOpen && (
                  <div className="pl-4 space-y-4 mt-2 mb-2 animate-in slide-in-from-top-2 fade-in duration-200 border-l-2 border-slate-100 ml-4">
                    
                    {/* Mobile PDF Tools */}
                    <div>
                      <Link 
                        href={getLangUrl('/pdf-tools')}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-2 py-1 mb-1 text-xs font-black text-slate-900"
                      >
                        <div className="w-5 h-5 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
                          <FileText className="w-3 h-3" />
                        </div>
                        PDF Tools →
                      </Link>
                      <div className="grid grid-cols-1 gap-1 pl-7 max-h-48 overflow-y-auto">
                        {PDF_TOOLS.map(tool => (
                          <Link
                            key={tool.slug}
                            href={getLangUrl(`/${tool.slug}`)}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-[13px] font-medium text-slate-600 hover:text-blue-600 py-1"
                          >
                            {tool.name}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Mobile Image Tools */}
                    <div>
                      <Link 
                        href={getLangUrl('/image-tools')}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-2 py-1 mb-1 text-xs font-black text-slate-900"
                      >
                        <div className="w-5 h-5 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center">
                          <ImageIcon className="w-3 h-3" />
                        </div>
                        Image Tools →
                      </Link>
                      <div className="grid grid-cols-1 gap-1 pl-7 max-h-48 overflow-y-auto">
                        {Object.values(IMAGE_TOOL_DATA).map(tool => (
                          <Link
                            key={tool.slug}
                            href={getLangUrl(`/${tool.slug}`)}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-[13px] font-medium text-slate-600 hover:text-emerald-600 py-1"
                          >
                            {tool.name}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Mobile Calculators */}
                    <div>
                      <Link 
                        href={getLangUrl('/calculators')}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-2 py-1 mb-1 text-xs font-black text-slate-900"
                      >
                        <div className="w-5 h-5 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center">
                          <Calculator className="w-3 h-3" />
                        </div>
                        <span>Calculators →</span>
                      </Link>
                      <div className="grid grid-cols-1 gap-1 pl-7 max-h-48 overflow-y-auto">
                        {FEATURED_CALCULATORS.map(tool => (
                          <Link
                            key={tool.slug}
                            href={getLangUrl(`/${tool.slug}`)}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-[13px] font-medium text-slate-600 hover:text-emerald-600 py-1"
                          >
                            {tool.name}
                          </Link>
                        ))}
                      </div>
                    </div>

                  </div>
                )}
              </div>

              <Link
                href={getLangUrl('/categories')}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  pathname?.includes('/categories') ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                }`}
              >
                <LayoutGrid className="w-4 h-4 text-purple-500 flex-shrink-0" aria-hidden="true" />
                <span>{t('categories') || 'Categories'}</span>
              </Link>

              {/* Mobile Resources Section (Blogs + Events) */}
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setResourcesMobileOpen(!resourcesMobileOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-purple-500" aria-hidden="true" />
                    <span>{t('resources') || 'Resources'}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${resourcesMobileOpen ? 'rotate-180 text-purple-600' : 'text-slate-400'}`} />
                </button>
                
                {resourcesMobileOpen && (
                  <div className="pl-4 space-y-2 mt-2 mb-2 animate-in slide-in-from-top-2 fade-in duration-200 border-l-2 border-slate-100 ml-4">
                    <Link
                      href={getLangUrl('/blogs')}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{t('blogs') || 'AI Blog & Editorial'}</span>
                    </Link>

                    <Link
                      href={getLangUrl('/events')}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#4338CA]"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#4338CA]" />
                      <span>{t('events') === 'events' ? 'AI Events & Summits' : (t('events') || 'AI Events & Summits')}</span>
                    </Link>
                  </div>
                )}
              </div>

              {isSignedIn && (
                <>
                  <Link
                    href={getLangUrl('/dashboard')}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                      pathname?.includes('/dashboard') ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4 text-amber-500 flex-shrink-0" aria-hidden="true" />
                    <span>{t('myDashboard') || 'My Dashboard'}</span>
                  </Link>

                  {isAdmin && (
                    <Link
                      href={getLangUrl('/admin')}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                        pathname?.includes('/admin') ? 'bg-blue-50 text-blue-600' : 'text-blue-700 hover:bg-blue-50'
                      }`}
                    >
                      <Shield className="w-4 h-4 text-blue-600 flex-shrink-0" aria-hidden="true" />
                      <span>{t('admin') || 'Admin Panel'}</span>
                    </Link>
                  )}
                </>
              )}
            </nav>

            {/* Mobile Submit Tool Button */}
            <div className="pt-2 border-t border-slate-100">
              <Link 
                href={isSignedIn ? getLangUrl('/submit') : getLangUrl('/sign-in?callbackUrl=/submit')} 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-xs transition-all text-sm cursor-pointer"
              >
                <Upload className="w-4 h-4" aria-hidden="true" />
                <span>{t('submitTool') || 'Submit Tool'}</span>
              </Link>
            </div>

            {/* Mobile User Profile & Auth Section */}
            <div className="pt-3 border-t border-slate-100">
              {isSignedIn ? (
                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <div className="flex items-center gap-2.5 min-w-0">
                    {user?.image ? (
                      <img 
                        src={user.image} 
                        alt={user.name ? `${user.name}'s profile avatar` : 'User profile avatar'} 
                        className="w-8 h-8 rounded-full border border-slate-200 flex-shrink-0 object-cover" 
                      />
                    ) : (
                      <div 
                        className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs flex-shrink-0" 
                        aria-hidden="true"
                      >
                        {user?.name?.[0] || 'U'}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-bold text-xs text-slate-900 truncate">{user?.name || 'User'}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signOut({ callbackUrl: '/' });
                    }}
                    className="flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 bg-white hover:bg-red-50 px-2.5 py-1.5 rounded-lg border border-red-200 transition-colors flex-shrink-0 ml-2"
                  >
                    <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signIn('google', { callbackUrl: '/dashboard' });
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow-xs text-sm cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#FFF"/>
                  </svg>
                  <span>{t('signIn') || "Sign In with Google"}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

