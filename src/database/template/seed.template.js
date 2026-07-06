/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async (knex) => {
  // Deleta os dados existentes antes de inserir os novos
  await knex('table_name').del();

  // Insere os dados padrão
  await knex('table_name').insert([
    { id: 1, column_name: 'value' }
  ]);
}