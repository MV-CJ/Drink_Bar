interface Translations {
  en: {
    difficulty: string;
    waitingTime: string;
    featuredDrinks: string;
    categories: string;
    flavor: string;
    ingredients: string;
    instructions: string;
    steps: string;
  };
  fr: {
    difficulty: string;
    waitingTime: string;
    featuredDrinks: string;
    categories: string;
    flavor: string;
    ingredients: string;
    instructions: string;
    steps: string;
  };
}

export const translations: Translations = {
  en: {
    difficulty: 'Difficulty',
    waitingTime: 'Waiting time',
    featuredDrinks: 'Featured Drinks',
    categories: 'Categories',
    flavor: 'Flavor',
    ingredients: 'Ingredients',
    instructions: 'Instructions',
    steps: 'Steps',
  },
  fr: {
    difficulty: 'Difficulté',
    waitingTime: 'Temps d\'attente',
    featuredDrinks: 'Boissons en vedette',
    categories: 'Catégories',
    flavor: 'Saveur',
    ingredients: 'Ingrédients',
    instructions: 'Instructions',
    steps: 'Étapes',
  },
};
