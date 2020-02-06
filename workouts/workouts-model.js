const db = require('../data/db-config');

module.exports = {
  getWorkouts,
  getWorkoutById,
  addWorkout,
  updateWorkout,
  deleteWorkout,
  //addExerciseToWorkout
};

function getWorkouts(coach_id) {
  return db('workouts')
    .where({ coach_id });
}

function getWorkoutById(id) {
  return db('workouts')
    .where({ id })
    .first();
}

function addWorkout(workout) {
  return db('workouts')
    .insert(workout, 'id')
    .then(ids => {
      const [id] = ids;
      return getWorkoutById(id);
    });
}

function updateWorkout(id, changes) {
  return db('workouts')
    .where('id', id)
    .update(changes)
    .then(count => {
      if (count > 0) {
        return getWorkoutById(id);
      }
    });
}

function deleteWorkout(id) {
  let deletedWorkout = {};
  db('workouts')
    .where({ id })
    .first()
    .then(workout => {
      deletedWorkout = workout;
    });
  return db('workouts')
    .where('id', id)
    .del()
    .then(count => {
      if (count > 0) {
        return deletedWorkout;
      }
    });
}

// function addExerciseToWorkout(exercise) {
//     return db('exercises_workouts')
//     .insert(exercise, 'id')
//     .then(ids => {
//         const [id] = ids;
//         return
//     })
// }