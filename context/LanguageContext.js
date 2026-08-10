'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LANGUAGES, TRANSLATIONS } from '@/lib/languages';

const LanguageContext = createContext();
const VALID_LANGS = ['es', 'fr', 'de', 'pt', 'ar', 'ru', 'ja', 'zh', 'it', 'nl'];

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLangState] = useState('en');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 1. Detect language from URL pathname prefix (e.g. /fr, /es/tools/midjourney)
    const segments = pathname ? pathname.split('/').filter(Boolean) : [];
    const firstSegment = segments[0];

    if (firstSegment && VALID_LANGS.includes(firstSegment)) {
      setCurrentLangState(firstSegment);
      localStorage.setItem('app_lang', firstSegment);
      document.cookie = `app_lang=${firstSegment}; path=/; max-age=31536000; SameSite=Lax`;
      const langObj = LANGUAGES.find(l => l.code === firstSegment);
      if (langObj) {
        document.documentElement.lang = firstSegment;
        document.documentElement.dir = langObj.dir || 'ltr';
      }
      return;
    }

    // 2. Check query parameter ?lang=code
    let urlLang = null;
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      urlLang = urlParams.get('lang');
    }
    
    if (urlLang && TRANSLATIONS[urlLang]) {
      setCurrentLangState(urlLang);
      localStorage.setItem('app_lang', urlLang);
      document.cookie = `app_lang=${urlLang}; path=/; max-age=31536000; SameSite=Lax`;
      const langObj = LANGUAGES.find(l => l.code === urlLang);
      if (langObj) {
        document.documentElement.lang = urlLang;
        document.documentElement.dir = langObj.dir || 'ltr';
      }
      return;
    }

    // 3. Fallback to localStorage
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('app_lang');
      if (savedLang && TRANSLATIONS[savedLang]) {
        setCurrentLangState(savedLang);
        const langObj = LANGUAGES.find(l => l.code === savedLang);
        if (langObj) {
          document.documentElement.lang = savedLang;
          document.documentElement.dir = langObj.dir || 'ltr';
        }
      }
    }
  }, [pathname]);

  const setLanguage = (langCode) => {
    if (TRANSLATIONS[langCode]) {
      setCurrentLangState(langCode);
      localStorage.setItem('app_lang', langCode);
      document.cookie = `app_lang=${langCode}; path=/; max-age=31536000; SameSite=Lax`;

      const langObj = LANGUAGES.find(l => l.code === langCode);
      if (langObj) {
        document.documentElement.lang = langCode;
        document.documentElement.dir = langObj.dir || 'ltr';
      }

      // Strip existing language prefix from pathname
      const segments = pathname ? pathname.split('/').filter(Boolean) : [];
      if (segments.length > 0 && VALID_LANGS.includes(segments[0])) {
        segments.shift();
      }
      const cleanPath = '/' + segments.join('/');

      // Construct subpath URL e.g. /fr/tools/midjourney or /fr or /
      let newUrl = '';
      if (langCode === 'en') {
        newUrl = cleanPath;
      } else {
        newUrl = `/${langCode}${cleanPath === '/' ? '' : cleanPath}`;
      }

      // Retain non-lang search params
      let queryStr = '';
      if (typeof window !== 'undefined') {
        const currentParams = new URLSearchParams(window.location.search);
        currentParams.delete('lang');
        queryStr = currentParams.toString();
      }
      
      if (queryStr) {
        newUrl += `?${queryStr}`;
      }

      router.push(newUrl, { scroll: false });
    }
  };

  const getLangUrl = (path) => {
    if (!path) return '/';
    if (currentLang === 'en') return path;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `/${currentLang}${cleanPath === '/' ? '' : cleanPath}`;
  };

  const t = (key) => {
    const langDict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    return langDict[key] || TRANSLATIONS.en[key] || key;
  };

  const langObj = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  return (
    <LanguageContext.Provider value={{ currentLang, setLanguage, t, langObj, languages: LANGUAGES, getLangUrl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      currentLang: 'en',
      setLanguage: () => {},
      t: (key) => TRANSLATIONS.en[key] || key,
      langObj: LANGUAGES[0],
      languages: LANGUAGES,
      getLangUrl: (p) => p
    };
  }
  return context;
}
