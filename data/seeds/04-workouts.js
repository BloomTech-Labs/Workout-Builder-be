
exports.seed = function(knex) {
  return knex('workouts')
    .truncate()
    .then(function () {
      return knex('workouts').insert([
        {name: 'workA', description:'workA desc', day: 1, coach_id:1, program_id: 2},
        {name: 'workB', description:'workB desc', day: 2, coach_id:1, program_id: 2},
        {name: 'workC', description:'workC desc', day: 1, coach_id:2, program_id: 1},
        {name: 'workD', description:'workD desc', day: 2, coach_id:2, program_id: 1}
      ]);
    });
};