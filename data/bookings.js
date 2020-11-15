const { db } = require('../db/mongo')
const { COLLECTIONS, SEAT_STATUS } = require('../utils/constants')

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

  if (data && data.result.nModified) {
    return true
  } else {
    return false
  }
}

/**
 * Reset booking states of all seats
 */
async function resetAllSeats () {
  return db.collection(COLLECTIONS.SEATS).updateMany({},
    { $set: { status: SEAT_STATUS.AVAILABLE }, $unset: { passenger: 1 } })
}

module.exports = {
  reserveSeat,
  resetAllSeats
}
