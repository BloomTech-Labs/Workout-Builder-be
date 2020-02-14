const db = require('../data/db-config');

module.exports = {
  getClients,
  getClientById,
  addClient,
  updateClient,
  deleteClient,
  getClientsInProgram,
  addClientsToProgram,
  deleteProgramForClient,
  addProgramToClient,
  getDashboardInfo
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

//JSON body should be an array; each element in the array is { client_id, program_id }
function getClientsInProgram(clientProgram) {
  const clientIds = clientProgram.map(el => el.client_id);
  const programIds = clientProgram.map(el => el.program_id);
  return db('clients_programs')
    .whereIn('client_id', clientIds)
    .whereIn('program_id', programIds);
}

//JSON body should be an array; each element in the array is { client_id, program_id, start_date, current_day }
function addClientsToProgram(clientProgram) {
  return db('clients_programs')
    .insert(clientProgram)
    .then(() => {
      return getClientsInProgram(clientProgram);
    });
}

//JSON body should be an array; each element in the array is { client_id, program_id }
function deleteProgramForClient(clientProgram) {
  const clientIds = clientProgram.map(el => el.client_id);
  const programIds = clientProgram.map(el => el.program_id);
  return db('clients_programs')
    .whereIn('client_id', clientIds)
    .whereIn('program_id', programIds)
    .del()
    .then(count => {
      return count;
    });
}

//JSON body should be an object with keys: id, program_id; (i.e. { id: 1, program_id: 2 })
function addProgramToClient(clientProgram) {
  let clientId = [];
  clientId.push(clientProgram.client_id);
  let programId = [];
  programId.push(clientProgram.program_id);
  return db('clients_programs')
    .insert(clientProgram)
    .then(() => {
      return db('clients_programs')
        .whereIn('client_id', clientId)
        .whereIn('program_id', programId)
        .first();
    });
}

function getDashboardInfo(coach_id) {
  return db('clients_programs as cp')
    .select('c.id as client_id', 'c.first_name', 'c.last_name', 'cp.start_date', 'p.id as program_id', 'p.name', 'p.length', 'p.phase')
    .join('clients as c', 'cp.client_id', '=', 'c.id')
    .join('programs as p', 'cp.program_id', '=', 'p.id')
    .where('c.coach_id', coach_id)
    .orderBy('cp.client_id');
}