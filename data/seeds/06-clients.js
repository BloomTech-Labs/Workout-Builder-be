
exports.seed = function(knex) {
  return knex('clients')
    .truncate()
    .then(function () {
      return knex('clients').insert([
        {first_name: 'clientFirstA', last_name: 'clientLastA', email: 'clienta@mail.com', coach_id: 1,},
        {first_name: 'clientFirstB', last_name: 'clientLastB', email: 'clientb@mail.com', coach_id: 1,},
        {first_name: 'clientFirstC', last_name: 'clientLastC', email: 'clientc@mail.com', coach_id: 1,},
        {first_name: 'clientFirstD', last_name: 'clientLastD', email: 'clientd@mail.com', coach_id: 2,},
        {first_name: 'clientFirstE', last_name: 'clientLastE', email: 'cliente@mail.com', coach_id: 2,},
        {first_name: 'clientFirstF', last_name: 'clientLastF', email: 'clientf@mail.com', coach_id: 2,}
      ]);
    });
};