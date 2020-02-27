
exports.seed = function(knex) {
  return knex('programs')
    .truncate()
    .then(function () {
      return knex('programs').insert([
        {name: 'progA', description:'progA desc', length: 5, phase: 'progA phase', coach_id:2},
        {name: 'progB', description:'progB desc', length: 6, phase: 'progB phase', coach_id:1}
      ]);
    });
};