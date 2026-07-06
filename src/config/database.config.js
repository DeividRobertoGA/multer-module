//Importando as dependencias necessárias
import knex from 'knex';
import dotenv from 'dotenv';

//Configurando as Variaveis de Ambiente
dotenv.config();

// Configuração do banco
export const DBConfig = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'swagger_module',
  },
  pool: { min: 2, max: 10 },
  migrations: {
    directory: './src/database/migrations',
    loadExtensions: ['.js', '.mjs'],
    extension: 'js',
  },
  seeds: {
    directory: './src/database/seeds',
    loadExtensions: ['.js', '.mjs'],
    extension: 'js',
  }
};

// Instância única do Banco
export const DB = knex(DBConfig);