exports.up = async function(knex) {
  await knex.schema.dropTableIfExists('event_participants');
};

exports.down = async function(knex) {
  // You can re-create the table if needed (optional)
};
