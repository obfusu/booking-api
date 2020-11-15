const request = require('supertest')
const {
  setup,
  teardown,
  getAuthHeader,
  getAdminToken,
  getNonAdminToken
} = require('./common/utils')
const { SAMPLE_PASSENGER } = require('./common/constants')

let app, adminToken, nonAdminToken

beforeAll(async () => {
  app = await setup()
  adminToken = await getAdminToken(app)
  nonAdminToken = await getNonAdminToken(app)
})

afterAll(async () => {
  await teardown()
})

describe('seats api', () => {
  it('admin should successfully reset all seats', async () => {
    const res = await request(app)
      .post('/seats/reset')
      .set(getAuthHeader(adminToken))

    expect(res.statusCode).toEqual(200)
  })

  it('non admin user should successfully book seat #1', async () => {
    const payload = {
      seatNumber: 1,
      passenger: SAMPLE_PASSENGER
    }

    const res = await request(app)
      .post('/seats/reserve')
      .set(getAuthHeader(nonAdminToken))
      .send(payload)

    expect(res.statusCode).toEqual(200)
    expect(res.body.result.booked).toEqual(true)
    expect(res.body.result.passenger).toEqual(SAMPLE_PASSENGER)
  })

  it('already booked seat should give 409', async () => {
    const payload = {
      seatNumber: 1,
      passenger: SAMPLE_PASSENGER
    }

    const res = await request(app)
      .post('/seats/reserve')
      .set(getAuthHeader(nonAdminToken))
      .send(payload)

    expect(res.statusCode).toEqual(409)
    expect(res.body.result.booked).toEqual(false)
    expect(res.body.result.passenger).toEqual(SAMPLE_PASSENGER)
  })
})
