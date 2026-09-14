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
  Image as ImageIcon
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import FlagIcon from '@/components/FlagIcon';
import { PDF_TOOLS } from '@/lib/pdfConfig';
import { IMAGE_TOOL_DATA } from '@/lib/imageToolData';

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

  const { currentLang, setLanguage, t, languages, getLangUrl } = useLanguage();

    // Free Tools click outside & Escape
    useEffect(() => {
      const handleEscape = (e) => {
        if (e.key === 'Escape') setFreeToolsOpen(false);
      };
      const handleClickOutside = (e) => {
        if (freeToolsRef.current && !freeToolsRef.current.contains(e.target)) {
          setFreeToolsOpen(false);
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
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85 shadow-2xs">
      <div className="container mx-auto px-3 sm:px-5">
        {/* Height reduced by ~20% from h-16 (64px) to h-[52px] */}
        <div className="flex h-[52px] items-center justify-between gap-2">
          
          {/* Logo */}
          <Link 
            href={getLangUrl('/')} 
            className="flex items-center space-x-2 hover:opacity-85 transition-opacity flex-shrink-0" 
            prefetch={true}
          >
            <img 
              src="/logo.png" 
              alt="Best AI Tools Free" 
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-contain" 
            />
            <span className="font-bold text-base sm:text-lg text-slate-900 tracking-tight inline-block">
              Best AI Tools Free
            </span>
          </Link>

          {/* Desktop Navigation Links (Cleaned: My Dashboard & Admin moved to Profile Dropdown) */}
          <nav className="hidden md:flex items-center space-x-5 lg:space-x-7" aria-label="Main Navigation">
            <Link 
              href={getLangUrl('/tools')} 
              className={`transition-colors font-medium text-sm py-1 ${
                pathname?.includes('/tools') ? 'text-blue-600 font-semibold' : 'text-slate-700 hover:text-blue-600'
              }`}
              prefetch={true}
            >
              {t('browseTools') || 'Browse Tools'}
            </Link>

            {/* Free Tools Dropdown (Desktop Mega-Menu) */}
            <div className="relative" ref={freeToolsRef}>
              <button 
                type="button"
                onClick={() => setFreeToolsOpen(!freeToolsOpen)}
                className={`flex items-center gap-1.5 font-medium text-sm transition-colors py-1 cursor-pointer focus:outline-none ${freeToolsOpen || pathname?.includes('/tools') ? 'text-blue-600' : 'text-slate-700 hover:text-blue-600'}`}
                aria-expanded={freeToolsOpen}
                aria-haspopup="true"
              >
                <span>{t('freeTools') || 'Free Tools'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${freeToolsOpen ? 'rotate-180 opacity-100 text-blue-600' : 'opacity-60'}`} aria-hidden="true" />
              </button>
              
              {freeToolsOpen && (
                <div className="absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 w-[600px] bg-white rounded-2xl shadow-2xl border border-slate-200/60 transition-all duration-200 z-50 animate-in fade-in slide-in-from-top-2 overflow-hidden">
                  <div className="grid grid-cols-2 gap-0 divide-x divide-slate-100">
                    
                    {/* PDF Tools Column */}
                    <div className="p-4 bg-slate-50/30">
                      <div className="flex items-center justify-between mb-3 px-2">
                        <Link 
                          href={getLangUrl('/pdf-tools')}
                          onClick={() => setFreeToolsOpen(false)} 
                          className="flex items-center gap-2 text-sm font-black text-slate-900 hover:text-blue-600 transition-colors group"
                        >
                          <div className="w-6 h-6 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center">
                            <FileText className="w-3.5 h-3.5" />
                          </div>
                          PDF Tools
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-600">→</span>
                        </Link>
                      </div>
                      <div className="grid grid-cols-1 gap-0.5 max-h-[360px] overflow-y-auto pr-2 custom-scrollbar">
                        {PDF_TOOLS.map((tool) => (
                          <Link
                            key={tool.slug}
                            href={getLangUrl(`/${tool.slug}`)}
                            onClick={() => setFreeToolsOpen(false)}
                            className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all text-slate-600 hover:text-blue-600 text-[13px] font-medium"
                          >
                            <span className="w-1 h-1 rounded-full bg-blue-300 opacity-50"></span>
                            {tool.name}
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
                          className="flex items-center gap-2 text-sm font-black text-slate-900 hover:text-emerald-600 transition-colors group"
                        >
                          <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center">
                            <ImageIcon className="w-3.5 h-3.5" />
                          </div>
                          Image Tools
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-emerald-600">→</span>
                        </Link>
                      </div>
                      <div className="grid grid-cols-1 gap-0.5 max-h-[360px] overflow-y-auto pr-2 custom-scrollbar">
                        {Object.values(IMAGE_TOOL_DATA).map((tool) => (
                          <Link
                            key={tool.slug}
                            href={getLangUrl(`/${tool.slug}`)}
                            onClick={() => setFreeToolsOpen(false)}
                            className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-all text-slate-600 hover:text-emerald-600 text-[13px] font-medium"
                          >
                            <span className="w-1 h-1 rounded-full bg-emerald-300 opacity-50"></span>
                            {tool.name}
                          </Link>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>
<Link 
              href={getLangUrl('/categories')} 
              className={`transition-colors font-medium text-sm py-1 ${
                pathname?.includes('/categories') ? 'text-blue-600 font-semibold' : 'text-slate-700 hover:text-blue-600'
              }`}
              prefetch={true}
            >
              {t('categories') || 'Categories'}
            </Link>

            <Link 
              href={getLangUrl('/blogs')} 
              className={`transition-colors font-medium text-sm py-1 ${
                pathname?.includes('/blogs') ? 'text-blue-600 font-semibold' : 'text-slate-700 hover:text-blue-600'
              }`}
              prefetch={true}
            >
              {t('blogs') || 'Blogs'}
            </Link>
          </nav>

          {/* Header Right Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            
            {/* Task 2: Collapsible Header Search */}
            <div className="relative flex items-center" ref={searchContainerRef}>
              {searchOpen ? (
                <form 
                  onSubmit={handleSearchSubmit} 
                  role="search"
                  className="flex items-center bg-slate-100 hover:bg-slate-150 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 rounded-full border border-slate-200 shadow-xs transition-all duration-200 w-44 sm:w-60 md:w-64 px-2.5 py-1"
                >
                  <Search className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mr-1.5" aria-hidden="true" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('searchPlaceholder') || "Search AI tools..."}
                    aria-label="Search tools"
                    className="w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition-colors flex-shrink-0 ml-1"
                    aria-label="Close search"
                  >
                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                  aria-label="Search tools"
                  title="Search AI tools"
                >
                  <Search className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Language Switcher Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 px-2 sm:px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-full border border-slate-200 transition-colors cursor-pointer"
                aria-label="Select Language"
                aria-haspopup="listbox"
                aria-expanded={langDropdownOpen}
                aria-controls="language-dropdown-menu"
              >
                <FlagIcon code={currentLang} className="w-3.5 h-2.5 rounded-[2px] shadow-2xs inline-block object-cover flex-shrink-0" />
                <span className="uppercase font-bold text-[11px]">{currentLang}</span>
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

            {/* Submit Tool Button (Desktop primary action, compact height) */}
            <div className="hidden sm:flex items-center">
              <Link href={isSignedIn ? getLangUrl('/submit') : getLangUrl('/sign-in?callbackUrl=/submit')} prefetch={true}>
                <Button className="h-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-3 py-1 rounded-lg shadow-xs transition-all cursor-pointer">
                  <Upload className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
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
                  className="h-8 flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold px-3 py-1 rounded-lg text-xs transition-all shadow-xs cursor-pointer"
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
              className="md:hidden p-1.5 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
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
          className="fixed inset-0 top-[52px] bg-slate-900/40 backdrop-blur-xs z-40 md:hidden animate-in fade-in duration-200"
          aria-hidden="true"
        >
          <div 
            id="mobile-navigation-drawer"
            ref={mobileMenuRef}
            className="bg-white border-b border-slate-200 shadow-2xl px-4 py-5 space-y-4 max-h-[calc(100vh-3.5rem)] overflow-y-auto overscroll-contain animate-in slide-in-from-top-4 duration-200"
          >
            {/* Primary Nav Links */}
            <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
              <Link
                href={getLangUrl('/tools')}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  pathname?.includes('/tools') ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                }`}
              >
                <Compass className="w-4 h-4 text-blue-500 flex-shrink-0" aria-hidden="true" />
                <span>{t('browseTools') || 'Browse Tools'}</span>
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

              <Link
                href={getLangUrl('/blogs')}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  pathname?.includes('/blogs') ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                }`}
              >
                <BookOpen className="w-4 h-4 text-emerald-500 flex-shrink-0" aria-hidden="true" />
                <span>{t('blogs') || 'Blogs'}</span>
              </Link>

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

