/* eslint-disable no-trailing-spaces */
/* eslint-disable no-multiple-empty-lines */
const express = require('express');
const router = express.Router();
const Programs = require('./programs-model');
const Workouts = require('../workouts/workouts-model');
const Clients = require('../clients/clients-model');
const {validTokenCheck, engineValidBdyChk, arrayObjectKeyCheck, validRecordIdCoachIdCheck} = require('../middleware/custom_middleware');

// ********************************************************
// POST /programs
// This uses nested thens that does not handle errors properly
// attempt-1
// ********************************************************
// router.post('/', validTokenCheck, (req, res) => {
//   let programObject = {...req.body};
//   delete programObject.workouts;
//   const coach_id = req.token.coachID;
//   programObject.coach_id = coach_id;

//   Programs.addProgram(programObject)
//     .then(savedProgram => {
//       let programId = savedProgram.id;
//       let workoutsArray = req.body.workouts.map(el => {
//         let tempObject1 = {...el};
//         delete tempObject1.exercises;
//         tempObject1.program_id = programId;
//         tempObject1.coach_id = coach_id;
//         return tempObject1;
//       });
//       // console.log('This is workoutsArray:',workoutsArray);
//       Workouts.addWorkout(workoutsArray)
//         .then(savedWorkouts => {
//           // workoutIdArray will return an array of the workout IDs for the program
//           let workoutIdArray = savedWorkouts.map(el => el.id);
//           // console.log('This is workoutIdArray:',workoutIdArray);

//           let exercisesArray = [];
//           req.body.workouts.forEach((elW, indexW) => {
//             elW.exercises.forEach((elE) => {
//               let tempObject2 = {};
//               tempObject2.exercise_id = elE.id;
//               tempObject2.exercise_details = elE.exercise_details;
//               tempObject2.order = elE.order;
//               tempObject2.workout_id = workoutIdArray[indexW];
//               exercisesArray.push(tempObject2);
//             });
//           });
//           // console.log('This is exercisesArray:',exercisesArray);
//           Workouts.addExercisesToWorkout(exercisesArray)
//             .then(() => {
//               bigDataResponseA(coach_id)
//                 .then(data=>res.status(201).json(data));
//             });
//         });
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// });

