const config = require('config')
const Koa = require('koa')

const log = require('./utils/logger')
const app = new Koa()

async function startServer () {
  await require('./loaders/deps')()
  await require('./loaders/koa')(app)

  app.listen(config.appPort, () => {
    log.info({ component: 'server', message: 'started', port: config.appPort })
  })
}

startServer()
