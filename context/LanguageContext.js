'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LANGUAGES } from '@/lib/languages';
import { loaders } from '@/lib/translations';

const LanguageContext = createContext();
const VALID_LANGS = ['es', 'fr', 'de', 'pt', 'ar', 'ru', 'ja', 'zh', 'it', 'nl'];

export function LanguageProvider({ children, initialLang = 'en', initialTranslations = null }) {
  const router = useRouter();
  const pathname = usePathname();

  // Helper to extract language directly from current URL pathname
  const getUrlLang = useCallback(() => {
    const segments = pathname ? pathname.split('/').filter(Boolean) : [];
    const first = segments[0];
    if (first && VALID_LANGS.includes(first)) return first;
    return initialLang || 'en';
  }, [pathname, initialLang]);

  const [currentLang, setCurrentLangState] = useState(getUrlLang);
  
  // Cache of loaded dictionaries: { en: {...}, fr: {...} }
  const [translationsCache, setTranslationsCache] = useState(() => {
    const initial = {};
    const effectiveLang = getUrlLang();
    if (initialTranslations) {
      initial[effectiveLang] = initialTranslations;
    }
    return initial;
  });

  // Ensure active language is loaded asynchronously if navigating to a localized URL
  useEffect(() => {
    const lang = getUrlLang();
    setCurrentLangState(lang);

    // Apply document lang and direction
    const langObj = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];
    document.documentElement.lang = lang;
    document.documentElement.dir = langObj.dir || 'ltr';

    if (!translationsCache[lang] && loaders[lang]) {
      loaders[lang]().then(data => {
        setTranslationsCache(prev => ({
          ...prev,
          [lang]: data.default || data
        }));
      });
    }
  }, [pathname, getUrlLang]);

  const setLanguage = async (newLang) => {
    if (newLang === currentLang) return;

    // Dynamically lazy-load only the newly selected language if not in cache
    if (!translationsCache[newLang] && loaders[newLang]) {
      try {
        const data = await loaders[newLang]();
        setTranslationsCache(prev => ({
          ...prev,
          [newLang]: data.default || data
        }));
      } catch (e) {
        console.error('Error loading translation chunk for', newLang, e);
      }
    }

    setCurrentLangState(newLang);
    localStorage.setItem('app_lang', newLang);
    document.cookie = `app_lang=${newLang}; path=/; max-age=31536000; SameSite=Lax`;

    const langObj = LANGUAGES.find(l => l.code === newLang);
    if (langObj) {
      document.documentElement.lang = newLang;
      document.documentElement.dir = langObj.dir || 'ltr';
    }

    // Strip existing language prefix from pathname
    const segments = pathname ? pathname.split('/').filter(Boolean) : [];
    if (segments.length > 0 && VALID_LANGS.includes(segments[0])) {
      segments.shift();
    }
    const cleanPath = '/' + segments.join('/');

    // Construct clean localized route
    let newUrl = '';
    if (newLang === 'en') {
      newUrl = cleanPath;
    } else {
      newUrl = `/${newLang}${cleanPath === '/' ? '' : cleanPath}`;
    }

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
  };

  const getLangUrl = (path) => {
    if (!path) return '/';
    if (currentLang === 'en') return path;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `/${currentLang}${cleanPath === '/' ? '' : cleanPath}`;
  };

  const t = (key) => {
    const activeDict = translationsCache[currentLang];
    if (activeDict && activeDict[key]) {
      return activeDict[key];
    }
    if (initialTranslations && initialTranslations[key]) {
      return initialTranslations[key];
    }
    return key;
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
      t: (key) => key,
      langObj: LANGUAGES[0],
      languages: LANGUAGES,
      getLangUrl: (p) => p
    };
  }
  return context;
}
