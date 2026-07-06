import colors from 'colors';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async (knex) => {
  // Deleta os dados existentes antes de inserir os novos
  await knex('users').del();

  // Insere os dados padrão
  await knex('users').insert([
    {
      name: 'Admin',
      email: 'admin@admin.com',
      password: '$2a$10$9jqVwE2Be9WGKKqi9hz5p.xuRXONDlj//ZuVquqMOHXLHXL2oMTeC' // Senha: Admin@123
    },
  ]);

  console.log("✅ Usuário padrão inserido com sucesso na tabela 'users'".green);
  console.log("Default Email: admin@admin.com || Default Password: Admin@123".cyan);
}