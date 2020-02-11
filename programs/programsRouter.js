/* eslint-disable no-multiple-empty-lines */
const express = require('express');
const router = express.Router();
const Programs = require('./programs-model');
const Workouts = require('../workouts/workouts-model');
const {validTokenCheck, validBodyCheck} = require('../middleware/custom_middleware');

// ********************************************************
// POST /programs
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
        let tempObject = {...el};
        delete tempObject.exercises;
        tempObject.program_id = programId;
        tempObject.coach_id = coach_id;
        return tempObject;
      });
      console.log(workoutsArray);
      Workouts.addWorkout(workoutsArray)
        .then(savedWorkouts => {
          // workoutIdArray will return an array of the workout IDs for the program
          let workoutIdArray = savedWorkouts.map(el => el.id);
          console.log(workoutIdArray, '<-- workoutIdArray');

          let exercisesArray = [];
          req.body.workouts.forEach((elW, indexW) => {
            elW.exercises.forEach((elE, indexE) => {
              let tempObject2 = {};
              tempObject2.exercise_id = elE.id;
              tempObject2.exercise_details = elE.exercise_details;
              tempObject2.order = indexE + 1;
              tempObject2.workout_id = workoutIdArray[indexW];
              exercisesArray.push(tempObject2);
            });
          });

          console.log(exercisesArray, '<-- exercisesArray');




          res.status(201).json(savedWorkouts);
        });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;