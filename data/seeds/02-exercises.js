
exports.seed = function(knex) {
  return knex('exercises')
    .truncate()
    .then(function () {
      return knex('exercises').insert([
        {name: 'exerA', focal_points:'ex textA', coach_id:1},
        {name: 'exerB', focal_points:'ex textB', coach_id:1},
        {name: 'exerC', focal_points:'ex textC', coach_id:1},
        {name: 'exerD', focal_points:'ex textD', coach_id:1},
        {name: 'exerE', focal_points:'ex textE', coach_id:2},
        {name: 'exerF', focal_points:'ex textF', coach_id:2},
        {name: 'exerG', focal_points:'ex textG', coach_id:2}
      ]);
    });
};
