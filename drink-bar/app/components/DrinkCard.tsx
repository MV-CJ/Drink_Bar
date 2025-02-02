import Link from 'next/link';

const DrinkCard = ({
  id,
  name,
  image,
  description, // Já está dinâmico na page.tsx
  difficulty,
  preparation_time,
  category,
  flavor,
  country,
  difficultyLabel, // Adicionando label dinâmica
  waitingTimeLabel, // Adicionando label dinâmica
}) => {
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
        <div className="text-xs text-gray-400 mt-2 grid grid-cols-2 gap-y-1">
          <div className="flex items-center">
            <p className="mr-2 text-sm text-gray-400">{difficultyLabel}:</p> {/* Agora traduzido dinamicamente */}
            {[1, 2, 3, 4, 5].map((index) => (
              <span
                key={index}
                className={`w-3 h-3 rounded-full mr-1 ${index <= difficulty ? 'bg-amber-500' : 'bg-gray-500'}`}
              />
            ))}
          </div>
          <p className="text-sm text-amber-400">{waitingTimeLabel}: {preparation_time}m</p> {/* Agora traduzido dinamicamente */}
          <p className="text-sm text-teal-300">{category}</p>
          <p className="text-sm text-emerald-300">{country}</p>
        </div>
      </div>
    </Link>
  );
};

export default DrinkCard;
