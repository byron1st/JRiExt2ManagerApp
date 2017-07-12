module.exports = (executionTraceDB, componentList) => {
  const checkComponent = (aetype, value, key) => {
    const _ = require('lodash')
    const elementList = _.find(componentList, {'AEType': aetype}).elementList

    return elementList.find(element => element[key] === value)
  }

  return new Promise((resolve, reject) => {
    executionTraceDB.find({ ETType: 'ett-socket-channel-write' }, (error, traceList) => {
      if (error) {
        reject(error)
      } else {
        let connectorList = []

        traceList.forEach(trace => {
          const connectedSocketId = trace['ett-channel-connected-socket']
          const currentThread = trace['ett-currentThread']

          if (checkComponent('Thread', currentThread, 'id') && checkComponent('RemoteClient', connectedSocketId, 'id')) {
            connectorList.push({
              from: currentThread,
              to: connectedSocketId
            })
          }
        })

        resolve({
          AEType: 'NetworkConnection',
          AEKind: 'connector',
          elementList: connectorList
        })
      }
    })
  })
}
