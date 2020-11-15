const config = require('config')
const jwt = require('jsonwebtoken')
const jwtSecret = config.jwtSecret
const users = require('../../data/users')
const { ERRORS, UnauthorizedError } = require('../../utils/errors')

async function login (ctx) {
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
}

module.exports = {
  login
}
