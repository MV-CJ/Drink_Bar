'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';
import { translations } from '@/app/translations';

interface Drink {
  id: number;
  name: string;
  ds_ingles: string;
  ds_frances: string;
  difficulty: number;
  preparation_time: number;
  category: string;
  flavor_ingles: string;
  flavor_frances: string;
  ingredientes_ingles: string;
  ingredientes_frances: string;
  instructions_ingles: string;
  instructions_frances: string;
  image_base64: string;
}

const DrinkDetails = () => {
  const { id } = useParams();
  const { language } = useLanguage(); // language is now treated as 'en' | 'fr'
  const [drink, setDrink] = useState<Drink | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchDrink = async () => {
        try {
          const response = await fetch(`/api/drinks?id=${id}`);
          const data = await response.json();
          setDrink(data.drink);
        } catch (error) {
          console.error('Error fetching drink:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchDrink();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!drink) {
    return <div>Drink not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 mb-6 lg:mb-0 lg:pr-8">
          <img
            src={
              drink.image_base64.startsWith('data:image/')
                ? drink.image_base64
                : `data:image/jpeg;base64,${drink.image_base64}`
            }
            alt={drink.name}
            className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover rounded-lg"
          />
        </div>

        <div className="border-l border-gray-600 mx-0 lg:mx-8 mb-6 lg:mb-0"></div>

        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-emerald-400 font-bold mb-2">{drink.name}</h2>
          <p className="text-sm sm:text-base text-gray-300 mb-6">
            {language === 'fr' ? drink.ds_frances : drink.ds_ingles}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg text-gray-400 mb-10">
            <div className="flex items-center">
              <p className="mr-2 text-sm text-gray-400">
                {translations[language as 'en' | 'fr'].difficulty}:
              </p>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((index) => (
                  <span
                    key={index}
                    className={`w-3 h-3 rounded-full mr-1 ${index <= drink.difficulty ? 'bg-amber-500' : 'bg-gray-500'}`}
                  />
                ))}
              </div>
            </div>

            <p className="text-sm text-purple-300">
              {translations[language as 'en' | 'fr'].waitingTime}: {drink.preparation_time}m
            </p>
            <p className="text-sm text-cyan-300">
              {translations[language as 'en' | 'fr'].categories}: {drink.category}
            </p>
            <p className="text-sm text-teal-300">
              {translations[language as 'en' | 'fr'].flavor}: {language === 'fr' ? drink.flavor_frances : drink.flavor_ingles}
            </p>
          </div>

          <p className="text-xl text-gray-300 font-bold mb-2">{translations[language as 'en' | 'fr'].ingredients}</p>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-gray-300 mb-6 list-disc pl-5">
            {language === 'fr' ? (
              drink.ingredientes_frances.split(',').map((item, index) => (
                <li key={index}>{item.trim()}</li>
              ))
            ) : (
              drink.ingredientes_ingles.split(',').map((item, index) => (
                <li key={index}>{item.trim()}</li>
              ))
            )}
          </ul>

          <p className="text-xl text-gray-300 font-bold mb-2">{translations[language as 'en' | 'fr'].steps}</p>
          <p className="text-sm text-orange-300">
            {language === 'fr' ? drink.instructions_frances : drink.instructions_ingles}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DrinkDetails;
