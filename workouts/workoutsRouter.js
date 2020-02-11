/* eslint-disable no-multiple-empty-lines */
const express = require('express');
const router = express.Router();
const Workouts = require('./workouts-model');

// ************************************** WORKOUTS ********************************************* //

// ********************************************************
// POST /workouts
// ********************************************************
router.post('/', (req, res) => {
  Workouts.addWorkout(req.body)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});





// ************************************** EXERCISES_WORKOUTS ********************************************* //

// ********************************************************
// POST /workouts/exercises
// ********************************************************
router.post('/exercises', (req, res) => {
  Workouts.addExerciseToWorkout(req.body)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// ********************************************************
// GET /workouts/exercises
// ********************************************************
router.get('/exercises', (req, res) => {
  Workouts.getExercisesInWorkout(req.body)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// ********************************************************
// DELETE /workouts/exercises
// ********************************************************
router.delete('/exercises', (req, res) => {
  Workouts.deleteExerciseInWorkout(req.body)
    .then(data => {
      res.status(200).json(`${data} items deleted successfully`);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;