import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET() {
    try {
        // Executa uma consulta simples para manter o Supabase ativo
        await supabase.from('drinks').select('id').limit(1);
        return NextResponse.json({ message: 'Ping realizado com sucesso!' });
    } catch (error) {
        console.error('Erro no ping:', error);
        return NextResponse.json({ error: 'Erro ao pingar o banco' }, { status: 500 });
    }
}
