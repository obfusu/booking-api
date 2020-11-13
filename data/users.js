const { db } = require('../db/mongo')

async function getUser (email) {
  return db.collection('users').findOne({ _id: email })
}

module.exports = {
  getUser
}
