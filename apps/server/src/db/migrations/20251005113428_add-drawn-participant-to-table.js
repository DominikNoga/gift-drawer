/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function up(knex) {
  const hasCol = await knex.schema.hasColumn('participants', 'drawn_participant_id');
  if (!hasCol) {
    // Match PK type: participants.id is string/varchar
    await knex.schema.alterTable('participants', (t) => {
      t.string('drawn_participant_id', 255).nullable();
    });
  }

  // Add FK only if missing
  const fkExists = await knex
    .raw(
      `SELECT 1
         FROM pg_constraint
        WHERE conname = 'participants_drawn_participant_id_foreign'
          AND conrelid = 'participants'::regclass`
    )
    .then((r) => r.rowCount > 0);

  if (!fkExists) {
    await knex.schema.alterTable('participants', (t) => {
      t
        .foreign('drawn_participant_id')
        .references('id')
        .inTable('participants')
        .onDelete('SET NULL');
    });
  }

  // Helpful index (safe/optional)
  await knex.raw(
    `CREATE INDEX IF NOT EXISTS participants_drawn_participant_id_idx
       ON participants (drawn_participant_id);`
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function down(knex) {
  // Drop index if present
  await knex.raw(
    `DO $$
     BEGIN
       IF EXISTS (SELECT 1 FROM pg_class WHERE relname = 'participants_drawn_participant_id_idx') THEN
         EXECUTE 'DROP INDEX participants_drawn_participant_id_idx';
       END IF;
     END $$;`
  );

  // Drop FK if present
  await knex.raw(
    `DO $$
     BEGIN
       IF EXISTS (
         SELECT 1
           FROM pg_constraint
          WHERE conname = 'participants_drawn_participant_id_foreign'
            AND conrelid = 'participants'::regclass
       ) THEN
         ALTER TABLE participants DROP CONSTRAINT participants_drawn_participant_id_foreign;
       END IF;
     END $$;`
  );

  // Drop column if present
  const hasCol = await knex.schema.hasColumn('participants', 'drawn_participant_id');
  if (hasCol) {
    await knex.schema.alterTable('participants', (t) => {
      t.dropColumn('drawn_participant_id');
    });
  }
};
