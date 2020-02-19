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
      if (client && client.coach_id === coach_id) {
        res.status(200).json(client);
      } else if (!client) {
        res.status(404).json({ error: `cannot get client with id: ${id} because it does not exist` });
      } else {
        res.status(403).json({ error: `you are not authorized to get client with id: ${id}`});
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

module.exports = router;