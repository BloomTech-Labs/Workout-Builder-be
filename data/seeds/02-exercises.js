
exports.seed = function(knex) {
  return knex('exercises')
    .truncate()
    .then(function () {
      return knex('exercises').insert([
        {name: 'exerA', focal_points:'ex textA', coach_id:1},
        {name: 'exerB', focal_points:'ex textB', coach_id:1},
        {name: 'exerC', focal_points:'ex textC', coach_id:1}
      ]);
    });
};
