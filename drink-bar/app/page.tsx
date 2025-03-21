'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from './context/LanguageContext';
import { translations } from './translations';
import CategoryCard from './components/CategoryCard';
import DrinkCard from './components/DrinkCard';
import Loading from './components/Loading';

interface Drink {
  id: number;
  name: string;
  ds_ingles: string;
  ds_frances: string;
  difficulty: number;
  preparation_time: number;
  category: string;
  country_ingles: string;
  country_frances: string;
  flavor_ingles: string;
  flavor_frances: string;
  ingredientes_ingles: string;
  ingredientes_frances: string;
  instructions_ingles: string;
  instructions_frances: string;
  image_base64: string;
}

export default function Home() {
  const { language } = useLanguage();
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [categoryCounts, setCategoryCounts] = useState<{ category: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [drinksPerPage] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  const categories = [
    { name: 'Cocktails', color: 'from-orange-500 to-yellow-400' },
    { name: 'Barman Specials', color: 'from-purple-600 to-blue-500' },
    { name: 'No alcoholic', color: 'from-green-500 to-emerald-400' },
    { name: 'All Drinks', color: 'from-pink-500 to-red-400' },
  ];

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const categoryQuery = selectedCategory ? `&category=${selectedCategory}` : '';
        const response = await fetch(`/api/drinks?page=${currentPage}&limit=${drinksPerPage}${categoryQuery}`);
        const data = await response.json();
  
        if (!data.drinks) throw new Error('API response does not contain drinks');
        if (!data.categoryCounts) throw new Error('API response does not contain categoryCounts');
  
        console.log('Drinks data:', data.drinks);
        console.log('Category Counts:', data.categoryCounts);
  
        setDrinks(data.drinks);
        setCategoryCounts((prevCounts) => prevCounts.length === 0 ? data.categoryCounts : prevCounts);
        setTotalPages(Math.ceil(data.total / drinksPerPage));
        
      } catch (error) {
        console.error('Error fetching drinks:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDrinks();
  }, [currentPage, selectedCategory]);

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
    return <Loading />;
  }

  const handleCategoryChange = (category: string) => {
    setLoading(true);
    setSelectedCategory(category === selectedCategory ? '' : category);
    setCurrentPage(1); // Resetar para a primeira página
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <section>
        <h2 className="text-2xl font-bold text-gray-100 mb-6">
          {translations[language].categories}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => {
            const match = categoryCounts?.find(
              (countObj) => countObj.category.toLowerCase() === category.name.toLowerCase()
            );
            const categoryCount: number = match ? parseInt(String(match.count), 10) || 0 : 0;

            console.log('Category:', category.name, 'Count:', categoryCount);

            return (
              <CategoryCard
                key={category.name}
                name={category.name}
                count={categoryCount}
                color={category.color}
                onClick={() => handleCategoryChange(category.name)}
              />
            );
          })}
        </div>
      </section>
      <br />
      <hr />
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-100 mb-6">
          {translations[language].featuredDrinks}
        </h2>
        {loading ? (
          <div className="flex justify-center">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredDrinks.map((drink) => (
              <DrinkCard
                key={drink.id}
                {...drink}
                language={language}
                difficultyLabel={translations[language].difficulty}
                waitingTimeLabel={translations[language].waitingTime}
              />
            ))}
          </div>
        )}
      </section>

      <div className="mt-8 flex justify-center">
        <button
          className="px-4 py-2 bg-gray-300 rounded-lg"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">{currentPage}</span>
        <button
          className="px-4 py-2 bg-gray-300 rounded-lg"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}