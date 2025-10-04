/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.alterTable('participants', (table) => {
    table.dropColumn('password');
    table.string('joinCode').nullable();
  });
  await knex.schema.alterTable('events', (table) => {
    table.dropColumn('joinCode');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.alterTable('participants', (table) => {
    table.string('password');
    table.dropColumn('joinCode');
  });
  await knex.schema.alterTable('events', (table) => {
    table.string('joinCode');
  });
};
