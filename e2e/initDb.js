const mongo = require('../db/mongo')
const { SEAT_STATUS, NODE_ENV } = require('../utils/constants')

// Password hash in SHA-512
// password is "password" without quotes for both admin and non admin
const ADMIN_USER = {
  _id: 'admin@createmytrip.com',
  hash: 'b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86',
  isAdmin: true
}

const NON_ADMIN_USER = {
  _id: 'user@createmytrip.com',
  hash: 'b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86'
}

function getSeatDocument (seatNo) {
  return {
    _id: seatNo,
    status: SEAT_STATUS.AVAILABLE
  }
}

async function setupDb () {
  if (NODE_ENV.startsWith('prod')) {
    throw new Error('test db setup wont run in prod')
  }

  await mongo.initDb()
  const db = mongo.db
  await db.collection('users').replaceOne({ _id: ADMIN_USER._id }, ADMIN_USER, { upsert: 1 })
  await db.collection('users').replaceOne({ _id: NON_ADMIN_USER._id }, NON_ADMIN_USER, { upsert: 1 })
  console.log('Creating seats collection (if already exists, all existing docs will be deleted)')
  await db.collection('seats').deleteMany()

  for (let i = 1; i <= 40; i++) {
    await db.collection('seats').insertOne(getSeatDocument(i))
  }
  console.log('seats collection successfully created')

  await mongo.closeDb()
}

setupDb()
