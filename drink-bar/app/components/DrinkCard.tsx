import Link from 'next/link';

interface DrinkCardProps {
  id: number; // Mudado para número, pois parece ser um ID numérico
  name: string;
  image: string;
  description: string;
  difficulty: number;
  preparation_time: number;
  category: string;
  flavor: string;
  country: string;
  difficultyLabel: string;
  waitingTimeLabel: string;
  language: 'en' | 'fr'; // ✅ Agora a propriedade está presente
}

const DrinkCard = ({
  id,
  name,
  image,
  description,
  difficulty,
  preparation_time,
  category,
  flavor,
  country,
  difficultyLabel,
  waitingTimeLabel,
  language, // ✅ Agora incluído como prop
}: DrinkCardProps) => {
  return (
    <Link href={`/drinks/${id}`} className="rounded-lg overflow-hidden bg-gray-700 shadow-lg h-full flex flex-col">
      <img src={image} alt={name} className="w-full h-48 object-cover object-top" />
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-center">
          <h3 className="text-lg text-teal-400 font-bold">{name}</h3>
          <p className="text-sm text-emerald-300">{flavor}</p>
        </div>
        <div className="mt-2 flex-grow">
          <p className="text-sm text-gray-300 line-clamp-2">{description}</p>
        </div>
        <div className="text-xs text-gray-400 mt-4 grid grid-cols-2 gap-4">
          {/* Dificuldade à esquerda */}
          <div className="flex items-center space-x-2">
            <p className="text-sm text-gray-400">{difficultyLabel}:</p>
            {[1, 2, 3, 4, 5].map((index) => (
              <span
                key={index}
                className={`w-3 h-3 rounded-full ${index <= difficulty ? 'bg-amber-500' : 'bg-gray-500'}`}
              />
            ))}
          </div>
  
          {/* Tempo de preparo à direita */}
          <p className="text-sm text-amber-400 text-right">{waitingTimeLabel}: {preparation_time}m</p>
  
          {/* Categoria à esquerda */}
          <p className="text-sm text-teal-300">{category}</p>
  
          {/* País à direita */}
          <p className="text-sm text-emerald-300 text-right">{country}</p>
        </div>
      </div>
    </Link>
  );
};

export default DrinkCard;
