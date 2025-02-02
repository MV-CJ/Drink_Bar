'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';

const LanguageContext = createContext(null);

interface LanguageProviderProps {
  children: ReactNode; // Define o tipo para 'children' como ReactNode
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState('en');

  // Carregar idioma do cookie quando a página carregar
  useEffect(() => {
    const savedLanguage = Cookies.get('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Atualizar idioma e armazenar no cookie
  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    Cookies.set('language', lang, { expires: 30 }); // Expira em 30 dias
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
