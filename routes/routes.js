/**
 * This is responsible for exporting controllers in a
 * router agnostic format
 *
 * @module
 */
const seatsController = require('./controllers/seats')
const authController = require('./controllers/auth')
const { API_VERSIONS } = require('../utils/constants')
const jwtAuth = require('../middlewares/auth')

module.exports = [
  {
    method: 'post',
    path: '/login',
    apiVersion: API_VERSIONS.V1,
    controller: authController.login
  },
  {
    method: 'post',
    path: '/seats/reserve',
    apiVersion: API_VERSIONS.V1,
    controller: seatsController.reserveSeat,
    middlewares: [jwtAuth]
  },
  {
    method: 'post',
    path: '/seats/reset',
    apiVersion: API_VERSIONS.V1,
    controller: seatsController.resetAllSeats,
    middlewares: [jwtAuth]
  }
]
