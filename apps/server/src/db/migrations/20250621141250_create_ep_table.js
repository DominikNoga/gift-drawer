/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('event_participants', (table) => {
    table.string('id').primary();
    table.string('participant_id').notNullable();
    table.string('event_id').notNullable();

    // Optional foreign keys (comment out if you don't need them for now)
    // table.foreign('participant_id').references('id').inTable('participants').onDelete('CASCADE');
    // table.foreign('event_id').references('id').inTable('events').onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('event_participants');
};
