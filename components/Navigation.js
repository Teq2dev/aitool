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
  Search 
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import FlagIcon from '@/components/FlagIcon';

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

  const { currentLang, setLanguage, t, languages, getLangUrl } = useLanguage();
  
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
              src="/logo.jpg" 
              alt="Best AI Tools Free" 
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-cover shadow-2xs" 
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

            {/* Task 4: Free Tools (Non-clickable, Red Pulsing Dot, Coming Soon) */}
            <div 
              className="relative group flex items-center gap-1.5 font-medium text-sm text-slate-700 select-none cursor-default py-1"
              title="Free Tools - Coming Soon"
              role="status"
              aria-label="Free Tools - Coming Soon"
            >
              <span>{t('freeTools') || 'Free Tools'}</span>
              
              {/* Subtle pulsing red status dot */}
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-60"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.7)]"></span>
              </span>

              {/* Small Coming Soon badge */}
              <span className="inline-flex text-[10px] font-bold text-red-600 bg-red-50 border border-red-200/70 rounded-full px-1.5 py-0.5 leading-none shadow-2xs">
                Coming Soon
              </span>
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
              <Link href={getLangUrl('/submit')} prefetch={true}>
                <Button className="h-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-3 py-1 rounded-lg shadow-xs transition-all">
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

              {/* Mobile Free Tools Non-clickable Item */}
              <div 
                className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 bg-slate-50/80 select-none cursor-default"
                role="status"
                aria-label="Free Tools - Coming Soon"
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-red-500 flex-shrink-0" aria-hidden="true" />
                  <span>{t('freeTools') || 'Free Tools'}</span>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-60"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 shadow-[0_0_4px_rgba(239,68,68,0.7)]"></span>
                  </span>
                </div>
                <span className="text-[10px] font-bold text-red-600 bg-red-100/80 border border-red-200/80 rounded-full px-2 py-0.5 leading-none">
                  Coming Soon
                </span>
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
                href={getLangUrl('/submit')} 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-xs transition-all text-sm"
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

