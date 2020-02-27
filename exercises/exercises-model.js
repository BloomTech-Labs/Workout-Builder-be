const db = require('../data/db-config');

module.exports = {
  getExercises,
  getExerciseById,
  addExercise,
  updateExercise,
  deleteExercise
};

function getExercises(coach_id) {
  return db('exercises')
    .where({ coach_id });
}

function getExerciseById(id) {
  return db('exercises')
    .where({ id })
    .first();
}

function addExercise(exercise) {
  return db('exercises')
    .insert(exercise, 'id')
    .then(ids => {
      const [id] = ids;
      return getExerciseById(id);
    });
}

function updateExercise(id, changes) {
  return db('exercises')
    .where('id', id)
    .update(changes)
    .then(count => {
      if (count > 0) {
        return getExerciseById(id);
      }
    });
}

function deleteExercise(id) {
  let deletedExercise = {};
  db('exercises')
    .where({ id })
    .first()
    .then(exercise => {
      deletedExercise = exercise;
    });
  return db('exercises')
    .where('id', id)
    .del()
    .then(count => {
      if (count > 0) {
        return deletedExercise;
      }
    });
}