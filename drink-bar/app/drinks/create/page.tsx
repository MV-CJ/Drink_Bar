// app/drinks/create/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'; // Importe o useSession do NextAuth.js
import { useLanguage } from '@/app/context/LanguageContext';
import { translations } from '@/app/translations';

const CreateDrinkPage = () => {
    const { language } = useLanguage(); // Idioma atual
    const router = useRouter(); // Para redirecionar após o cadastro
    const { data: session, status } = useSession(); // Sessão do NextAuth.js

    // Estado para armazenar os dados do formulário
    const [formData, setFormData] = useState({
        name: '',
        ds_ingles: '',
        ds_frances: '',
        difficulty: 1,
        preparation_time: 5,
        category: '',
        flavor_ingles: '',
        flavor_frances: '',
        ingredientes_ingles: '',
        ingredientes_frances: '',
        instructions_ingles: '',
        instructions_frances: '',
        image_base64: '',
        video_link: '',
        country_ingles: '',
        country_frances: '',
    });

    // Estado para feedback de carregamento e erro
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Verifica a autenticação ao carregar a página
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login'); // Redireciona para a página de login se não estiver autenticado
        }
    }, [status, router]);

    // Exibe uma mensagem de carregamento enquanto verifica a autenticação
    if (status === 'loading') {
        return <p>Verificando autenticação...</p>;
    }

    // Exibe o conteúdo da página apenas se o usuário estiver autenticado
    if (!session) {
        return null; // Ou redireciona para a página de login
    }

    // Função para atualizar os campos do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Função para converter a imagem em base64
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setFormData({
                    ...formData,
                    image_base64: base64String,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    // Função para enviar o formulário
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/drinks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar drink');
            }

            const data = await response.json();
            console.log('Drink cadastrado:', data.drink);

            // Redirecionar para a página de detalhes do drink cadastrado
            router.push(`/drinks/${data.drink.id}`);
        } catch (err) {
            console.error('Erro:', err);
            setError('Erro ao cadastrar drink. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl text-emerald-400 font-bold mb-6">
                    {translations[language as 'en' | 'fr'].createDrink}
                </h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Nome do Drink */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Nome</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 bg-gray-700 text-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Descrição (Inglês e Francês) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Descrição (Inglês)</label>
                            <textarea
                                name="ds_ingles"
                                value={formData.ds_ingles}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 bg-gray-700 text-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Descrição (Francês)</label>
                            <textarea
                                name="ds_frances"
                                value={formData.ds_frances}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 bg-gray-700 text-gray-300 rounded-md"
                                required
                            />
                        </div>
                    </div>

                    {/* Dificuldade */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Dificuldade (1-5)</label>
                        <input
                            type="number"
                            name="difficulty"
                            value={formData.difficulty}
                            onChange={handleChange}
                            min="1"
                            max="5"
                            className="mt-1 block w-full p-2 bg-gray-700 text-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Tempo de Preparação */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Tempo de Preparação (minutos)</label>
                        <input
                            type="number"
                            name="preparation_time"
                            value={formData.preparation_time}
                            onChange={handleChange}
                            min="1"
                            className="mt-1 block w-full p-2 bg-gray-700 text-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Categoria (Menu Suspenso) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Categoria</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 bg-gray-700 text-gray-300 rounded-md"
                            required
                        >
                            <option value="">Selecione uma categoria</option>
                            <option value="Cocktails">Cocktails</option>
                            <option value="Barman Specials">Barman Specials</option>
                            <option value="Non-Alcoholic">Non-Alcoholic</option>
                        </select>
                    </div>

                    {/* Sabor (Inglês e Francês) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Sabor (Inglês)</label>
                            <input
                                type="text"
                                name="flavor_ingles"
                                value={formData.flavor_ingles}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 bg-gray-700 text-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Sabor (Francês)</label>
                            <input
                                type="text"
                                name="flavor_frances"
                                value={formData.flavor_frances}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 bg-gray-700 text-gray-300 rounded-md"
                                required
                            />
                        </div>
                    </div>

                    {/* País (Inglês e Francês) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300">País (Inglês)</label>
                            <input
                                type="text"
                                name="country_ingles"
                                value={formData.country_ingles}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 bg-gray-700 text-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300">País (Francês)</label>
                            <input
                                type="text"
                                name="country_frances"
                                value={formData.country_frances}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 bg-gray-700 text-gray-300 rounded-md"
                                required
                            />
                        </div>
                    </div>

                    {/* Ingredientes (Inglês e Francês) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Ingredientes (Inglês)</label>
                            <textarea
                                name="ingredientes_ingles"
                                value={formData.ingredientes_ingles}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 bg-gray-700 text-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Ingredientes (Francês)</label>
                            <textarea
                                name="ingredientes_frances"
                                value={formData.ingredientes_frances}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 bg-gray-700 text-gray-300 rounded-md"
                                required
                            />
                        </div>
                    </div>

                    {/* Instruções (Inglês e Francês) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Instruções (Inglês)</label>
                            <textarea
                                name="instructions_ingles"
                                value={formData.instructions_ingles}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 bg-gray-700 text-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Instruções (Francês)</label>
                            <textarea
                                name="instructions_frances"
                                value={formData.instructions_frances}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 bg-gray-700 text-gray-300 rounded-md"
                                required
                            />
                        </div>
                    </div>

                    {/* Imagem (Upload) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Imagem</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mt-1 block w-full p-2 bg-gray-700 text-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Link do Vídeo (YouTube) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Link do Vídeo (YouTube)</label>
                        <input
                            type="text"
                            name="video_link"
                            value={formData.video_link}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 bg-gray-700 text-gray-300 rounded-md"
                        />
                    </div>

                    {/* Botão de Envio */}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600 transition-colors"
                        >
                            {loading ? 'Cadastrando...' : 'Cadastrar Drink'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateDrinkPage;