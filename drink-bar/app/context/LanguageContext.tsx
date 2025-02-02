'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  // Carregar idioma do cookie quando a página carregar
  useEffect(() => {
    const savedLanguage = Cookies.get('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Atualizar idioma e armazenar no cookie
  const changeLanguage = (lang) => {
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
