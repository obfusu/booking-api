const request = require('supertest')
const { setup, teardown } = require('./common/utils')

let app

beforeAll(async () => {
  app = await setup()
})

afterAll(async () => {
  await teardown()
})

describe('misc tests', () => {
  it('should give 404 for unknown routes', async () => {
    const res = await request(app)
      .post('/unknown')

    expect(res.statusCode).toEqual(404)
    expect(res.body.message).toEqual('not_found')
  })

  it('should give 400 for body parse errors', async () => {
    const res = await request(app)
      .post('/login')
      .set({ 'Content-Type': 'application/json' })
      .send('bad json data')

    expect(res.statusCode).toEqual(400)
    expect(res.body.message).toEqual('body parse error')
  })
})
