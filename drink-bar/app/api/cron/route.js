import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET(req) {
    try {
        // Simples consulta para verificar conexão com o banco
        await supabase.from('drinks').select('id').limit(1);

        return NextResponse.json({ message: 'Ping realizado com sucesso!' });
    } catch (error) {
        console.error('Erro no cron job:', error);
        return NextResponse.json({ error: 'Erro ao pingar o banco' }, { status: 500 });
    }
}

