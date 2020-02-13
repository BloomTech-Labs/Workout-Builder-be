const express = require('express');
const router = express.Router();
const Clients = require('./clients-model');
const {validTokenCheck, validBodyCheck} = require('../middleware/custom_middleware');

//********************************************************
//GET /
//********************************************************
router.get('/', validTokenCheck, (req, res) => {
  const coach_id = req.token.coachID;

  Clients.getClients(coach_id)
    .then(clients => {
      res.status(200).json(clients);
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

  Clients.getClientById(id)
    .then(client => {
      if (client.coach_id === coach_id) {
        res.status(200).json(client);
      } else {
        res.status(403).json({ error: `you are not authorized to access client with id: ${id}`});
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//********************************************************
//POST /
//********************************************************
router.post('/', validTokenCheck, validBodyCheck(['first_name', 'last_name', 'email']), (req, res) => {
  const coach_id = req.token.coachID;
  const clientData = req.body;
  clientData.coach_id = coach_id;

  Clients.addClient(clientData)
    .then(client => {
      res.status(201).json(client);
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

  Clients.getClientById(id)
    .then(client => {
      if (client && client.coach_id === coach_id) {
        Clients.deleteClient(id)
          .then(client => {
            res.status(200).json(client);
          });
      } else if (!client) {
        res.status(404).json({ error: `cannot delete client with id: ${id} because it does not exist` });
      } else {
        res.status(403).json({ error: `you are not authorized to delete client with id: ${id}`});
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//********************************************************
//PUT /:id
//********************************************************
router.put('/:id', validTokenCheck, validBodyCheck(['first_name', 'last_name', 'email']), (req, res) => {
  const coach_id = req.token.coachID;
  const clientData = req.body;
  const id = req.params.id;
  clientData.coach_id = coach_id;

  Clients.getClientById(id)
    .then(client => {
      if (client && client.coach_id === coach_id) {
        Clients.updateClient(id, clientData)
          .then(client => {
            res.status(200).json(client);
          });
      } else if (!client) {
        res.status(404).json({ error: `cannot update client with id: ${id} because it does not exist` });
      } else {
        res.status(403).json({ error: `you are not authorized to update client with id: ${id}`});
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// --------------------------- CLIENTS_PROGRAMS ---------------------------- //

// ********************************************************
// POST /clients/programs
// ********************************************************
router.post('/programs', validTokenCheck, (req, res) => {
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
// POST /clients/program
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

module.exports = router;