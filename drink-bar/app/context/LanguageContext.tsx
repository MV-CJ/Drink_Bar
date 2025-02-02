import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';

// Defining the type for the context value
interface LanguageContextType {
  language: string;
  changeLanguage: (lang: string) => void;
}

// Type for the LanguageProvider component
interface LanguageProviderProps {
  children: ReactNode;
}

// Default value for the context (initializing with default language and a dummy change function)
const LanguageContext = createContext<LanguageContextType>({
  language: 'en', // default language
  changeLanguage: () => {}, // dummy function for initial state
});

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState('en');

  // Load language from cookie when the page loads
  useEffect(() => {
    const savedLanguage = Cookies.get('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Update language and store in the cookie
  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    Cookies.set('language', lang, { expires: 30 }); // Expires in 30 days
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
