const express = require('express');
const router = express.Router();
const Clients = require('./clients-model');
const {validTokenCheck, validBodyCheck, validCoachIdCheck, validRecordIdCoachIdCheck} = require('../middleware/custom_middleware');

// ********************************************************
// POST /clients-programs
// ********************************************************
router.post('/clients', validTokenCheck, validBodyCheck(['id', 'clients']), validAddClientsToProgramCheck, (req, res) => {
  let programId = req.body.id;

  let clientProgramArray = req.body.clients.map(el => {
    let eachObject = {};
    let date = new Date();
    eachObject.client_id = el;
    eachObject.program_id = programId;
    eachObject.start_date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    return eachObject;
  });
  console.log(clientProgramArray, '<-- saved array');

  Clients.addClientsToProgram(clientProgramArray)
    .then(savedArray => {
      res.status(201).json(savedArray);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// ********************************************************
// POST /clients-programs
// ********************************************************
router.post('/program', validTokenCheck, validBodyCheck(['id', 'program_id']), validAddProgramToClientCheck, (req, res) => {
  let clientProgramObject = {};
  let date = new Date();
  clientProgramObject.client_id = req.body.id;
  clientProgramObject.program_id = req.body.program_id;
  clientProgramObject.start_date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;

  console.log(clientProgramObject, '<-- saved object');

  Clients.addProgramToClient(clientProgramObject)
    .then(savedObject => {
      res.status(201).json(savedObject);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// ********************************************************
// DELETE /clients-programs
// ********************************************************
router.delete('/', validTokenCheck, (req, res) => {
  Clients.deleteProgramForClient(req.body)
    .then(data => {
      res.status(200).json(`${data} item(s) deleted successfully`);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// ********************************************************
// GET /clients-programs/dashboard
// ********************************************************
router.get('/dashboard', validTokenCheck, (req, res) => {
  const coach_id = req.token.coachID;

  Clients.getDashboardInfo(coach_id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// ------------------------------ MIDDLEWARE ----------------------------------- //

// ********************************************************
// validAddClientsToProgramCheck
// ********************************************************
function validAddClientsToProgramCheck (req, res, next) {
  const coach_id = req.token.coachID;

  validRecordIdCoachIdCheck(coach_id, 'programs', [req.body.id])
    .then(returnObject => {
      if (returnObject.idExists === false) {
        res.status(400).json({ message: `program with id: ${req.body.id} does not exist` });
      } else if (returnObject.validCoachId === false) {
        res.status(400).json({ message: `you do not have access to program with id: ${req.body.id}` });
      } else {
        return validRecordIdCoachIdCheck(coach_id, 'clients', req.body.clients);
      }
    })
    .then(returnObject => {
      if (returnObject.idExists === false) {
        res.status(400).json({ message: `client with id: ${returnObject.badId} does not exist` });
      }else if (returnObject.validCoachId === false) {
        res.status(400).json({ message: `you do not have access to client with id: ${returnObject.badCId}` });
      } else {
        next();
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

// ********************************************************
// validAddProgramToClientCheck
// ********************************************************
function validAddProgramToClientCheck (req, res, next) {
  const coach_id = req.token.coachID;

  validRecordIdCoachIdCheck(coach_id, 'clients', [req.body.id])
    .then(returnObject => {
      if (returnObject.idExists === false) {
        res.status(400).json({ message: `client with id: ${req.body.id} does not exist` });
      } else if (returnObject.validCoachId === false) {
        res.status(400).json({ message: `you do not have access to client with id: ${req.body.id}` });
      } else {
        return validRecordIdCoachIdCheck(coach_id, 'programs', [req.body.program_id]);
      }
    })
    .then(returnObject => {
      if (returnObject.idExists === false) {
        res.status(400).json({ message: `program with id: ${returnObject.badId} does not exist` });
      }else if (returnObject.validCoachId === false) {
        res.status(400).json({ message: `you do not have access to program with id: ${returnObject.badCId}` });
      } else {
        next();
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

module.exports = router;