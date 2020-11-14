const mongo = require('../db/mongo')
const { SEAT_STATUS, NODE_ENV } = require('../utils/constants')

const ADMIN_USER = {
  _id: 'admin@cmt.com',
  hash: ''
}

function getSeatDocument (seatNo) {
  return {
    _id: seatNo,
    status: SEAT_STATUS.AVAILABLE
  }
}

async function setup () {
  if (NODE_ENV.startsWith('prod')) {
    throw new Error('test db setup wont run in prod')
  }

  await mongo.initDb()
  const db = mongo.db
  await db.collection('users').replaceOne({ _id: ADMIN_USER._id }, ADMIN_USER, { upsert: 1 })
  console.log('Creating seats collection (if already exists, all existing docs will be deleted)')
  await db.collection('seats').deleteMany()

  for (let i = 1; i <= 40; i++) {
    await db.collection('seats').insertOne(getSeatDocument(i))
  }
  console.log('seats collection successfully created')

  await mongo.closeDb()
}

setup()
