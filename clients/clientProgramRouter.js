const express = require('express');
const router = express.Router();
const Clients = require('./clients-model');
const Programs = require('../programs/programs-model');
const {validTokenCheck, validBodyCheck, validRecordIdCoachIdCheck} = require('../middleware/custom_middleware');

// ********************************************************
// POST /clients-programs
// ********************************************************
router.post('/', validTokenCheck, validBodyCheck(['program_id', 'client_ids']), validAddClientsToProgramCheck, (req, res) => {
  let programId = req.body.program_id;

  let clientProgramArray = req.body.client_ids.map(el => {
    let eachObject = {};
    let date = new Date();
    eachObject.client_id = el;
    eachObject.program_id = programId;
    eachObject.start_date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    return eachObject;
  });

  Clients.addClientsToProgram(clientProgramArray)
    .then(savedArray => {
      res.status(201).json(savedArray);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// ********************************************************
// DELETE /clients-programs
// ********************************************************
router.delete('/', validTokenCheck, validBodyCheck(['client_id', 'program_id']), (req, res) => {
  const record = req.body;
  const coach_id = req.token.coachID;

  Clients.getClientsInProgram([record])
    .then(data => {
      if (!data[0]) {
        const errMsg = `cannot delete record with program_id: ${record.program_id} ` +
        `and client_id: ${record.client_id} because it does not exist`;

        res.status(404).json({ error: errMsg });
      } else {
        return Programs.getProgramById(record.program_id);
      }
    })
    .then(programObject => {
      if (programObject) {
        if (coach_id !== programObject.coach_id) {
          const errMsg = `you cannot delete record with program_id: ${record.program_id} ` +
        'because you do not have access to it';
          res.status(404).json({ error: errMsg });
        } else {
          return Clients.getClientById(record.client_id);
        }
      }
    })
    .then(clientObject => {
      if (clientObject) {
        if (coach_id !== clientObject.coach_id) {
          const errMsg = `you cannot delete record with client_id: ${record.client_id} ` +
        'because you do not have access to it';
          res.status(404).json({ error: errMsg });
        } else {
          return Clients.deleteProgramForClient(record);
        }
      }
    })
    .then(data => {
      if (data) {
        res.status(200).json(`${data} item deleted successfully`);
      }
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

  validRecordIdCoachIdCheck(coach_id, 'programs', [req.body.program_id])
    .then(returnObject => {
      if (returnObject.idExists === false) {
        res.status(400).json({ message: `program with id: ${req.body.program_id} does not exist` });
      } else if (returnObject.validCoachId === false) {
        res.status(400).json({ message: `you do not have access to program with id: ${req.body.program_id}` });
      } else {
        return validRecordIdCoachIdCheck(coach_id, 'clients', req.body.client_ids);
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

module.exports = router;