const mongo = require('../db/mongo')

async function loadDeps () {
  await mongo.initDb()
}

module.exports = loadDeps
