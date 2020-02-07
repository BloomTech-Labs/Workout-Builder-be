const express = require('express');
const router = express.Router();
const Workouts = require('./workouts-model');

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

module.exports = router;