// ********************************************************
// POST /programs
// This does not use nested thens
// ********************************************************
router.post('/',
  validTokenCheck,
  checkPostPutEpKeys(false),
  chkCoachIDRecordIDPostPutEp(false),
  (req,res)=>{
    let programObject = {...req.body};
    delete programObject.workouts;
    const coach_id = req.token.coachID;
    programObject.coach_id = coach_id;

    Programs.addProgram(programObject)
      .then(savedProgram=>{
        return saveWorkoutsExerciseLinks(req.body,savedProgram.id,coach_id);
      })
      .then(()=>{
        return bigDataResponseA(coach_id);
      })
      .then(data=>res.status(201).json(data))
      .catch(error => {
        // console.log('In POST catch');
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
// PUT /programs
// ********************************************************
router.put('/',
  validTokenCheck,
  checkPostPutEpKeys(true),
  chkCoachIDRecordIDPostPutEp(true),
  (req,res)=>{
    let programObject = {...req.body};
    delete programObject.workouts;
    const coach_id = req.token.coachID;
    programObject.coach_id = coach_id;
    const program_id = programObject.id;

    Programs.updateProgram(program_id,programObject)
      .then(()=>{
        return removeWorkoutsExerciseLinks(program_id);
      })
      .then(()=>{
        return saveWorkoutsExerciseLinks(req.body,program_id,coach_id);
      })
      .then(()=>{
        return bigDataResponseA(coach_id);
      })
      .then(data=>res.status(200).json(data))
      .catch(error => {
        res.status(500).json(error);
      });
  });

// ********************************************************
// DELETE /programs/:id
// ********************************************************
router.delete('/:id',validTokenCheck,(req,res)=>{
  const program_id = req.params.id;
  const coach_id = req.token.coachID;

  Programs.getProgramById(program_id)
    .then(program=>{
      if (program && program.coach_id === coach_id) {
        return Programs.deleteProgram(program_id);
      } 
      else if (!program) {
        res.status(404).json({ error: `cannot delete program with id: ${program_id} because it does not exist` });
      }
      else {
        res.status(403).json({ error: `you are not authorized to delete program with id: ${program_id}`});
      }
    })
    .then(program=>{
      res.status(200).json(program);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// ********************************************************
// This function provides the response for:
// 1) POST /programs
// 2) GET /programs
// 3) PUT /programs
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
    const assignedClients = await Clients.extractClientsInProgram(progsArray[iP].id);
    progsArray[iP].assigned_clients = assignedClients.map(el=>el.client_id);
  }
  return progsArray;
}

// **************************************************************
// This function adds the workouts and exercise_workouts for:
// 1) POST /programs
// 2) PUT /programs
// **************************************************************
async function saveWorkoutsExerciseLinks(bigDataObject,program_id,coach_id) {
  //Create the workoutsArray 
  const workoutsArray = bigDataObject.workouts.map(el => {
    let tempObject1 = {...el};
    delete tempObject1.exercises;
    tempObject1.program_id = program_id;
    tempObject1.coach_id = coach_id;
    return tempObject1;
  });

  // Add elements of the workoutsArray one at a time to the workouts table
  // and build the exerciseArray
  const exercisesArray = [];
  for(let iW=0;iW<workoutsArray.length;iW++) {
    const workoutAdded = await Workouts.addWorkout(workoutsArray[iW]);
    // console.log('Here in saveWorkoutsExerciseLinks');
    bigDataObject.workouts[iW].exercises.forEach((elE) => {
      let tempObject2 = {};
      tempObject2.exercise_id = elE.exercise_id;
      tempObject2.exercise_details = elE.exercise_details;
      tempObject2.order = elE.order;
      tempObject2.workout_id = workoutAdded[0].id;
      exercisesArray.push(tempObject2);
    });   
  }

  // Add the exerciseArray in one go to the exercise_workouts table
  await Workouts.addExercisesToWorkout(exercisesArray);  
}

// **************************************************************
// This function deletes the workouts and exercise_workouts for:
// 1) PUT /programs
// **************************************************************
async function removeWorkoutsExerciseLinks(program_id) {
  const workoutsArray = await Workouts.getWorkoutByProgramId(program_id);
  for(let iW=0;iW<workoutsArray.length;iW++) {
    await Workouts.deleteWorkout(workoutsArray[iW].id);
  }
  // Since there is a CASCADE setting for the workouts foreign key
  // in the exercise_workouts table, once the workout is deleted, the 
  // corresponding exercise_workout will also be deleted
}

// **************************************************************
// This function validates the request body keys for the 
// POST & PUT /programs endpoint 
// The arg isPut must be true for the PUT endpoint and
// false for the POST endpoint
// **************************************************************
function checkPostPutEpKeys(isPut) {
  return function (req,res,next) {
    let isError = false;
    let errMsg = '';
    let rcdObj = undefined;
    let keys = undefined;
    
    //Check program
    const program = req.body;
    if(isPut) {
      keys = ['id','name','description','length','phase','workouts'];
    } 
    else {
      keys = ['name','description','length','phase','workouts'];
    }
    rcdObj = engineValidBdyChk(program,keys);
    if(rcdObj.isError) {
      isError = true;
      errMsg = rcdObj.errMsg;
    }

    //Check workouts
    const workouts = program.workouts;
    if(!isError) {
      keys = ['name','description','day','exercises'];
      rcdObj = arrayObjectKeyCheck(keys,workouts);
      if(!rcdObj.containsAll) {
        isError = true;
        errMsg = 'Workouts array has element with ' + 
          `index ${rcdObj.indexValue} missing the key ${rcdObj.missingKey}`;
      }
    }

    //Check exercises
    if(!isError) {
      const wrkOutLen = workouts.length;
      keys = ['exercise_id','order','exercise_details'];
      let iW=0;
      while(!isError && iW<wrkOutLen) {
        const exercises = workouts[iW].exercises;
        rcdObj = arrayObjectKeyCheck(keys,exercises);
        if(!rcdObj.containsAll) {
          isError = true;
          errMsg = `Workouts array element with index ${iW} has exercise array element with` + 
            ` index ${rcdObj.indexValue} missing the key ${rcdObj.missingKey}`;
        }
        iW++;
      }
    }

    if(isError) {
      res.status(400).json({ error: errMsg });
    }
    else {
      next();
    }
  };
}


// *********************************************************************
// This function validates the exercise_id as belonging to the coach_id 
// for the POST & PUT /programs endpoint 
// For PUT it also checks that the proram_id belongs to the coach_id
//
// The arg isPut must be true for the PUT endpoint and
// false for the POST endpoint
// *********************************************************************
function chkCoachIDRecordIDPostPutEp(isPut) {
  return function (req,res,next) {
    const coach_id = req.token.coachID;
    let passedProgramIdCheck=true;
    let passExerIdChk = true;

    // The intAF (internal Asyn Function) contains the core code of what is supposed to be done here
    // This structure where intAF is defined and then called below is advantages, because it allows
    // the use of asyn and await to write asynchronous code easily and then have only one catch block
    // for all of the awaits.
    const intAF = async () => {
      if(isPut) {
        const program_id = req.body.id;
        const program = await Programs.getProgramById(program_id);
        if(!program) {
          passedProgramIdCheck=false;
          res.status(400).json({ error: `program with id: ${program_id} does not exist` });
        }
        else if(coach_id !== program.coach_id) {
          passedProgramIdCheck=false;
          res.status(400).json({ error: `you do not have access to program with id: ${program_id}` });
        }
      }

      if(passedProgramIdCheck) {
        const workouts = req.body.workouts;
        const woLength = workouts.length;
        let iW=0;
        while(passExerIdChk && iW<woLength) {
          const exercises = workouts[iW].exercises;
          const exerIdArray = exercises.map(el=>el.exercise_id);
          const rcdObj = await validRecordIdCoachIdCheck(coach_id,'exercises',exerIdArray);
          if(!rcdObj.idExists) {
            passExerIdChk=false;
            const errMsg = `Exercise with id: ${rcdObj.badId}`+
              ` does not exist. This exercise is included in workouts array element with index ${iW}`;
            res.status(400).json({ error: errMsg });
          }
          if(!rcdObj.validCoachId) {
            passExerIdChk=false;
            const errMsg = `You do not have permission to access exercise with id ${rcdObj.badCId}. `+
              `This exercise is included in workouts array element with index ${iW}`;
            res.status(400).json({ error: errMsg });
          }
          iW++;
        }       
      }

      if(passedProgramIdCheck && passExerIdChk) {
        next();
      }
    };

    intAF()
      .catch(error => {
        // console.log('In the function chkCoachIDRecordIDPostPutEp');
        res.status(500).json(error);
      });
  };
}




module.exports = router;

