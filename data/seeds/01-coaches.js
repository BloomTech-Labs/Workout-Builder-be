const bcrypt = require('bcryptjs');
const {hashRounds} = require('../../consts');

exports.seed = function(knex) {
  return knex('coaches')
    .truncate()
    .then(function () {
      return knex('coaches').insert([
        {first_name: 'Arnold', last_name:'Swas', email:'as@mail.com', password: bcrypt.hashSync('qaz', hashRounds)},
        {first_name: 'Charles', last_name:'Johnson', email:'cj@mail.com', password: bcrypt.hashSync('qaz', hashRounds)}
      ]);
    });
};
