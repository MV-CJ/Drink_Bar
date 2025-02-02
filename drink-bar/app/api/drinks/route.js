import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Variável de ambiente para conexão com o banco
});

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const category = searchParams.get('category');
  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 6;

  try {
    let query;
    let values = [];

    if (id) {
      query = 'SELECT * FROM drinks WHERE id = $1';
      values = [id];
    } else if (category) {
      query = 'SELECT * FROM drinks WHERE category = $1 LIMIT $2 OFFSET $3';
      values = [category, limit, (page - 1) * limit];
    } else {
      query = 'SELECT * FROM drinks LIMIT $1 OFFSET $2';
      values = [limit, (page - 1) * limit];
    }

    const res = await pool.query(query, values);
    const drinks = res.rows;

    // Consultar as contagens de categoria
    const categoryCountsQuery = `
      SELECT category, COUNT(*) as count 
      FROM drinks 
      GROUP BY category 
      ORDER BY category;
    `;
    const categoryCountsRes = await pool.query(categoryCountsQuery);
    const categoryCounts = categoryCountsRes.rows;

    if (id && drinks.length > 0) {
      return NextResponse.json({ drink: drinks[0] });
    }

    return NextResponse.json({ drinks, categoryCounts });
  } catch (error) {
    console.error('Erro ao buscar drinks:', error);
    return NextResponse.json({ error: 'Erro ao buscar drinks' }, { status: 500 });
  }
}
