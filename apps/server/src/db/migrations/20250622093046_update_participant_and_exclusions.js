/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  // 1. Rename column eventId → event_id in participants
  await knex.schema.alterTable('participants', (table) => {
    table.renameColumn('eventId', 'event_id');
  });
  
  await knex.schema.alterTable('participants', (table) => {
    table.foreign('event_id').references('events.id').onDelete('CASCADE');
  });

  await knex.schema.alterTable('exclusions', (table) => {
    table.foreign('event_id').references('events.id').onDelete('CASCADE');
    table.foreign('participant_id').references('participants.id').onDelete('CASCADE');
    table.foreign('excluded_participant_id').references('participants.id').onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
   await knex.schema.alterTable('exclusions', (table) => {
    table.dropForeign(['event_id']);
    table.dropForeign(['participant_id']);
    table.dropForeign(['excluded_participant_id']);
  });

  await knex.schema.alterTable('participants', (table) => {
    table.dropForeign(['event_id']);
  });
};
