'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Sparkles, Upload, Globe, ChevronDown, Check, LogOut, User } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Navigation() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isSignedIn = status === 'authenticated';
  const user = session?.user;
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { currentLang, setLanguage, t, langObj, languages, getLangUrl } = useLanguage();
  const dropdownRef = useRef(null);

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

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href={getLangUrl('/')} className="flex items-center space-x-2 hover:opacity-80 transition-opacity" prefetch={true}>
            <img src="/logo.jpg" alt="Best AI Tools Free" className="w-10 h-10 rounded-lg object-cover" />
            <span className="font-bold text-xl text-black hidden sm:inline">Best AI Tools Free</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href={getLangUrl('/tools')} 
              className={`transition-colors font-medium ${pathname?.includes('/tools') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              prefetch={true}
            >
              {t('browseTools')}
            </Link>
            <Link 
              href={getLangUrl('/categories')} 
              className={`transition-colors font-medium ${pathname?.includes('/categories') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              prefetch={true}
            >
              {t('categories')}
            </Link>
            <Link 
              href={getLangUrl('/blogs')} 
              className={`transition-colors font-medium ${pathname?.includes('/blogs') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              prefetch={true}
            >
              {t('blogs')}
            </Link>
            {isSignedIn && (
              <>
                <Link 
                  href={getLangUrl('/dashboard')} 
                  className={`transition-colors font-medium ${pathname?.includes('/dashboard') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                  prefetch={true}
                >
                  {t('myDashboard')}
                </Link>
                {isAdmin && (
                  <Link 
                    href={getLangUrl('/admin')} 
                    className={`transition-colors font-medium ${pathname?.includes('/admin') ? 'text-blue-600' : 'text-blue-700 hover:text-blue-600'}`}
                    prefetch={true}
                  >
                    {t('admin')}
                  </Link>
                )}
              </>
            )}
          </nav>

          <div className="flex items-center gap-3">
            {/* Language Switcher Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full border border-gray-200 transition-colors cursor-pointer"
                aria-label="Select Language"
                aria-haspopup="listbox"
                aria-expanded={langDropdownOpen}
                aria-controls="language-dropdown-menu"
              >
                <span className="text-base" aria-hidden="true">{langObj?.flag || '🌐'}</span>
                <span className="hidden sm:inline-block uppercase font-bold text-xs">{currentLang}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" aria-hidden="true" />
              </button>

              {langDropdownOpen && (
                <div
                  id="language-dropdown-menu"
                  role="listbox"
                  aria-label="Languages"
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="px-3 py-1 text-xs font-bold text-gray-500 uppercase tracking-wider border-b pb-1 mb-1">
                    Select Language
                  </div>
                  <div className="max-h-64 overflow-y-auto">
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
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm text-left hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                          currentLang === lang.code ? 'font-bold text-blue-600 bg-blue-50/50' : 'text-gray-700'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-base" aria-hidden="true">{lang.flag}</span>
                          <span>{lang.name}</span>
                        </span>
                        {currentLang === lang.code && <Check className="w-4 h-4 text-blue-600" aria-hidden="true" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {isSignedIn ? (
              <div className="flex items-center gap-3">
                <Link href={getLangUrl('/submit')} prefetch={true}>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
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
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 font-medium">
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
        </div>
      </div>
    </header>
  );
}