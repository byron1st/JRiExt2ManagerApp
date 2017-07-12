// component
const parseProcess = require('./java-common/process')
const parseThread = require('./java-common/thread')

// connector
const parseProcessThreadComposition = require('./java-common/process-thread-composition')
const parsePipedStreamConnection = require('./piped-stream')

module.exports = {
  component: [parseProcess, parseThread],
  connector: [parseProcessThreadComposition, parsePipedStreamConnection]
}
