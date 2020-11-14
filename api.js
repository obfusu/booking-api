const config = require('config')
const Koa = require('koa')
const { NODE_ENV } = require('./utils/constants')

const log = require('./utils/logger')
const app = new Koa()

async function startServer () {
  await require('./loaders/deps')()
  await require('./loaders/koa')(app)

  if (NODE_ENV !== 'test') {
    app.listen(config.appPort, () => {
      log.info({ component: 'server', message: 'started', port: config.appPort })
    })
  }
  return app
}

module.exports = startServer
