const bunyan = require('bunyan')

const consoleLogLevel = process.env.BUNYAN_LOG_LEVEL || 'debug'

const log = bunyan.createLogger({
  name: 'cmt-app',
  serializers: bunyan.stdSerializers,
  streams: [{
    level: consoleLogLevel,
    stream: process.stdout
  }]
})

module.exports = log
