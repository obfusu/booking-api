const ERRORS = {
  BAD_CREDS: 'bad_creds',
  NOT_ADMIN: 'not_admin',
  AUTH_TOKEN_MISSING: 'auth_token_missing'
}

function UnauthorizedError (message) {
  return {
    status: 401,
    message
  }
}

module.exports = {
  ERRORS,
  UnauthorizedError
}