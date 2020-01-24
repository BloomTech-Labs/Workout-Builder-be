const db = require('../data/db-config');

module.exports = {
    addCoach,
    findCoachBy,
    getCoachById
}


function addCoach(coach) {
    return db('coaches')
        .insert(coach, 'id')
        .then(ids => {
            const [id] = ids;
            return db('coaches')
                .where({ id })
                .first();
        })
}

function findCoachBy(username) {
    return db('coaches')
        .where(username)
        .first();
}

function getCoachById(id) {
    return db('coaches')
        .where({ id })
        .first();
}

