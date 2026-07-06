/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  return knex.schema.createTable('files', (table) => {
    table.increments('id').primary();
    table.string('name', 255).notNullable().unique();
    table.string('originName', 255).notNullable();
    table.string('status', 10).notNullable().defaultTo('active');
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  return knex.schema.dropTableIfExists('files');
}