'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Sparkles, Upload, Globe, ChevronDown, Check, LogOut, User, Menu, X, Compass, LayoutGrid, BookOpen, LayoutDashboard, Shield } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import FlagIcon from '@/components/FlagIcon';

export default function Navigation() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isSignedIn = status === 'authenticated';
  const user = session?.user;
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentLang, setLanguage, t, langObj, languages, getLangUrl } = useLanguage();
  const dropdownRef = useRef(null);
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

  // Close dropdown and mobile menu on route change
  useEffect(() => {
    setLangDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close dropdown on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
      if (mobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('#mobile-menu-toggle')) {
        setMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setLangDropdownOpen(false);
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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-2">
          {/* Logo */}
          <Link href={getLangUrl('/')} className="flex items-center space-x-2 hover:opacity-80 transition-opacity flex-shrink-0" prefetch={true}>
            <img src="/logo.jpg" alt="Best AI Tools Free" className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg object-cover" />
            <span className="font-bold text-lg sm:text-xl text-black inline-block">Best AI Tools Free</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link 
              href={getLangUrl('/tools')} 
              className={`transition-colors font-medium text-sm lg:text-base ${pathname?.includes('/tools') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              prefetch={true}
            >
              {t('browseTools')}
            </Link>
            <Link 
              href={getLangUrl('/categories')} 
              className={`transition-colors font-medium text-sm lg:text-base ${pathname?.includes('/categories') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              prefetch={true}
            >
              {t('categories')}
            </Link>
            <Link 
              href={getLangUrl('/blogs')} 
              className={`transition-colors font-medium text-sm lg:text-base ${pathname?.includes('/blogs') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              prefetch={true}
            >
              {t('blogs')}
            </Link>
            {isSignedIn && (
              <>
                <Link 
                  href={getLangUrl('/dashboard')} 
                  className={`transition-colors font-medium text-sm lg:text-base ${pathname?.includes('/dashboard') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                  prefetch={true}
                >
                  {t('myDashboard')}
                </Link>
                {isAdmin && (
                  <Link 
                    href={getLangUrl('/admin')} 
                    className={`transition-colors font-medium text-sm lg:text-base ${pathname?.includes('/admin') ? 'text-blue-600' : 'text-blue-700 hover:text-blue-600'}`}
                    prefetch={true}
                  >
                    {t('admin')}
                  </Link>
                )}
              </>
            )}
          </nav>

          {/* Header Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher Dropdown (Desktop & Header) */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full border border-gray-200 transition-colors cursor-pointer"
                aria-label="Select Language"
                aria-haspopup="listbox"
                aria-expanded={langDropdownOpen}
                aria-controls="language-dropdown-menu"
              >
                <FlagIcon code={currentLang} className="w-4 h-3 rounded-[2px] shadow-sm inline-block object-cover flex-shrink-0" />
                <span className="uppercase font-bold text-xs">{currentLang}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>

              {langDropdownOpen && (
                <div
                  id="language-dropdown-menu"
                  role="listbox"
                  aria-label="Languages"
                  className="absolute right-0 mt-2 w-52 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="px-3.5 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1.5 mb-1">
                    Select Language
                  </div>
                  <div className="max-h-60 overflow-y-auto overscroll-contain">
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
                        className={`w-full flex items-center justify-between px-3.5 py-2 text-sm text-left hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer ${
                          currentLang === lang.code ? 'font-bold text-blue-600 bg-blue-50/70' : 'text-slate-700'
                        }`}
                      >
                        <span className="flex items-center gap-2.5 min-w-0">
                          <FlagIcon code={lang.code} className="w-4 h-3 rounded-[2px] shadow-sm flex-shrink-0" />
                          <span className="truncate">{lang.name}</span>
                        </span>
                        {currentLang === lang.code && <Check className="w-4 h-4 text-blue-600 flex-shrink-0 ml-2" aria-hidden="true" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Auth / Submit Tool */}
            <div className="hidden md:flex items-center gap-3">
              {isSignedIn ? (
                <div className="flex items-center gap-3">
                  <Link href={getLangUrl('/submit')} prefetch={true}>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm">
                      <Upload className="w-4 h-4 mr-2" aria-hidden="true" />
                      {t('submitTool')}
                    </Button>
                  </Link>
                  <div className="flex items-center gap-2">
                    {user?.image ? (
                      <img src={user.image} alt={user.name ? `${user.name}'s profile avatar` : 'User profile avatar'} className="w-8 h-8 rounded-full border border-gray-200" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm" aria-hidden="true">
                        {user?.name?.[0] || 'U'}
                      </div>
                    )}
                    <button 
                      type="button"
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="text-gray-500 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                      title="Sign Out"
                      aria-label="Sign Out"
                    >
                      <LogOut className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href={getLangUrl('/submit')}>
                    <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 font-medium text-sm">
                      <Upload className="w-4 h-4 mr-[6px]" aria-hidden="true" />
                      {t('submitTool')}
                    </Button>
                  </Link>
                  
                  <button 
                    type="button"
                    onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-sm transition-all shadow-md cursor-pointer"
                    aria-label={t('signIn') || "Sign In with Google"}
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#FFF"/>
                    </svg>
                    <span>{t('signIn')}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer / Dropdown Panel */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 top-16 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
          aria-hidden="true"
        >
          <div 
            id="mobile-navigation-drawer"
            ref={mobileMenuRef}
            className="bg-white border-b border-slate-200 shadow-2xl px-5 py-6 space-y-6 max-h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain animate-in slide-in-from-top-4 duration-200"
          >
            {/* Primary Nav Links */}
            <nav className="flex flex-col space-y-1.5" aria-label="Mobile Navigation">
              <Link
                href={getLangUrl('/tools')}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-base font-semibold transition-colors ${
                  pathname?.includes('/tools') ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                }`}
              >
                <Compass className="w-5 h-5 text-blue-500 flex-shrink-0" aria-hidden="true" />
                <span>{t('browseTools')}</span>
              </Link>

              <Link
                href={getLangUrl('/categories')}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-base font-semibold transition-colors ${
                  pathname?.includes('/categories') ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                }`}
              >
                <LayoutGrid className="w-5 h-5 text-purple-500 flex-shrink-0" aria-hidden="true" />
                <span>{t('categories')}</span>
              </Link>

              <Link
                href={getLangUrl('/blogs')}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-base font-semibold transition-colors ${
                  pathname?.includes('/blogs') ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                }`}
              >
                <BookOpen className="w-5 h-5 text-emerald-500 flex-shrink-0" aria-hidden="true" />
                <span>{t('blogs')}</span>
              </Link>

              {isSignedIn && (
                <>
                  <Link
                    href={getLangUrl('/dashboard')}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-base font-semibold transition-colors ${
                      pathname?.includes('/dashboard') ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                    }`}
                  >
                    <LayoutDashboard className="w-5 h-5 text-amber-500 flex-shrink-0" aria-hidden="true" />
                    <span>{t('myDashboard')}</span>
                  </Link>

                  {isAdmin && (
                    <Link
                      href={getLangUrl('/admin')}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-base font-semibold transition-colors ${
                        pathname?.includes('/admin') ? 'bg-blue-50 text-blue-600' : 'text-blue-700 hover:bg-blue-50'
                      }`}
                    >
                      <Shield className="w-5 h-5 text-blue-600 flex-shrink-0" aria-hidden="true" />
                      <span>{t('admin')}</span>
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
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all text-base"
              >
                <Upload className="w-5 h-5" aria-hidden="true" />
                <span>{t('submitTool')}</span>
              </Link>
            </div>

            {/* Mobile User Profile & Auth Section */}
            <div className="pt-4 border-t border-slate-100">
              {isSignedIn ? (
                <div className="flex items-center justify-between bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                  <div className="flex items-center gap-3 min-w-0">
                    {user?.image ? (
                      <img src={user.image} alt={user.name ? `${user.name}'s profile avatar` : 'User profile avatar'} className="w-10 h-10 rounded-full border border-gray-200 flex-shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-base flex-shrink-0" aria-hidden="true">
                        {user?.name?.[0] || 'U'}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-slate-900 truncate">{user?.name || 'User'}</p>
                      <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signOut({ callbackUrl: '/' });
                    }}
                    className="flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 bg-white hover:bg-red-50 px-3 py-2 rounded-xl border border-red-200 transition-colors flex-shrink-0 ml-2"
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
                  className="w-full flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-sm text-base"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
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
