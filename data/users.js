/**
 * Data access layer for fetching users from db
 * @module
 */
const { db } = require('../db/mongo')
const { COLLECTIONS } = require('../utils/constants')

/**
 *
 * @typedef {Object} UserDetails
 * @property {String} email
 * @property {String} hash
 * @property {Boolean} isAdmin
 */
/**
 * Fetch user information from db
 *
 * @param {String} email
 * @returns {UserDetails} user
 */
async function getUser (email) {
  const user = await db.collection(COLLECTIONS.USERS).findOne({ _id: email })
  if (user) {
    user.email = user._id
    delete user._id
  }
  return user
}

module.exports = {
  getUser
}
