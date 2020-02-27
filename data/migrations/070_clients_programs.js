
exports.up = function(knex) {
  return knex.schema
    .createTable('clients_programs', tbl => {
      tbl.primary(['client_id', 'program_id']);
      tbl
        .integer('client_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('clients')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl
        .integer('program_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('programs')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.string('start_date')
        .notNullable();
      tbl.integer('current_day');

    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('clients_programs');
};
