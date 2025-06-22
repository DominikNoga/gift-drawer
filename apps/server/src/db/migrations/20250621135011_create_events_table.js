/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('events', (table) => {
    table.string('id').primary();
    table.string('name', 50).notNullable();
    table.string('description', 250).notNullable();
    table.string('organizer_name').notNullable();
    table.float('gift_budget').nullable();
    table.string('location').nullable();
    table.timestamp('exchange_date').nullable();
    table.boolean('is_ready').notNullable();
    table.string('join_code', 8).notNullable(); // exactly 8 chars
    table.timestamp('created_at').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('events');
};
