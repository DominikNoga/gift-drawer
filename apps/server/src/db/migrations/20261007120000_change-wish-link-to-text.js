/**
 * Product links (e.g. with tracking query params) often exceed varchar(255).
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('wishes', (table) => {
    table.text('link').nullable().alter();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('wishes', (table) => {
    table.string('link').nullable().alter();
  });
};
