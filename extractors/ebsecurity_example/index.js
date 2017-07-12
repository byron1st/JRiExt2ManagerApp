// component
const parseProcess = require('./process')
const parseThread = require('./thread')
const parseSocket = require('./socket')

// connector
const parseComposition = require('./composition')
const parseNetworkConnection = require('./network-connection')
const parseSocketIO = require('./socket-io')

module.exports = {
  component: [parseProcess, parseThread, parseSocket],
  connector: [parseComposition, parseNetworkConnection, parseSocketIO]
}
