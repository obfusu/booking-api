const bookings = require('../../data/bookings')
const { ERRORS, UnauthorizedError } = require('../../utils/errors')

async function reserveSeat (ctx) {
  const params = ctx.request.body
  const { seatNumber, passenger } = params
  ctx.state.result = await bookings.reserveSeat(seatNumber, passenger)
}

async function resetAllSeats (ctx) {
  if (!ctx.state.user?.isAdmin) {
    throw UnauthorizedError(ERRORS.NOT_ADMIN)
  }
  ctx.state.result = await bookings.resetAllSeats()
}

module.exports = {
  reserveSeat,
  resetAllSeats
}
