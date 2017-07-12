// component
const parseProcess = require('./process')
const parseThread = require('./thread')

// connector
const parseProcessThreadComposition = require('./process-thread-composition')
const parsePipedStreamConnection = require('./piped-stream')

module.exports = {
  component: [parseProcess, parseThread],
  connector: [parseProcessThreadComposition, parsePipedStreamConnection]
}
