
exports.seed = function(knex) {
  return knex('workouts')
    .truncate()
    .then(function () {
      return knex('workouts').insert([
        {name: 'workA', description:'wo blahA', day: 1, coach_id:1, program_id: 1},
        {name: 'workB', description:'wo blahB', day: 2, coach_id:1, program_id: 1},
        {name: 'workC', description:'wo blahC', day: 1, coach_id:2, program_id: 2},
        {name: 'workD', description:'wo blahD', day: 2, coach_id:2, program_id: 2}
      ]);
    });
};