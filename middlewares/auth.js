const jwt = require('jsonwebtoken')
const config = require('config')
const util = require('util')
const { ERRORS, UnauthorizedError } = require('../utils/errors')

const jwtSecret = config.jwtSecret
const jwtVerify = util.promisify(jwt.verify)

async function jwtAuth (ctx, next) {
  const authHeader = ctx.request.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1]
    try {
      const user = await jwtVerify(token, jwtSecret)
      ctx.state.user = user
      return next()
    } catch (err) {
      throw UnauthorizedError(err.message)
    }
  } else {
    throw UnauthorizedError(ERRORS.AUTH_TOKEN_MISSING)
  }
}

module.exports = jwtAuth
