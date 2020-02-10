
exports.seed = function(knex) {
  return knex('programs')
    .truncate()
    .then(function () {
      return knex('programs').insert([
        {name: 'progA', description:'pr blahA', length: 21, phase: 'strength', coach_id:1}
      ]);
    });
};