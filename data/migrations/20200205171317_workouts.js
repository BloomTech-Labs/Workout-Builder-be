
exports.up = function(knex) {
  return knex.schema
    .createTable('workouts', tbl => {
      tbl.increments();
      tbl.string('name')
        .notNullable();
      tbl.string('description', 1000);
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
    .dropTableIfExists('workouts');
};
