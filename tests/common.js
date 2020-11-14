const initServer = require('../api')
const mongo = require('../db/mongo')

const VALID_CREDS = {
  email: 'admin@cmt.com',
  hash: ''
}

const BAD_CREDS = {
  name: 'wrong',
  hash: 'wrong'
}

async function setup () {
  const appServer = await initServer()
  return appServer.callback()
}

async function teardown () {
  return mongo.closeDb()
}

module.exports = {
  VALID_CREDS,
  BAD_CREDS,
  setup,
  teardown
}
