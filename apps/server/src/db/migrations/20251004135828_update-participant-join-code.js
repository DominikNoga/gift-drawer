/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  // PARTICIPANTS
  const hasPassword = await knex.schema.hasColumn('participants', 'password');
  const hasJoinCodeCamel = await knex.schema.hasColumn('participants', 'joinCode');
  const hasJoinCodeSnake = await knex.schema.hasColumn('participants', 'join_code');

  if (hasPassword) {
    await knex.schema.alterTable('participants', (t) => {
      t.dropColumn('password');
    });
  }

  // If you want final schema to be snake_case: participants.join_code
  if (hasJoinCodeCamel && !hasJoinCodeSnake) {
    await knex.schema.alterTable('participants', (t) => {
      t.renameColumn('joinCode', 'join_code');
    });
  } else if (!hasJoinCodeCamel && !hasJoinCodeSnake) {
    await knex.schema.alterTable('participants', (t) => {
      t.string('join_code').nullable();
    });
  }

  // EVENTS
  const hasEventsJoinCodeCamel = await knex.schema.hasColumn('events', 'joinCode');
  // Only drop the camelCase column if it exists; DO NOT drop 'join_code'
  if (hasEventsJoinCodeCamel) {
    await knex.schema.alterTable('events', (t) => {
      t.dropColumn('joinCode');
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  // Best-effort revert
  const hasJoinCodeSnake = await knex.schema.hasColumn('participants', 'join_code');
  if (hasJoinCodeSnake) {
    await knex.schema.alterTable('participants', (t) => {
      t.dropColumn('join_code');
      t.string('password');
      t.string('joinCode'); // restore old camelCase if you want exact rollback
    });
  }

  // Re-adding events.joinCode is optional and ambiguous; skip unless you really need it
};
