/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  // Remove wrong column and add correct one in participants
  await knex.schema.alterTable('participants', (table) => {
    table.dropColumn('joinCode');
    table.string('join_code').nullable();
  });

  // Remove wrong column and add correct one in events (if needed)
  await knex.schema.alterTable('events', (table) => {
    table.dropColumn('join_code');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.alterTable('participants', (table) => {
    table.dropColumn('join_code');
    table.string('joinCode').nullable();
  });

  await knex.schema.alterTable('events', (table) => {
    table.string('join_code');
  });
};