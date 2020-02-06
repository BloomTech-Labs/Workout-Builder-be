
exports.up = function(knex) {
  return knex.schema
    .createTable('programs', tbl => {
      tbl.increments();
      tbl.string('name')
        .notNullable();
      tbl.string('phase');
      tbl.string('description', 1000);
      tbl.integer('length')
        .notNullable();
      tbl
        .integer('coach_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('coaches')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('programs');
};
