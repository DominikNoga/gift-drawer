/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('wishes', (table) => {
    table.string('id').primary();
    table.string('participant_id').notNullable()
      .references('id').inTable('participants').onDelete('CASCADE');
    table.string('name').notNullable();
    table.string('link').nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('wishes');
};
