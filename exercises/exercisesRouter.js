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

      if (exercise && exercise.coach_id === coach_id) {
        res.status(200).json(exercise);
      } else if (!exercise) {
        res.status(404).json({ error: `cannot get exercise with id: ${id} because it does not exist` });
      } else {
        res.status(403).json({ error: `you are not authorized to get exercise with id: ${id}`});
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
      console.log(exercise);
      if (exercise && exercise.coach_id === coach_id) {
        return Exercises.deleteExercise(id);
      } else if (!exercise) {
        res.status(404).json({ error: `cannot delete exercise with id: ${id} because it does not exist` });
      } else {
        res.status(403).json({ error: `you are not authorized to delete exercise with id: ${id}`});
      }
    })
    .then(exercise => {
      if(exercise) {
        res.status(200).json(exercise);
      }
    })
    .catch(error => {
      console.log(error);
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
      if (exercise && exercise.coach_id === coach_id) {
        return Exercises.updateExercise(id, exerciseData);
      } else if (!exercise) {
        res.status(404).json({ error: `cannot update exercise with id: ${id} because it does not exist` });
      } else {
        res.status(403).json({ error: `you are not authorized to update exercise with id: ${id}`});
      }
    })
    .then(exercise => {
      if(exercise) {
        res.status(200).json(exercise);
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;