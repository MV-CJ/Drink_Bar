import CategoryCard from './components/CategoryCard';
import DrinkCard from './components/DrinkCard';

export default function Home() {
  const categories = [
    { name: 'Signature Cocktails', count: 50, color: 'from-orange-500 to-yellow-400' },
    { name: 'Seasonal Specials', count: 30, color: 'from-purple-600 to-blue-500' },
    { name: 'Classics', count: 40, color: 'from-green-500 to-emerald-400' },
    { name: 'Mocktails', count: 20, color: 'from-pink-500 to-red-400' },
  ];

  const featuredDrinks = [
    { id: 1, name: 'Negroni', description: 'A classic Italian cocktail.', image: '/negroni.jpg', difficulty: 'Medium', rating: 4.8 },
    { id: 2, name: 'Mojito', description: 'A refreshing Cuban favorite.', image: '/mojito.jpg', difficulty: 'Easy', rating: 4.6 },
    { id: 3, name: 'Old Fashioned', description: 'Timeless and elegant.', image: '/old-fashioned.jpg', difficulty: 'Medium', rating: 4.9 },
  ];

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
