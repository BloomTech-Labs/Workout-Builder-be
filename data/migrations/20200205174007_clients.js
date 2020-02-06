
exports.up = function(knex) {
  return knex.schema
    .createTable('clients', tbl => {
      tbl.increments();
      tbl.string('first_name')
        .notNullable();
      tbl.string('last_name')
        .notNullable();
      tbl.string('email')
        .notNullable()
        .unique();
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
    .dropTableIfExists('clients');
};
