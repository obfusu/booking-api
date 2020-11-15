const config = require('config')
const Koa = require('koa')
const { NODE_ENV } = require('./utils/constants')

const log = require('./utils/logger')
const app = new Koa()
const appPort = process.env.PORT || config.appPort

async function initServer () {
  await require('./loaders/deps')()
  await require('./loaders/koa')(app)

  return app
}

async function startServer () {
  /* istanbul ignore next */
  if (NODE_ENV !== 'test') {
    const server = await initServer()
    server.listen(appPort, () => {
      log.info({ component: 'server', message: 'server started', port: appPort })
    })
  }
}
startServer()

module.exports = initServer
