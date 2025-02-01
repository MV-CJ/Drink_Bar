// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            description: 'Description',
            difficulty: 'Difficulty',
            preparation_time: 'Preparation Time',
        },
    },
    fr: {
        translation: {
            description: 'Description',
            difficulty: 'Difficulté',
            preparation_time: 'Temps de préparation',
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'en', // Idioma padrão
    fallbackLng: 'en', // Caso o idioma selecionado não esteja disponível
    interpolation: {
        escapeValue: false, // Não precisa de escape para JSX
    },
});

export default i18n;
