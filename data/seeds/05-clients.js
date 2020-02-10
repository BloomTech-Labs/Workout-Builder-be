
exports.seed = function(knex) {
  return knex('clients')
    .truncate()
    .then(function () {
      return knex('clients').insert([
        {first_name: 'clientFirstA', last_name: 'clientLastA', email: 'ca@mail.com', coach_id: 1,},
        {first_name: 'clientFirstB', last_name: 'clientLastB', email: 'cb@mail.com', coach_id: 1,},
        {first_name: 'clientFirstC', last_name: 'clientLastC', email: 'cc@mail.com', coach_id: 2,}
      ]);
    });
};