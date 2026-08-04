'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { LANGUAGES, TRANSLATIONS } from '@/lib/languages';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    // Load language preference from localStorage or cookie
    const savedLang = localStorage.getItem('app_lang');
    if (savedLang && TRANSLATIONS[savedLang]) {
      setCurrentLang(savedLang);
    }
  }, []);

  const setLanguage = (langCode) => {
    if (TRANSLATIONS[langCode]) {
      setCurrentLang(langCode);
      localStorage.setItem('app_lang', langCode);
      // Set cookie for SSR/SEO recognition
      document.cookie = `app_lang=${langCode}; path=/; max-age=31536000; SameSite=Lax`;
      
      // Update HTML lang and dir attributes
      const langObj = LANGUAGES.find(l => l.code === langCode);
      if (langObj) {
        document.documentElement.lang = langCode;
        document.documentElement.dir = langObj.dir || 'ltr';
      }
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
    // Fallback safe object if used outside provider
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
