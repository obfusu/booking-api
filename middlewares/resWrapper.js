/**
 * @module
 */
const hostname = require('os').hostname()
const uuid = require('uuid')
const log = require('../utils/logger')
const debug = require('../utils/debug')

/**
 * Middleware to format response
 *
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
async function resWrapper (ctx, next) {
  const body = {
    success: null,
    message: null,
    result: null
  }
  const reqId = uuid.v4()
  body.meta = {
    reqId: reqId,
    timestamp: new Date(),
    hostname: hostname
  }

  try {
    await next()

    // If success
    body.success = true
    body.message = ctx.state.message || 'ok'
    body.result = ctx.state.result || null

    // send the response
    ctx.body = body
  } catch (err) {
    ctx.status = err.status || 500

    // If error, set error params
    body.success = false
    body.message = err.message || 'not_ok'
    body.result = ctx.state.result || null
    ctx.body = body

    log.error({ req: ctx.req, res: ctx.res, reqId: ctx.state.reqId, stack: err.stack, reqBody: ctx.request.body })
  }
  debug('%s %s, statuscode %s', ctx.method, ctx.url, ctx.res.statusCode)
}

module.exports = resWrapper
