const { db } = require('../db/mongo')

async function reserveSeat (seatNumber, passenger) {
  const data = await db.collection('seats')
    .updateOne({ _id: seatNumber, status: 'available' }, { $set: { status: 'booked', passenger: passenger } })

  if (data && data.result.nModified) {
    return true
  } else {
    return false
  }
}

async function resetAllSeats () {
  return db.collection('seats').updateMany({}, { $set: { status: 'available' }, $unset: { passenger: 1 } })
}

module.exports = {
  reserveSeat,
  resetAllSeats
}
