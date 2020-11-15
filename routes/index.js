/**
 * @module
 */
const Router = require('koa-router')
const api = require('koa-router-version')
const router = new Router()

const routesArray = require('./routes')

for (let i = 0; i < routesArray.length; i++) {
  const currentRoute = routesArray[i]

  const method = currentRoute.method
  const controller = currentRoute.controller
  const path = currentRoute.path
  const middlewares = currentRoute.middlewares || []
  const version = currentRoute.apiVersion

  const apiVersions = {}
  apiVersions[version] = controller

  switch (method) {
    case 'post':
      router.post(path, ...middlewares, api.version(apiVersions))
      break

    // we dont have any non post methods in this project
    /* istanbul ignore next */
    default:
      throw Error('unknown route method encountered')
  }
}

module.exports = router
