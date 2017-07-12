// component
const parseProcess = require('./java-common/process')
const parseThread = require('./java-common/thread')
const parseRemoteClient = require('./remote-client')

// connector
const parseProcessThreadComposition = require('./java-common/process-thread-composition')
const parseNetworkConnection = require('./network-connection')

module.exports = {
  component: [parseProcess, parseThread, parseRemoteClient],
  connector: [parseProcessThreadComposition, parseNetworkConnection]
}
