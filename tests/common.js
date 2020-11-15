const initServer = require('../api')
const mongo = require('../db/mongo')

const ADMIN_CREDS = {
  email: 'admin@cmt.com',
  hash: ''
}

const NON_ADMIN_USER_CREDS = {
  email: 'user@cmt.com',
  hash: ''
}

const BAD_CREDS = {
  name: 'wrong',
  hash: 'wrong'
}

const JWT_ERRORS = {
  EMPTY: 'jwt must be provided',
  MALFORMED: 'jwt malformed',
  EXPIRED: 'jwt expired'
}

async function setup () {
  const appServer = await initServer()
  return appServer.callback()
}

async function teardown () {
  return mongo.closeDb()
}

module.exports = {
  ADMIN_CREDS,
  NON_ADMIN_USER_CREDS,
  BAD_CREDS,
  JWT_ERRORS,
  setup,
  teardown
}
