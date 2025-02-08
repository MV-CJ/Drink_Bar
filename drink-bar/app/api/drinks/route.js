import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const category = searchParams.get('category');
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 6;
  const offset = (page - 1) * limit;

  try {
    let query = supabase.from('drinks').select('*');

    if (id) {
      query = query.eq('id', id).single();
    } else if (category) {
      query = query.eq('category', category).range(offset, offset + limit - 1);
    } else {
      query = query.range(offset, offset + limit - 1);
    }

    const { data: drinks, error } = await query;
    if (error) throw error;

    // Obtendo contagem de categorias corretamente
    const { data: categoryData, error: countError } = await supabase
      .from('drinks')
      .select('category');
    
    if (countError) throw countError;

    // Agrupar manualmente os resultados para contar as ocorrências por categoria
    const categoryCounts = categoryData.reduce((acc, { category }) => {
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    const categoryCountsArray = Object.entries(categoryCounts).map(([category, count]) => ({ category, count }));

    return NextResponse.json(id ? { drink: drinks } : { drinks, categoryCounts: categoryCountsArray });
  } catch (error) {
    console.error('Erro ao buscar drinks:', error);
    return NextResponse.json({ error: 'Erro ao buscar drinks' }, { status: 500 });
  }
}
