const express = require('express');
const router = express.Router();
const Workouts = require('./workouts-model');

// ********************************************************
// POST /workouts/exercises
// ********************************************************
router.post('/exercises', (req, res) => {
  Workouts.addExerciseToWorkout(req.body)
    .then(saved => {
      console.log(saved, 'console log for "saved"');
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;