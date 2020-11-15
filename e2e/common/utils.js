const request = require('supertest')
const initServer = require('../../api')
const mongo = require('../../db/mongo')

const { ADMIN_CREDS, NON_ADMIN_USER_CREDS } = require('./constants')
const { NODE_ENV } = require('../../utils/constants')

if (NODE_ENV.startsWith('prod')) {
  console.error('Its dangerous to run in prod, aborting...')
  process.exit(1)
}

async function setup () {
  const appServer = await initServer()
  return appServer.callback()
}

async function teardown () {
  return mongo.closeDb()
}

function getAuthHeader (token) {
  return {
    Authorization: `Bearer ${token}`
  }
}

async function getToken (app, creds) {
  const res = await request(app)
    .post('/login')
    .send(creds)

  return res.body.result.token
}

async function getAdminToken (app) {
  return getToken(app, ADMIN_CREDS)
}

async function getNonAdminToken (app) {
  return getToken(app, NON_ADMIN_USER_CREDS)
}

module.exports = {

  getAuthHeader,
  getAdminToken,
  getNonAdminToken,
  setup,
  teardown
}
