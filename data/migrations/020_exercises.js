
exports.up = function(knex) {
  return knex.schema
    .createTable('exercises', tbl => {
      tbl.increments();
      tbl.string('name')
        .notNullable();
      tbl.string('type');
      tbl.string('focal_points', 1000);
      tbl.string('video_url', 1000);
      tbl.string('thumbnail_url', 1000);
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
    .dropTableIfExists('exercises');
};
