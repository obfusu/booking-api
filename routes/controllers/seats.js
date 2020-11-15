const bookings = require('../../data/bookings')
const { ERRORS, UnauthorizedError, ConflictError } = require('../../utils/errors')

async function reserveSeat (ctx) {
  const params = ctx.request.body
  const { seatNumber, passenger } = params

  const bookingDetails = await bookings.reserveSeat(seatNumber, passenger)
  ctx.state.result = bookingDetails
  if (!bookingDetails.booked) {
    throw ConflictError()
  }
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
