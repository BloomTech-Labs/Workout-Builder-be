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
          res.status(201).json(savedWorkouts);
        });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;