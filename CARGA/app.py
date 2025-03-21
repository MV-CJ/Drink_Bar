from flask import Flask, request, jsonify
import psycopg2

app = Flask(__name__)

# Configuração da conexão com o Neo Tech Database
DB_URL = "postgresql://neondb_owner:npg_HN1tpnRAM7jg@ep-lively-cake-a8cyz4yz-pooler.eastus2.azure.neon.tech/neondb?sslmode=require"
conn = psycopg2.connect(DB_URL)

# Função para criar a tabela de drinks
def create_drinks_table():
    try:
        with conn.cursor() as cursor:
            create_table_query = """
            CREATE TABLE IF NOT EXISTS drinks (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                preparation_time INT NOT NULL,
                image_base64 TEXT NOT NULL,
                difficulty INT NOT NULL CHECK (difficulty BETWEEN 1 AND 5),
                category TEXT,
                country_frances TEXT,
                country_ingles TEXT,
                ds_frances TEXT,
                ds_ingles TEXT,
                ingredientes_frances TEXT,
                ingredientes_ingles TEXT,
                instructions_frances TEXT,
                instructions_ingles TEXT,
                flavor_frances TEXT,
                flavor_ingles TEXT
            );
            """
            cursor.execute(create_table_query)
            conn.commit()
    except Exception as e:
        return str(e)

# Função para inserir o drink
def insert_drink(
    name, preparation_time, image_base64, difficulty, 
    category, country_frances, country_ingles, 
    ds_frances, ds_ingles, ingredientes_frances, ingredientes_ingles, 
    instructions_frances, instructions_ingles, flavor_frances, flavor_ingles
):
    try:
        with conn.cursor() as cursor:
            insert_query = """
            INSERT INTO drinks (name, preparation_time, image_base64, difficulty, 
            category, country_frances, country_ingles, 
            ds_frances, ds_ingles, ingredientes_frances, ingredientes_ingles, 
            instructions_frances, instructions_ingles, flavor_frances, flavor_ingles)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
            """
            cursor.execute(insert_query, (
                name, preparation_time, image_base64, difficulty, 
                category, country_frances, country_ingles,
                ds_frances, ds_ingles, ingredientes_frances, ingredientes_ingles,
                instructions_frances, instructions_ingles, flavor_frances, flavor_ingles
            ))
            conn.commit()
    except Exception as e:
        return str(e)

# Rota para cadastrar o drink
@app.route('/add_drink', methods=['POST'])
def add_drink():
    try:
        # Pegando os dados do corpo da requisição
        data = request.get_json()
        name = data['name']
        preparation_time = data['preparation_time']
        image_base64 = data['image_base64']  # A imagem em base64
        difficulty = data['difficulty']
        category = data['category']
        country_frances = data['country_frances']
        country_ingles = data['country_ingles']
        ds_frances = data.get('ds_frances', '')
        ds_ingles = data.get('ds_ingles', '')
        ingredientes_frances = data.get('ingredientes_frances', '')
        ingredientes_ingles = data.get('ingredientes_ingles', '')
        instructions_frances = data.get('instructions_frances', '')
        instructions_ingles = data.get('instructions_ingles', '')
        flavor_frances = data.get('flavor_frances', '')
        flavor_ingles = data.get('flavor_ingles', '')

        # Inserir o drink no banco de dados
        result = insert_drink(
            name, preparation_time, image_base64, difficulty, 
            category, country_frances, country_ingles, 
            ds_frances, ds_ingles, ingredientes_frances, ingredientes_ingles, 
            instructions_frances, instructions_ingles, flavor_frances, flavor_ingles
        )

        if result:
            return jsonify({"status": "error", "message": result}), 400
        return jsonify({"status": "success", "message": "Drink added successfully."}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

if __name__ == '__main__':
    create_drinks_table()  # Cria a tabela quando o servidor for iniciado
    app.run(debug=True)
