const { db } = require('../db/mongo')
const { COLLECTIONS } = require('../utils/constants')

/**
 * Fetch user information from db
 *
 * @param {String} email
 * @param {Object} user
 */
async function getUser (email) {
  return db.collection(COLLECTIONS.USERS).findOne({ _id: email })
}

module.exports = {
  getUser
}
