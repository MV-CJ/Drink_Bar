// app/api/drinks/route.js
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Variável de ambiente para conexão com o banco
});

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id'); // Obtém o id do parâmetro da URL

  try {
    let query;
    let values = [];

    if (id) {
      // Consulta para buscar um drink pelo id
      query = 'SELECT * FROM drinks WHERE id = $1';
      values = [id];
    } else {
      // Consulta para buscar todos os drinks
      query = 'SELECT * FROM drinks';
    }

    const res = await pool.query(query, values);
    const drinks = res.rows;

    // Log para garantir que estamos recebendo o resultado correto
    console.log('Resultado da consulta:', drinks);

    // Se o id for passado, deve retornar apenas um drink
    if (id && drinks.length > 0) {
      return NextResponse.json({ drink: drinks[0] }); // Retorna apenas o primeiro drink encontrado
    }

    return NextResponse.json({ drinks });
  } catch (error) {
    console.error('Erro ao buscar drinks:', error);
    return NextResponse.json({ error: 'Erro ao buscar drinks' }, { status: 500 });
  }
}
