const Router = require('koa-router')
const router = new Router()

const config = require('config')
const jwt = require('jsonwebtoken')
const jwtSecret = config.jwtSecret
const users = require('../data/users')
const bookings = require('../data/bookings')
const jwtAuth = require('../middlewares/auth')
const { ERRORS, UnauthorizedError } = require('../utils/errors')

router.post('/login', async ctx => {
  const params = ctx.request.body
  const data = await users.getUser(params.email)

  // TODO: use constant time string comparision to prevent timing attacks
  if (data && data.hash === params.hash) {
    const token = jwt.sign({ email: data._id, isAdmin: data.isAdmin, expiresIn: '15m' }, jwtSecret)
    ctx.state.result = { token }
    return
  }

  // Implicit else on miss
  throw UnauthorizedError(ERRORS.BAD_CREDS)
})

router.post('/seats/reserve', jwtAuth, async ctx => {
  const params = ctx.request.body
  const { seatNumber, passenger } = params
  ctx.state.result = await bookings.reserveSeat(seatNumber, passenger)
})

router.post('/seats/reset', jwtAuth, async ctx => {
  if (!ctx.state.user?.isAdmin) {
    throw UnauthorizedError(ERRORS.NOT_ADMIN)
  }
  ctx.state.result = await bookings.resetAllSeats()
})

module.exports = router
