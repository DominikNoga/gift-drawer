/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  // PARTICIPANTS
  const hasJoinCodeCamel = await knex.schema.hasColumn('participants', 'joinCode');
  const hasJoinCodeSnake = await knex.schema.hasColumn('participants', 'join_code');

  // Drop camelCase if it exists
  if (hasJoinCodeCamel) {
    await knex.schema.alterTable('participants', (t) => {
      t.dropColumn('joinCode');
    });
  }
  // Add snake_case only if missing
  if (!hasJoinCodeSnake) {
    await knex.schema.alterTable('participants', (t) => {
      t.string('join_code').nullable();
    });
  }

  // EVENTS
  const hasEventsJoinCodeSnake = await knex.schema.hasColumn('events', 'join_code');
  // This migration intends to remove events.join_code entirely
  if (hasEventsJoinCodeSnake) {
    await knex.schema.alterTable('events', (t) => {
      t.dropColumn('join_code');
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  // Recreate what "up" removed, but also defensively

  // PARTICIPANTS: remove snake_case and (optionally) restore camelCase
  const hasJoinCodeSnake = await knex.schema.hasColumn('participants', 'join_code');
  if (hasJoinCodeSnake) {
    await knex.schema.alterTable('participants', (t) => {
      t.dropColumn('join_code');
    });
  }
  const hasJoinCodeCamel = await knex.schema.hasColumn('participants', 'joinCode');
  if (!hasJoinCodeCamel) {
    await knex.schema.alterTable('participants', (t) => {
      t.string('joinCode').nullable();
    });
  }

  // EVENTS: add back join_code if missing
  const hasEventsJoinCodeSnake = await knex.schema.hasColumn('events', 'join_code');
  if (!hasEventsJoinCodeSnake) {
    await knex.schema.alterTable('events', (t) => {
      t.string('join_code');
    });
  }
};
