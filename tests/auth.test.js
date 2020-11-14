const request = require('supertest')
const { VALID_CREDS, BAD_CREDS, setup, teardown } = require('./common')

let app

beforeAll(async () => {
  app = await setup()
})

afterAll(async () => {
  await teardown()
})

describe('Login api', () => {
  it('should return 200 and token for correct creds', async () => {
    const res = await request(app)
      .post('/login')
      .send(VALID_CREDS)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('result.token')
  })

  it('should return 401 on bad creds', async () => {
    const res = await request(app)
      .post('/login')
      .send(BAD_CREDS)

    expect(res.statusCode).toEqual(401)
    expect(res.body).not.toHaveProperty('result.token')
  })
})
