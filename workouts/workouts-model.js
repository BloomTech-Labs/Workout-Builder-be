const db = require('../data/db-config');

module.exports = {
  getWorkouts,
  getWorkoutById,
  addWorkout,
  updateWorkout,
  deleteWorkout,
  getExercisesInWorkout,
  addExerciseToWorkout,
  deleteExerciseInWorkout
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

//JSON body should be an array; each element in the array is { exercise_id, workout_id }
function getExercisesInWorkout(exerciseWorkout) {
  const exerciseIds = exerciseWorkout.map(el => el.exercise_id);
  const workoutIds = exerciseWorkout.map(el => el.workout_id);
  return db('exercises_workouts')
    .whereIn('exercise_id', exerciseIds)
    .whereIn('workout_id', workoutIds);
}

//JSON body should be an array; each element in the array is { exercise_id, workout_id, order, exercise_details }
function addExerciseToWorkout(exerciseWorkout) {
  return db('exercises_workouts')
    .insert(exerciseWorkout)
    .then(() => {
      return getExercisesInWorkout(exerciseWorkout);
    });
}

//JSON body should be an array; each element in the array is { exercise_id, workout_id }
function deleteExerciseInWorkout(exerciseWorkout) {
  const exerciseIds = exerciseWorkout.map(el => el.exercise_id);
  const workoutIds = exerciseWorkout.map(el => el.workout_id);
  return db('exercises_workouts')
    .whereIn('exercise_id', exerciseIds)
    .whereIn('workout_id', workoutIds)
    .del()
    .then(count => {
      return count;
    });
}