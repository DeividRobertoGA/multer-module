/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  return knex.schema.createTable('share_files', (table) => {
    table.integer('file_id')
      .unsigned()
      .references('id')
      .inTable('files')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    table.string('hash', 20).notNullable().unique()
    table.string('name', 255)
      .references('name')
      .inTable('files')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    table.timestamps(true, true);
    table.timestamp('expires_in').nullable();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  return knex.schema.dropTableIfExists('share_files');
}