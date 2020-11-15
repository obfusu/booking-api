const SEAT_STATUS = {
  AVAILABLE: 'available',
  BOOKED: 'booked'
}

const COLLECTIONS = {
  SEATS: 'seats',
  USERS: 'users'
}

const NODE_ENV = process.env.NODE_ENV || /* istanbul ignore next */ ''

module.exports = {
  SEAT_STATUS,
  NODE_ENV,
  COLLECTIONS
}
