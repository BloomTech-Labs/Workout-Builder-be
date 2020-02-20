const db = require('../data/db-config');

module.exports = {
  addCoach,
  findCoachBy,
  getCoachById
};

function addCoach(coach) {
  if (coach.email) coach.email = coach.email.toLowerCase();
  return db('coaches')
    .insert(coach, 'id')
    .then(ids => {
      const [id] = ids;
      return db('coaches')
        .where({ id })
        .first();
    });
}

function findCoachBy(email) {
  email = email.toLowerCase();
  return db('coaches') //This line of code is good - keep in final version
  // return db('coachesBAD') //This line of code is bad - comment out in final version
    .where({email})
    .first();
}

function getCoachById(id) {
  return db('coaches')
    .where({ id })
    .first();
}
