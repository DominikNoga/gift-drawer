/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function up(knex) {
  await knex.schema.alterTable('participants', (table) => {
    table
      .uuid('drawn_participant_id')
      .nullable()
      .references('id')
      .inTable('participants')
      .onDelete('SET NULL')
      .index();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function down(knex) {
  await knex.schema.alterTable('participants', (table) => {
    table.dropColumn('drawn_participant_id');
  });
};
