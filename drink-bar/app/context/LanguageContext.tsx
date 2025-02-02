'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';

// Definindo o tipo para o valor do contexto
interface LanguageContextType {
  language: string;
  changeLanguage: (lang: string) => void;
}

// Tipo para o componente LanguageProvider
interface LanguageProviderProps {
  children: ReactNode;
}

// Valor inicial para o contexto (o valor pode ser indefinido até que o Provider seja usado)
const LanguageContext = createContext<LanguageContextType | null>(null);

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

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
