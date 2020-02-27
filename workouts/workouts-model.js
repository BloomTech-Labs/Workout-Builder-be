const db = require('../data/db-config');

module.exports = {
  getWorkouts,
  getWorkoutById,
  addWorkout,
  updateWorkout,
  deleteWorkout,
  getExercisesInWorkout,
  addExercisesToWorkout,
  deleteExerciseInWorkout,
  getWorkoutByProgramId,
  getExercisesByWorkoutId
};

// The arg coach_id is a integer
function getWorkouts(coach_id) {
  return db('workouts')
    .where({ coach_id });
}

// The arg id is an array of ids
function getWorkoutById(id) {
  return db('workouts')
    .whereIn('id', id);

  //.where({ id });
}

// The arg program_id is an integer
function getWorkoutByProgramId(program_id) {
  return db('workouts')
    .where({program_id})
    .select('id', 'name', 'description', 'day');
}

// The arg workouts is an array of workouts
function addWorkout(workouts) {
  // console.log('Here in addWorkout');
  return db('workouts') //This is correct code - keep in final version of program
  //return db('workoutsBAD') //Bad code for test - comment out in final version of program
    .insert(workouts, 'id')
    .then(ids => {
      // console.log('This is ids in addWorkout:',ids);
      // added logic to account for differences between returning method of sqlite3 and postgres
      if (workouts.length > 1 && ids.length === 1) {
        let builtArray = [];
        for (let i = 0; i < workouts.length; i++) {
          builtArray[i] = ids[0] - (workouts.length-1) + i;
        }
        // console.log(builtArray, '<-- builtArray');
        return getWorkoutById(builtArray);
      }
      // console.log(ids, '<-- ids');
      return getWorkoutById(ids);
    });
}

// The arg id is an integer
// The arg changes is an object
function updateWorkout(id, changes) {
  return db('workouts')
    .where('id', id)
    .update(changes)
    .then(count => {
      if (count > 0) {
        return getWorkoutById([id]);
      }
    });
}

// The arg id is an integer
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

// The arg workout_id is an integer
function getExercisesByWorkoutId(workout_id) {
  return db('exercises_workouts')
    .where({workout_id}) // This is the correct line of code to use
    // .where('workout_idAAA', workout_id) // This is code used for testing error handling should be commented out
    .select('exercise_id','order','exercise_details');
}

//JSON body should be an array; each element in the array is { exercise_id, workout_id, order, exercise_details }
function addExercisesToWorkout(exerciseWorkout) {
  // console.log('Here in addExercisesToWorkout');
  return db('exercises_workouts') //This is correct code - keep in final version of program
  //return db('exercises_workoutsBAD') //Bad code for test - comment out in final version of program
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