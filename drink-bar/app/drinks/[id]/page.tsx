'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const DrinkDetails = () => {
  const { id } = useParams(); // Obtém o ID da URL
  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchDrink = async () => {
        try {
          const response = await fetch(`/api/drinks?id=${id}`);
          const data = await response.json();
          setDrink(data.drink);
        } catch (error) {
          console.error('Erro ao buscar o drink:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchDrink();
    }
  }, [id]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!drink) {
    return <div>Drink não encontrado</div>;
  }

  return (
    <div className="max-w-7xl mx-auto mt-12">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl flex">
        {/* Imagem à esquerda */}
        <div className="w-1/2 pr-8">
          <img
            src={
              drink.image_base64.startsWith('data:image/')
                ? drink.image_base64
                : `data:image/jpeg;base64,${drink.image_base64}`
            }
            alt={drink.name}
            className="w-full h-[500px] object-cover rounded-lg"
          />
        </div>

        {/* Linha separadora */}
        <div className="border-l border-gray-600 mx-8"></div>

        {/* Detalhes à direita */}
        <div className="w-1/2">
          <h2 className="text-5xl text-emerald-400 font-bold mb-1">{drink.name}</h2>
          <p className="text-sm text-gray-300 mb-6">{drink.description}</p>
          
          <div className="grid grid-cols-2 gap-2 text-lg text-gray-400 mb-10">
            <p className="text-sm text-indigo-300">Difficulty: {drink.difficulty}</p>
            <p className="text-sm text-purple-300">Preparation Time: {drink.preparation_time}m</p>
            <p className="text-sm text-cyan-300">Category: {drink.category}</p>
            <p className="text-sm text-teal-300">Flavor: {drink.flavor}</p>
          </div>
          
          <p className="text-xl text-gray-300 font-bold mb-2">Steps</p>
          <p className="text-sm text-orange-300">{drink.instructions}</p>
        
        </div>
      </div>
    </div>
  );
};

export default DrinkDetails;
