/**
 * @module
 */
const config = require('config')
const MongoClient = require('mongodb').MongoClient
const log = require('../utils/logger')

const mongoUrl = config.mongoUrl
const mongoOptions = config.mongoOptions

let client, db

/**
 * @instance
 * @returns {Object} the db object
 */
async function initDb () {
  if (db) return db

  client = await MongoClient.connect(mongoUrl, mongoOptions)
  db = client.db()
  log.info({ component: 'mongo', status: 'connected', mongoUrl: mongoUrl, mongoOptions: mongoOptions })
  return db
}

/**
 * This function closes the db connection
 * @instance
 */
async function closeDb () {
  return client.close()
}

module.exports = {
  initDb,
  /**
     * Getter that returns db object from mongodb driver <br>
     * **Throws** when db is not initialized
     * @todo does jsdoc support getter?
     *
     * @returns {Object} the db object
     *
     */
  get db () {
    if (!db) {
      throw new Error('db called before db init')
    }
    return db
  },
  closeDb
}
