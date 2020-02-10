
exports.seed = function(knex) {
  return knex('workouts')
    .truncate()
    .then(function () {
      return knex('workouts').insert([
        {name: 'workA', description:'wo blahA', day: 1, coach_id:1, program_id: 1},
        {name: 'workB', description:'wo blahB', day: 2, coach_id:1, program_id: 1}
      ]);
    });
};