const db = require('../data/db-config');

module.exports = {
  getPrograms,
  getProgramById,
  addProgram,
  updateProgram,
  deleteProgram
};

function getPrograms(coach_id) {
  return db('programs')
    .where({ coach_id });
}

function getProgramById(id) {
  return db('programs') //Correct line of code - keep in final program version
  // return db('programsBAD') //Bad line of code for testing - comment out in final program version
    .where({ id })
    .first();
}

function addProgram(program) {
  return db('programs')
    .insert(program, 'id')
    .then(ids => {
      const [id] = ids;
      return getProgramById(id);
    });
}

function updateProgram(id, changes) {
  return db('programs')
    .where('id', id)
    .update(changes)
    .then(count => {
      if (count > 0) {
        return getProgramById(id);
      }
    });
}

function deleteProgram(id) {
  let deletedProgram = {};
  db('programs')
    .where({ id })
    .first()
    .then(program => {
      deletedProgram = program;
    });
  return db('programs')
    .where('id', id)
    .del()
    .then(count => {
      if (count > 0) {
        return deletedProgram;
      }
    });
}