const jwt = require('jsonwebtoken')
const config = require('config')
const util = require('util')

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
      return ctx.throw(401, err)
    }
  } else {
    ctx.throw(401, 'authorzation_token_missing')
  }
}

module.exports = jwtAuth
