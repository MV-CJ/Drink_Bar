'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from './context/LanguageContext';
import { translations } from './translations';
import CategoryCard from './components/CategoryCard';
import DrinkCard from './components/DrinkCard';

export default function Home() {
  const { language } = useLanguage();
  const [drinks, setDrinks] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [drinksPerPage] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Categorias com suas cores
  const categories = [
    { name: 'Cocktails', color: 'from-orange-500 to-yellow-400' },
    { name: 'Barman Specials', color: 'from-purple-600 to-blue-500' },
    { name: 'No alcoholic', color: 'from-green-500 to-emerald-400' },
    { name: 'All Drinks', color: 'from-pink-500 to-red-400' },
  ];

  // Buscar os drinks e a contagem das categorias
  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const categoryQuery = selectedCategory ? `&category=${selectedCategory}` : '';
        const response = await fetch(`/api/drinks?page=${currentPage}&limit=${drinksPerPage}${categoryQuery}`);
        const data = await response.json();
        
        setDrinks(data.drinks);  // Atualizando a lista de drinks
        setCategoryCounts(data.categoryCounts);  // Atualizando a contagem das categorias
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
    return <div>Loading...</div>;
  }

  // Função para alterar a categoria
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category); // Alterna entre a categoria selecionada ou limpa
    setCurrentPage(1); // Reset para a primeira página
  };

  // Função para alterar a página
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
            const categoryCount = categoryCounts.find(
              (count) => count.category === category.name
            )?.count || 0;

            return (
              <CategoryCard
                key={category.name}
                name={category.name}
                count={categoryCount} // Exibindo a contagem de itens
                color={category.color} // Passando a cor para o CategoryCard
                onClick={() => handleCategoryChange(category.name)}
              />
            );
          })}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-100 mb-6">
          {translations[language].featuredDrinks}
        </h2>
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
      </section>

      {/* Paginação */}
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
        >
          Next
        </button>
      </div>
    </div>
  );
}
