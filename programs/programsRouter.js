/* eslint-disable no-trailing-spaces */
/* eslint-disable no-multiple-empty-lines */
const express = require('express');
const router = express.Router();
const Programs = require('./programs-model');
const Workouts = require('../workouts/workouts-model');
const {validTokenCheck, validBodyCheck} = require('../middleware/custom_middleware');

// ********************************************************
// POST /programs
// This uses nested thens that does not handle errors properly
// ********************************************************
router.post('/', validTokenCheck, (req, res) => {
  let programObject = {...req.body};
  delete programObject.workouts;
  const coach_id = req.token.coachID;
  programObject.coach_id = coach_id;

  Programs.addProgram(programObject)
    .then(savedProgram => {
      let programId = savedProgram.id;
      let workoutsArray = req.body.workouts.map(el => {
        let tempObject1 = {...el};
        delete tempObject1.exercises;
        tempObject1.program_id = programId;
        tempObject1.coach_id = coach_id;
        return tempObject1;
      });
      // console.log('This is workoutsArray:',workoutsArray);
      Workouts.addWorkout(workoutsArray)
        .then(savedWorkouts => {
          // workoutIdArray will return an array of the workout IDs for the program
          let workoutIdArray = savedWorkouts.map(el => el.id);
          // console.log('This is workoutIdArray:',workoutIdArray);

          let exercisesArray = [];
          req.body.workouts.forEach((elW, indexW) => {
            elW.exercises.forEach((elE) => {
              let tempObject2 = {};
              tempObject2.exercise_id = elE.id;
              tempObject2.exercise_details = elE.exercise_details;
              tempObject2.order = elE.order;
              tempObject2.workout_id = workoutIdArray[indexW];
              exercisesArray.push(tempObject2);
            });
          });
          // console.log('This is exercisesArray:',exercisesArray);
          Workouts.addExercisesToWorkout(exercisesArray)
            .then(() => {
              bigDataResponseA(coach_id)
                .then(data=>res.status(201).json(data));
            });
        });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// ********************************************************
// GET /programs
// ********************************************************
router.get('/', validTokenCheck, (req,res) => {
  const coach_id = req.token.coachID;
  bigDataResponseA(coach_id)
    .then(data=>res.status(200).json(data))
    .catch(error => {
      res.status(500).json(error);
    });
});

// ********************************************************
// This funbction provides the response for:
// 1) POST /programs
// 2) GET /programs
// ********************************************************
async function bigDataResponseA(coach_id) {
  const progsArray = await Programs.getPrograms(coach_id);
  
  for(let iP=0;iP<progsArray.length;iP++) {
    const workoutsArray = await Workouts.getWorkoutByProgramId(progsArray[iP].id);
    progsArray[iP].workouts = workoutsArray;
    for(let iW=0;iW<workoutsArray.length;iW++) {
      const exerciseArray = await Workouts.getExercisesByWorkoutId(workoutsArray[iW].id);
      workoutsArray[iW].exercises = exerciseArray;
    }
  }
  return progsArray;
}


module.exports = router;

