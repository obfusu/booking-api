const ADMIN_CREDS = {
  email: 'admin@createmytrip.com',
  hash: 'b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86'
}

const NON_ADMIN_USER_CREDS = {
  email: 'user@createmytrip.com',
  hash: 'b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86'
}

const BAD_CREDS = {
  email: 'wrong',
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
