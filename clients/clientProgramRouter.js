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
router.post('/program', validTokenCheck, (req, res) => {
  let clientProgramObject = {};
  let date = new Date();
  clientProgramObject.client_id = req.body.id;
  clientProgramObject.program_id = req.body.program_id;
  //clientProgramObject.start_date = req.body.start_date;
  clientProgramObject.start_date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;

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

module.exports = router;