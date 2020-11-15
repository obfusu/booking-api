const config = require('config')
const Koa = require('koa')
const { NODE_ENV } = require('./utils/constants')

const log = require('./utils/logger')
const app = new Koa()

async function initServer () {
  await require('./loaders/deps')()
  await require('./loaders/koa')(app)

  return app
}

async function startServer () {
  if (NODE_ENV !== 'test') {
    const server = await initServer()
    server.listen(config.appPort, () => {
      log.info({ component: 'server', message: 'server started', port: config.appPort })
    })
  }
}
startServer()

module.exports = initServer
