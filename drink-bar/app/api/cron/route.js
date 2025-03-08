import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET(req) {
    // Verifica a autorização do cron job
    if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Executa uma consulta simples para manter o Supabase ativo
        await supabase.from('drinks').select('id').limit(1);

        return NextResponse.json({ message: 'Ping realizado com sucesso!' });
    } catch (error) {
        console.error('Erro no cron job:', error);
        return NextResponse.json({ error: 'Erro ao pingar o banco' }, { status: 500 });
    }
}
