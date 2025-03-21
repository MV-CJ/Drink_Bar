import { NextAuthOptions, User, Session, JWT } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { Pool } from 'pg';

// Extendendo o tipo User e Session do NextAuth.js
declare module 'next-auth' {
    interface User {
        id: string;
        username: string;
    }

    interface Session {
        user: {
            id: string;
            username: string;
        };
    }

    interface JWT {
        id?: string;
        username?: string;
    }
}

const pool = new Pool({
    connectionString: process.env.NEXT_PUBLIC_SUPABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    throw new Error('Por favor, insira um nome de usuário e senha.');
                }

                const client = await pool.connect();

                try {
                    const query = 'SELECT * FROM users WHERE username = $1';
                    const values = [credentials.username];

                    const { rows } = await client.query(query, values);

                    if (rows.length === 0) {
                        throw new Error('Usuário não encontrado.');
                    }

                    const user = rows[0];

                    const isPasswordValid = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );

                    if (!isPasswordValid) {
                        throw new Error('Senha incorreta.');
                    }

                    return { id: user.id, username: user.username };
                } finally {
                    client.release();
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token }) {
            if (typeof token.id === 'string' && typeof token.username === 'string') {
                session.user.id = token.id;
                session.user.username = token.username;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
    },
    session: {
        maxAge: 3600, // 1 hora em segundos
        updateAge: 3600, // Atualiza a sessão a cada 1 hora
    },
};