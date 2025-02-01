// page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from './context/LanguageContext'; // Importando o contexto de idioma
import CategoryCard from './components/CategoryCard';
import DrinkCard from './components/DrinkCard';

export default function Home() {
  const { language } = useLanguage(); // Obtendo o idioma do contexto
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Buscar os drinks na API
  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await fetch('/api/drinks');
        const data = await response.json();
        setDrinks(data.drinks);
      } catch (error) {
        console.error('Error fetching drinks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrinks();
  }, []);

  const categories = [
    { name: 'Signature Cocktails', count: 50, color: 'from-orange-500 to-yellow-400' },
    { name: 'Seasonal Specials', count: 30, color: 'from-purple-600 to-blue-500' },
    { name: 'Classics', count: 40, color: 'from-green-500 to-emerald-400' },
    { name: 'Mocktails', count: 20, color: 'from-pink-500 to-red-400' },
  ];

  const featuredDrinks = drinks.map((drink) => ({
    id: drink.id,
    name: drink.name,
    description: language === 'fr' ? drink.ds_frances : drink.ds_ingles,
    difficulty: drink.difficulty,
    preparation_time: drink.preparation_time,
    category: drink.category,
    country: language === 'fr' ? drink.country_frances : drink.country_ingles,
    flavor: language === 'fr' ? drink.flavor_frances : drink.flavor_ingles,
    ingredientes: language === 'fr' ? drink.ingredientes_frances : drink.ingredientes_ingles,
    instructions: language === 'fr' ? drink.instructions_frances : drink.instructions_ingles,
    image: drink.image_base64.startsWith('data:image/')
      ? drink.image_base64
      : `data:image/jpeg;base64,${drink.image_base64}`,
  }));

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <section>
        <h2 className="text-2xl font-bold text-gray-100 mb-6">Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.name} {...category} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-100 mb-6">Featured Drinks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredDrinks.map((drink) => (
            <DrinkCard key={drink.id} {...drink} />
          ))}
        </div>
      </section>
    </div>
  );
}
