const express = require('express');
const router = express.Router();
const Clients = require('./clients-model');
const { validTokenCheck, validBodyCheck } = require('../middleware/custom_middleware');

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
  let emailIsUnique = true;

  Clients.getClients(coach_id)
    .then(clientsArray => {
      for (let i = 0; i < clientsArray.length; i++) {
        if (clientsArray[i].email.toLowerCase() === clientData.email.toLowerCase()) {
          emailIsUnique = false;
        }
      }
      if (emailIsUnique === true) {
        return Clients.addClient(clientData);
      } else {
        res.status(400).json({ error: 'The email you provided belongs to another client' });
      }
    })
    .then(client => {
      if (client) {
        res.status(201).json(client);
      }
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
        return Clients.deleteClient(id);
      } else if (!client) {
        res.status(404).json({ error: `cannot delete client with id: ${id} because it does not exist` });
      } else {
        res.status(403).json({ error: `you are not authorized to delete client with id: ${id}` });
      }
    })
    .then(client => {
      if (client) {
        res.status(200).json(client);
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
  const id = req.params.id;
  const clientData = req.body;
  clientData.coach_id = coach_id;
  let emailIsUnique = true;
  let clientEmail;

  Clients.getClientById(id)
    .then(client => {
      if (client && client.coach_id === coach_id) {
        clientEmail = client.email;
        return Clients.getClients(coach_id);
      } else if (!client) {
        res.status(404).json({ error: `cannot update client with id: ${id} because it does not exist` });
      } else {
        res.status(403).json({ error: `you are not authorized to update client with id: ${id}` });
      }
    })
    .then(clientsArray => {
      if (clientsArray) {
        for (let i = 0; i < clientsArray.length; i++) {
          if (clientsArray[i].email.toLowerCase() === clientData.email.toLowerCase() && clientsArray[i].email !== clientEmail) {
            emailIsUnique = false;
          }
        }
        if (emailIsUnique === true) {
          return Clients.updateClient(id, clientData);
        } else {
          res.status(400).json({ error: 'The email you provided belongs to another client' });
        }
      }
    })
    .then(client => {
      if (client) {
        res.status(200).json(client);
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;