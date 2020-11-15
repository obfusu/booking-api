const ADMIN_CREDS = {
  email: 'admin@cmt.com',
  hash: ''
}

const NON_ADMIN_USER_CREDS = {
  email: 'user@cmt.com',
  hash: ''
}

const BAD_CREDS = {
  name: 'wrong',
  hash: 'wrong'
}

const JWT_ERRORS = {
  EMPTY: 'jwt must be provided',
  MALFORMED: 'jwt malformed',
  EXPIRED: 'jwt expired'
}

const SAMPLE_PASSENGER = {
  name: 'Lorem Ipsum',
  age: 55,
  phone: '11111111111'
}

module.exports = {
  ADMIN_CREDS,
  NON_ADMIN_USER_CREDS,
  BAD_CREDS,
  JWT_ERRORS,
  SAMPLE_PASSENGER
}
