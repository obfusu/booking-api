const { db } = require('../db/mongo')
const { COLLECTIONS, SEAT_STATUS } = require('../utils/constants')

const MESSAGES = {
  BOOKING_SUCCESS: 'successfully reserved',
  BOOKING_FAILED: 'booking failed, please check if seat number is valid and free and try again',
  RESET_SUCCESS: 'all seats successfully reset'
}

/**
 * Reserve a seat
 *
 * @param {Number} seatNumber
 * @param {Object} passenger
 */
async function reserveSeat (seatNumber, passenger) {
  const data = await db.collection(COLLECTIONS.SEATS)
    .updateOne({ _id: seatNumber, status: SEAT_STATUS.AVAILABLE },
      { $set: { status: SEAT_STATUS.BOOKED, passenger: passenger } })

  const bookingDetails = {
    booked: false,
    seatNumber,
    passenger,
    message: null
  }

  if (data && data.result.nModified) {
    bookingDetails.booked = true
    bookingDetails.message = MESSAGES.BOOKING_SUCCESS
  } else {
    bookingDetails.booked = false
    bookingDetails.message = MESSAGES.BOOKING_FAILED
  }

  // Booking history can be logged here
  return bookingDetails
}

/**
 * Reset booking states of all seats
 */
async function resetAllSeats () {
  await db.collection(COLLECTIONS.SEATS).updateMany({},
    { $set: { status: SEAT_STATUS.AVAILABLE }, $unset: { passenger: 1 } })
  return MESSAGES.RESET_SUCCESS
}

module.exports = {
  reserveSeat,
  resetAllSeats
}
