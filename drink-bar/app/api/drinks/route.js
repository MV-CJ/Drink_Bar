import { Pool } from 'pg';
import { NextResponse } from 'next/server';

// Configuração do pool de conexões
const pool = new Pool({
  connectionString: process.env.NEXT_PUBLIC_SUPABASE_URL, // NeonDB URL
  ssl: {
    rejectUnauthorized: false,
  },
});


export async function POST(request) {
  try {
    const client = await pool.connect();

    // Extrair os dados do corpo da requisição
    const {
      name,
      ds_ingles,
      ds_frances,
      difficulty,
      preparation_time,
      category,
      flavor_ingles,
      flavor_frances,
      ingredientes_ingles,
      ingredientes_frances,
      instructions_ingles,
      instructions_frances,
      image_base64,
      video_link,
      country_ingles,
      country_frances,
    } = await request.json();

    // Query para inserir o novo drink no banco de dados
    const query = `
      INSERT INTO drinks (
        name, ds_ingles, ds_frances, difficulty, preparation_time, category,
        flavor_ingles, flavor_frances, ingredientes_ingles, ingredientes_frances,
        instructions_ingles, instructions_frances, image_base64, video_link, country_ingles,
        country_frances
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *;
    `;

    const values = [
      name,
      ds_ingles,
      ds_frances,
      difficulty,
      preparation_time,
      category,
      flavor_ingles,
      flavor_frances,
      ingredientes_ingles,
      ingredientes_frances,
      instructions_ingles,
      instructions_frances,
      image_base64,
      video_link,
      country_ingles,
      country_frances,
    ];

    // Executar a query
    const { rows } = await client.query(query, values);

    // Liberar o cliente de volta para o pool
    client.release();

    // Retornar o drink criado
    return NextResponse.json({ drink: rows[0] }, { status: 201 });
  } catch (error) {
    console.error('Erro ao cadastrar drink:', error);
    return NextResponse.json({ error: 'Erro ao cadastrar drink' }, { status: 500 });
  }
}


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id'); // Parâmetro para buscar por ID
  const category = searchParams.get('category');
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 6;
  const offset = (page - 1) * limit;

  try {
    const client = await pool.connect();

    // Se o ID estiver presente, buscar apenas o drink correspondente
    if (id) {
      const query = 'SELECT * FROM drinks WHERE id = $1';
      const values = [id];

      const { rows: drinks } = await client.query(query, values);

      client.release();

      if (drinks.length === 0) {
        return NextResponse.json({ error: 'Drink not found' }, { status: 404 });
      }

      return NextResponse.json({ drink: drinks[0] });
    }

    // Caso contrário, continuar com a lógica original de busca por categoria e paginação
    let query = 'SELECT * FROM drinks';
    let values = [];

    if (category && category !== 'All Drinks') {
      query += ` WHERE category = $1`;
      values = [category];
    }

    query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
    values.push(limit, offset);

    const { rows: drinks } = await client.query(query, values);

    console.log('Fetched Drinks:', drinks.length); // Log de quantos drinks foram retornados

    // Query para contar o número total de drinks
    let countQuery = 'SELECT COUNT(*) AS total FROM drinks';
    let countValues = [];

    if (category && category !== 'All Drinks') {
      countQuery += ` WHERE category = $1`;
      countValues = [category];
    }

    const { rows: countData } = await client.query(countQuery, countValues);
    const total = parseInt(countData[0].total, 10);

    console.log('Total Drinks Count:', total); // Log do total de drinks contados

    // Query para contar os drinks por categoria
    const { rows: categoryData } = await client.query(
      `
      SELECT category, COUNT(*) AS count
      FROM drinks
      ${category && category !== 'All Drinks' ? `WHERE category = $1` : ''}
      GROUP BY category
      `,
      category && category !== 'All Drinks' ? [category] : []
    );

    console.log('Category Counts:', categoryData); // Log de contagem por categoria

    // Adiciona contagem para "All Drinks"
    const allDrinksCount = (await client.query('SELECT COUNT(*) AS count FROM drinks')).rows[0].count;

    // Processando os dados da contagem por categoria
    const categoryCounts = categoryData.map((row) => ({
      category: row.category,
      count: row.count,
    }));

    // Adicionando a contagem de "All Drinks"
    categoryCounts.push({
      category: 'All Drinks',
      count: allDrinksCount,
    });

    client.release();

    return NextResponse.json({ drinks, total, categoryCounts });
  } catch (error) {
    console.error('Erro ao buscar drinks e contagens:', error);
    return NextResponse.json({ error: 'Erro ao buscar drinks e contagens' }, { status: 500 });
  }
}