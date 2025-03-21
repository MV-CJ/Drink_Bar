// app/login/page.tsx
'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // Realiza o login usando o NextAuth.js
        const result = await signIn('credentials', {
            redirect: false, // Evita o redirecionamento automático
            username,
            password,
        });

        if (result?.error) {
            // Exibe o erro se o login falhar
            setError(result.error);
        } else {
            // Redireciona para a página de cadastro após o login bem-sucedido
            router.push('/drinks/create');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 p-6 bg-gray-800 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold text-emerald-400 mb-6">Login</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300">Usuário</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 block w-full p-2 bg-gray-700 text-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300">Senha</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full p-2 bg-gray-700 text-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600 transition-colors"
                    >
                        Entrar
                    </button>
                </div>
            </form>
        </div>
    );
}