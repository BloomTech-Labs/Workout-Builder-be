
exports.seed = function(knex) {
  return knex('clients_programs')
    .truncate()
    .then(function () {
      return knex('clients_programs').insert([
        //For coach_id =1
        {client_id:3, program_id:2, start_date:'02/10/2020', current_day:1},
        {client_id:1, program_id:2, start_date:'03/15/2020', current_day:4},
        {client_id:2, program_id:2, start_date:'02/15/2020', current_day:7},

        // //For coach_id = 2
        {client_id:6, program_id:1, start_date:'05/10/2020', current_day:2},
        {client_id:5, program_id:1, start_date:'06/15/2020', current_day:5},
        {client_id:4, program_id:1, start_date:'07/15/2020', current_day:14}

      ]);
    });
};