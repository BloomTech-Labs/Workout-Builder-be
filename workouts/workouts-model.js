const db = require('../data/db-config');

module.exports = {
  getWorkouts,
  getWorkoutById,
  addWorkout,
  updateWorkout,
  deleteWorkout,
  addExerciseToWorkout
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

function getExercisesInWorkout(exerciseWorkout) {
  const exerciseIds = exerciseWorkout.map(el => el.exercise_id);
  const workoutIds = exerciseWorkout.map(el => el.workout_id);
  return db('exercises_workouts')
    .whereIn('exercise_id', exerciseIds)
    .andWhereIn('workout_id', workoutIds);
}

function addExerciseToWorkout(exerciseWorkout) {
//   const exerciseIds = exerciseWorkout.map(el => el.exercise_id);
//   const workoutIds = exerciseWorkout.map(el => el.workout_id);
  return db('exercises_workouts')
    .insert(exerciseWorkout)
    .then(ids => {
      console.log(ids);
      //const [id] = ids;
      return getExercisesInWorkout(exerciseWorkout);
    });

  //.where({ exercise_id:exerciseWorkout[0].exercise_id, workout_id:exerciseWorkout[0].workout_id });
}
//      else if (count[0] > 1) {
//       return db('exercises_worktous')
//       .where({ exerciseWorkout })
//   }

