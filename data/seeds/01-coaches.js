
exports.seed = function(knex) {
  return knex('coaches')
    .truncate()
    .then(function () {
      return knex('coaches').insert([
        {first_name: 'Arnold', last_name:'Swas', email:'as@mail.com', password:'qaz'}
      ]);
    });
};
