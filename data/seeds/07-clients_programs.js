
exports.seed = function(knex) {
  return knex('clients_programs')
    .truncate()
    .then(function () {
      return knex('clients_programs').insert([
        //For coach_id =1
        {client_id:3, program_id:2, start_date:'2020-2-10', current_day:1},
        {client_id:1, program_id:2, start_date:'2020-6-15', current_day:4},
        {client_id:2, program_id:2, start_date:'2020-12-05', current_day:7},

        // //For coach_id = 2
        {client_id:6, program_id:1, start_date:'2020-3-11', current_day:2},
        {client_id:5, program_id:1, start_date:'2020-4-17', current_day:5},
        {client_id:4, program_id:1, start_date:'2020-11-30', current_day:14}

      ]);
    });
};