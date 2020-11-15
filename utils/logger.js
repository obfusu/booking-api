const bunyan = require('bunyan')
const { NODE_ENV } = require('./constants')

const consoleLogLevel = process.env.BUNYAN_LOG_LEVEL || 'debug'

const log = bunyan.createLogger({
  name: 'cmt-app',
  serializers: bunyan.stdSerializers,
  streams: [{
    level: consoleLogLevel,
    stream: process.stdout
  }]
})

/* istanbul ignore next */
if (NODE_ENV === 'test') {
  log.level(bunyan.FATAL + 1)
}

module.exports = log
