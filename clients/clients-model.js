const db = require('../data/db-config');

module.exports = {
  getClients,
  getClientById,
  addClient,
  updateClient,
  deleteClient
};

function getClients(coach_id) {
  return db('clients')
    .where({ coach_id });
}

function getClientById(id) {
  return db('clients')
    .where({ id })
    .first();
}

function addClient(client) {
  return db('clients')
    .insert(client, 'id')
    .then(ids => {
      const [id] = ids;
      return getClientById(id);
    });
}

function updateClient(id, changes) {
  return db('clients')
    .where('id', id)
    .update(changes)
    .then(count => {
      if (count > 0) {
        return getClientById(id);
      }
    });
}

function deleteClient(id) {
  let deletedClient = {};
  db('clients')
    .where({ id })
    .first()
    .then(client => {
      deletedClient = client;
    });
  return db('clients')
    .where('id', id)
    .del()
    .then(count => {
      if (count > 0) {
        return deletedClient;
      }
    });
}