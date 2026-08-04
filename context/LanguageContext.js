'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { LANGUAGES, TRANSLATIONS } from '@/lib/languages';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLangState] = useState('en');
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 1. Priority: Check URL query parameter ?lang=code
    const urlLang = searchParams?.get('lang');
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

    // 2. Secondary: Check localStorage
    const savedLang = localStorage.getItem('app_lang');
    if (savedLang && TRANSLATIONS[savedLang]) {
      setCurrentLangState(savedLang);
      const langObj = LANGUAGES.find(l => l.code === savedLang);
      if (langObj) {
        document.documentElement.lang = savedLang;
        document.documentElement.dir = langObj.dir || 'ltr';
      }
    }
  }, [searchParams]);

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

      // Update URL with ?lang=code so every language page has its own unique Google-indexable URL
      const currentParams = new URLSearchParams(searchParams ? searchParams.toString() : '');
      if (langCode === 'en') {
        currentParams.delete('lang');
      } else {
        currentParams.set('lang', langCode);
      }
      
      const newQuery = currentParams.toString();
      const newUrl = `${pathname}${newQuery ? `?${newQuery}` : ''}`;
      router.push(newUrl, { scroll: false });
    }
  };

  const t = (key) => {
    const langDict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    return langDict[key] || TRANSLATIONS.en[key] || key;
  };

  const langObj = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  return (
    <LanguageContext.Provider value={{ currentLang, setLanguage, t, langObj, languages: LANGUAGES }}>
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
      languages: LANGUAGES
    };
  }
  return context;
}
