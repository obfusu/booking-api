const request = require('supertest')
const config = require('config')
const jwt = require('jsonwebtoken')
const { ERRORS } = require('../utils/errors')
const { setup, teardown } = require('./common/utils')

const {
  NON_ADMIN_USER_CREDS,
  ADMIN_CREDS,
  BAD_CREDS,
  JWT_ERRORS
} = require('./common/constants')

let app
let adminToken
let nonAdminUserToken

beforeAll(async () => {
  app = await setup()
})

afterAll(async () => {
  await teardown()
})

function getAuthHeader (token) {
  return {
    Authorization: `Bearer ${token}`
  }
}

describe('login api', () => {
  it('should return 200 and token for correct creds', async () => {
    const res = await request(app)
      .post('/login')
      .send(NON_ADMIN_USER_CREDS)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('result.token')
    nonAdminUserToken = res.body.result?.token
  })

  it('should return 401 on bad creds', async () => {
    const res = await request(app)
      .post('/login')
      .send(BAD_CREDS)

    expect(res.statusCode).toEqual(401)
    expect(res.body).not.toHaveProperty('result.token')
    expect(res.body.message).toEqual(ERRORS.BAD_CREDS)
  })

  it('should fetch admin token', async () => {
    const res = await request(app)
      .post('/login')
      .send(ADMIN_CREDS)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('result.token')
    adminToken = res.body.result?.token
  })
})

describe('authenticated routes', () => {
  it('admin token should work for /seats/reset', async () => {
    const res = await request(app)
      .post('/seats/reset')
      .set(getAuthHeader(adminToken))

    expect(res.statusCode).toEqual(200)
  })

  it('non admin token should give 401 for /seats/reset', async () => {
    const res = await request(app)
      .post('/seats/reset')
      .set(getAuthHeader(nonAdminUserToken))

    expect(res.statusCode).toEqual(401)
    expect(res.body.message).toEqual(ERRORS.NOT_ADMIN)
  })

  it('missing auth header should not work', async () => {
    const res = await request(app)
      .post('/seats/reserve')

    expect(res.statusCode).toEqual(401)
    expect(res.body.message).toEqual(ERRORS.AUTH_TOKEN_MISSING)
  })

  it('empty token should give error', async () => {
    const res = await request(app)
      .post('/seats/reserve')
      .set(getAuthHeader(''))

    expect(res.statusCode).toEqual(401)
    expect(res.body.message).toEqual(JWT_ERRORS.EMPTY)
  })

  it('wrong token should give jwt malformed', async () => {
    const res = await request(app)
      .post('/seats/reserve')
      .set(getAuthHeader('xyz'))

    expect(res.statusCode).toEqual(401)
    expect(res.body.message).toEqual(JWT_ERRORS.MALFORMED)
  })

  it('expired token should not work', async () => {
    // get 1 hour backdated timestamp
    const backdatedTimestamp = Math.floor(Date.now() / 1000 - 3600)
    const jwtPayload = jwt.sign({
      email: NON_ADMIN_USER_CREDS.email,
      iat: backdatedTimestamp,
      exp: 30
    }, config.jwtSecret)

    const res = await request(app)
      .post('/seats/reserve')
      .set(getAuthHeader(jwtPayload))

    expect(res.statusCode).toEqual(401)
    expect(res.body.message).toEqual(JWT_ERRORS.EXPIRED)
  })
})
