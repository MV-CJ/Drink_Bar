// layout.tsx
'use client';

import './globals.css';
import { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext' // Importando o contexto

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <LayoutWithLanguage>{children}</LayoutWithLanguage>
    </LanguageProvider>
  );
}

function LayoutWithLanguage({ children }: { children: React.ReactNode }) {
  const { language, setLanguage } = useLanguage(); // Obtendo o idioma do contexto

  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <html lang={language}>
      <body className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-200 min-h-screen flex flex-col">
        <header className="bg-gray-800 shadow-md text-gray-100 py-5 px-8">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold">
              Drink<span className="text-accent-color">Craft</span>
            </h1>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <a href="#" className="hover:text-accent-color transition duration-200">Home</a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent-color transition duration-200">Categories</a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent-color transition duration-200">Contact</a>
                </li>
              </ul>
            </nav>
            <div className="flex space-x-4">
              <label className="text-sm text-gray-300">
                <input
                  type="radio"
                  value="en"
                  checked={language === 'en'}
                  onChange={handleLanguageChange}
                />
                English
              </label>
              <label className="text-sm text-gray-300">
                <input
                  type="radio"
                  value="fr"
                  checked={language === 'fr'}
                  onChange={handleLanguageChange}
                />
                Français
              </label>
            </div>
          </div>
        </header>
        <main className="flex-grow max-w-7xl mx-auto p-8">
          {children}
        </main>
        <footer className="bg-gray-800 py-4 text-gray-400 text-center">
          <p>© 2025 DrinkCraft. Elevating the art of cocktails.</p>
        </footer>
      </body>
    </html>
  );
}
