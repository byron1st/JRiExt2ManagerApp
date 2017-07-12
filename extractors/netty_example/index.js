// component
const parseProcess = require('./process')
const parseThread = require('./thread')
const parseRemoteClient = require('./remote-client')

// connector
const parseProcessThreadComposition = require('./process-thread-composition')
const parseNetworkConnection = require('./network-connection')

module.exports = {
  component: [parseProcess, parseThread, parseRemoteClient],
  connector: [parseProcessThreadComposition, parseNetworkConnection]
}
