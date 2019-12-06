const db = require('../database/dbConfig')

module.exports = {
    add,
    getAll,
    findById,
    findBy,
}

async function add(user) {
    const [id] = await db('users').insert(user)

    return findById(id)
}

function findBy(filter) {
    return db('users').where(filter)
}

function getAll() {
    return db('users').select('id', 'username')
}

function findById(id) {
    return db('users')
        .where({id})
        .first()
}