const express = require('express');
const router = express.Router();
const Exercises = require('./exercises-model');
const {validTokenCheck, validBodyCheck} = require('../middleware/custom_middleware');

//********************************************************
//GET /
//********************************************************
router.get('/', validTokenCheck, (req, res) => {
  const coach_id = req.token.coachID;

  Exercises.getExercises(coach_id)
    .then(exercises => {
      res.status(200).json(exercises);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//********************************************************
//GET /:id
//********************************************************
router.get('/:id', validTokenCheck, (req, res) => {
  const id = req.params.id;
  const coach_id = req.token.coachID;

  Exercises.getExerciseById(id)
    .then(exercise => {
      if (exercise.coach_id === coach_id) {
        res.status(200).json(exercise);
      } else {
        res.status(403).json({ error: `you are not authorized to access exercise with id: ${id}`});
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//********************************************************
//POST /
//********************************************************
router.post('/', validTokenCheck, validBodyCheck(['name']), (req, res) => {
  const coach_id = req.token.coachID;
  const exerciseData = req.body;
  exerciseData.coach_id = coach_id;

  Exercises.addExercise(exerciseData)
    .then(exercise => {
      res.status(201).json(exercise);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//********************************************************
//DELETE /:id
//********************************************************
router.delete('/:id', validTokenCheck, (req, res) => {
  const coach_id = req.token.coachID;
  const id = req.params.id;

  Exercises.getExerciseById(id)
    .then(exercise => {
      if (exercise.coach_id === coach_id) {
        Exercises.deleteExercise(id)
          .then(exercise => {
            res.status(200).json(exercise);
          });
      } else {
        res.status(403).json({ error: `you are not authorized to delete exercise with id: ${id}`});
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//********************************************************
//PUT /:id
//********************************************************
router.put('/:id', validTokenCheck, validBodyCheck(['name']), (req, res) => {
  const coach_id = req.token.coachID;
  const exerciseData = req.body;
  const id = req.params.id;
  exerciseData.coach_id = coach_id;

  Exercises.getExerciseById(id)
    .then(exercise => {
      if (exercise.coach_id === coach_id) {
        Exercises.updateExercise(id, exerciseData)
          .then(exercise => {
            res.status(200).json(exercise);
          });
      } else {
        res.status(403).json({ error: `you are not authorized to update exercise with id: ${id}`});
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;