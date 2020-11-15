/**
 * This loads all dependencies required for our app server
 *
 * @module
 */
const mongo = require('../db/mongo')

async function loadDeps () {
  await mongo.initDb()
}

module.exports = loadDeps
