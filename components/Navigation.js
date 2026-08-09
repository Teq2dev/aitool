'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignInButton, UserButton, SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Sparkles, Upload, Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Navigation() {
  const pathname = usePathname();
  const { user, isLoaded, isSignedIn } = useUser();
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
            <SignedIn>
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
            </SignedIn>
          </nav>

          <div className="flex items-center gap-3">
            {/* Language Switcher Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full border border-gray-200 transition-colors"
                aria-label="Select Language"
              >
                <span className="text-base">{langObj?.flag || '🌐'}</span>
                <span className="hidden sm:inline-block uppercase font-bold text-xs">{currentLang}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider border-b pb-1 mb-1">
                    Select Language
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm text-left hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                          currentLang === lang.code ? 'font-bold text-blue-600 bg-blue-50/50' : 'text-gray-700'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-base">{lang.flag}</span>
                          <span>{lang.name}</span>
                        </span>
                        {currentLang === lang.code && <Check className="w-4 h-4 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {!isLoaded ? (
              <div className="flex items-center gap-2">
                <Link href={getLangUrl('/submit')}>
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 hidden sm:flex">
                    <Upload className="w-4 h-4 mr-2" />
                    {t('submitTool')}
                  </Button>
                </Link>
                <SignInButton mode="modal">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-sm transition-colors shadow-sm cursor-pointer">
                    {t('signIn')}
                  </button>
                </SignInButton>
              </div>
            ) : (
              <>
                <SignedIn>
                  <Link href={getLangUrl('/submit')} prefetch={true}>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Upload className="w-4 h-4 mr-2" />
                      {t('submitTool')}
                    </Button>
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
                <SignedOut>
                  <div className="flex items-center gap-2">
                    <Link href={getLangUrl('/submit')}>
                      <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 hidden sm:flex">
                        <Upload className="w-4 h-4 mr-2" />
                        {t('submitTool')}
                      </Button>
                    </Link>
                    
                    <SignInButton mode="modal">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-sm transition-colors shadow-sm cursor-pointer">
                        {t('signIn')}
                      </button>
                    </SignInButton>
                  </div>
                </SignedOut>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}