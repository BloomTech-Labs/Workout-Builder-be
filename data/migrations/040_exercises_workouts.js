
exports.up = function(knex) {
  return knex.schema
    .createTable('exercises_workouts', tbl => {
      tbl.increments();
      tbl
        .integer('exercise_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('exercises')
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
      tbl.integer('order')
        .notNullable();
      tbl.string('exercise_details', 1000)
        .notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('exercises_workouts');
};
