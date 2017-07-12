// component
const parseProcess = require('./java-common/process')
const parseThread = require('./java-common/thread')
const parseSocket = require('./socket')

// connector
const parseProcessThreadComposition = require('./java-common/process-thread-composition')
const parseNetworkConnection = require('./network-connection')
const parseSocketIO = require('./socket-io')

module.exports = {
  component: [parseProcess, parseThread, parseSocket],
  connector: [parseProcessThreadComposition, parseNetworkConnection, parseSocketIO]
}
