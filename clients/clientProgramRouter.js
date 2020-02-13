const express = require('express');
const router = express.Router();
const Clients = require('./clients-model');
const {validTokenCheck, validBodyCheck} = require('../middleware/custom_middleware');

// ********************************************************
// POST /clients-programs
// ********************************************************
router.post('/clients', validTokenCheck, (req, res) => {
  let programId = req.body.id;
  //const coach_id = req.token.coachID;
  let clientProgramArray = req.body.clients.map(el => {
    let eachObject = {};
    eachObject.client_id = el.id;
    eachObject.program_id = programId;
    eachObject.start_date = el.start_date;
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
router.post('/program', validTokenCheck, (req, res) => {
  let clientProgramObject = {};
  clientProgramObject.client_id = req.body.id;
  clientProgramObject.program_id = req.body.program_id;
  clientProgramObject.start_date = req.body.start_date;
  //const coach_id = req.token.coachID;
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

module.exports = router;