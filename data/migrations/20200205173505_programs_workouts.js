
exports.up = function(knex) {
  return knex.schema
    .createTable('programs_workouts', tbl => {
      tbl.primary(['program_id', 'workout_id']);
      tbl
        .integer('program_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('programs')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl
        .integer('workout_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('workouts')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.integer('day')
        .notNullable();

    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('programs_workouts');
};
