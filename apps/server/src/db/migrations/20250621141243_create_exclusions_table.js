/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('exclusions', (table) => {
    table.string('id').primary();
    table.string('event_id').notNullable();
    table.string('participant_id').notNullable();
    table.string('excluded_participant_id').notNullable();

    // Optional foreign keys
    // table.foreign('event_id').references('id').inTable('events').onDelete('CASCADE');
    // table.foreign('participant_id').references('id').inTable('participants').onDelete('CASCADE');
    // table.foreign('excluded_participant_id').references('id').inTable('participants').onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('exclusions');
};
