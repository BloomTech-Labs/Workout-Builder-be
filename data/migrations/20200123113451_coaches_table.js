
exports.up = function(knex) {
  return knex.schema
    .createTable('coaches', tbl => {
      tbl.increments();
      tbl.string('first_name');
      tbl.string('last_name');
      tbl.string('email', 100)
        .notNullable()
        .unique();
      tbl.string('password', 100);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('coaches');
};
