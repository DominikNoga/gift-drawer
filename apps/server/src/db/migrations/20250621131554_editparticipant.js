/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('participants', (table) => {
    table.dropColumn('email');
    table.dropColumn('joined_at');
    table.string('password').notNullable();
    table.string('eventId').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('participants', (table) => {
    table.string('email').notNullable();
    table.timestamp('joined_at').notNullable();
    table.dropColumn('password');
    table.dropColumn('eventId');
  });
};
