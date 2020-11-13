const bodyParser = require('koa-bodyparser')

const router = require('../routes')
const resWrapper = require('../middlewares/resWrapper')
const log = require('../utils/logger')

async function koaLoader (app) {
  app.use(resWrapper)
  app.use(bodyParser({
    onerror: (err, ctx) => {
      log.error({ message: 'body parse error', err: err })
      ctx.throw(400, 'body parse error')
    }
  }))

  // app routes
  app.use(router.routes())
  app.use(router.allowedMethods({
    throw: true
  }))

  // unknown routes handler
  app.use(ctx => ctx.throw(404, 'not_found'))

  return app
}

module.exports = koaLoader
