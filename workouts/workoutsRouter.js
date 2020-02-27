// /* eslint-disable no-multiple-empty-lines */

// const express = require('express');
// const router = express.Router();
// const Workouts = require('./workouts-model');

// // ************************************** WORKOUTS ********************************************* //

// // ********************************************************
// // POST /workouts
// // ********************************************************
// router.post('/', (req, res) => {
//   Workouts.addWorkout(req.body)
//     .then(saved => {
//       res.status(201).json(saved);
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// });

// // ************************************** EXERCISES_WORKOUTS ********************************************* //

// // ********************************************************
// // POST /workouts/exercises
// // ********************************************************
// router.post('/exercises', (req, res) => {
//   Workouts.addExercisesToWorkout(req.body)
//     .then(saved => {
//       res.status(201).json(saved);
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// });

// // ********************************************************
// // GET /workouts/exercises
// // ********************************************************
// router.get('/exercises', (req, res) => {
//   Workouts.getExercisesInWorkout(req.body)
//     .then(data => {
//       res.status(200).json(data);
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// });

// //********************************************************
// //GET /:id
// //********************************************************
// router.get('/:id', validTokenCheck, (req, res) => {
//   const id = req.params.id;
//   const coach_id = req.token.coachID;

//   Workouts.getWorkoutById(id)
//     .then(workouts=> {

//       if (workouts && workouts.coach_id === coach_id) {
//         res.status(200).json(workouts);
//       } else if (!workouts) {
//         res.status(404).json({ error: `cannot get workouts with id: ${id} because it does not exist` });
//       } else {
//         res.status(403).json({ error: `you are not authorized to get workouts with id: ${id}`});
//       }
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// });

// // ********************************************************
// // DELETE /workouts/exercises
// // ********************************************************
// router.delete('/exercises', (req, res) => {
//   Workouts.deleteExerciseInWorkout(req.body)
//     .then(data => {
//       res.status(200).json(`${data} items deleted successfully`);
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// });

// module.exports = router;

