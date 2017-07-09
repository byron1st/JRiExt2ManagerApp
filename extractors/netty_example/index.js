const parseProcessComp = (executionTraceDB) => {
  return new Promise((resolve, reject) => {
    executionTraceDB.find({ ETType: 'ett-thread' }, (error, traceList) => {
      if (error) {
        reject(error)
      } else {
        const id = traceList[0].processKey

        resolve({
          AEType: 'Process',
          AEKind: 'component',
          elementList: [{ id, name: id }]
        })
      }
    })
  })
}

const parseThreadComp = (executionTraceDB) => {
  return new Promise((resolve, reject) => {
    executionTraceDB.find({ ETType: 'ett-thread' }, (error, traceList) => {
      if (error) {
        reject(error)
      } else {
        let resultList = []

        traceList.forEach(trace => {
          const name = trace['ett-thread-name']
          const id = trace['Object Id']

          resultList.push(Object.assign({
            name: name,
            id: id
          }, trace))
        })

        resolve({
          AEType: 'Thread',
          AEKind: 'component',
          elementList: resultList
        })
      }
    })
  })
}

const parseRemoteClientComp = (executionTraceDB) => {
  return new Promise((resolve, reject) => {
    executionTraceDB.find({ ETType: 'ett-socket-remote' }, (error, traceList) => {
      if (error) {
        reject(error)
      } else {
        let resultList = []

        traceList.forEach(trace => {
          const address = trace['ett-socket-remote-address']
          const port = trace['ett-socket-remote-port']
          const name = address + ':' + port
          const id = trace['Object Id']

          resultList.push(Object.assign({
            name: name,
            id: id
          }, trace))
        })

        resolve({
          AEType: 'RemoteClient',
          AEKind: 'component',
          elementList: resultList
        })
      }
    })
  })
}

const parseComposition = (executionTraceDB, componentList) => {
  return new Promise((resolve, reject) => {
    let connectorList = []
    componentList
      .filter(component => component.AEType === 'Thread')
      .forEach(threadComp => {
        threadComp.elementList.forEach(thread => {
          const from = thread.processKey
          const to = thread.id

          connectorList.push({ from, to })
        })
      })

    resolve({
      AEType: 'ProcessThreadComposition',
      AEKind: 'composition',
      elementList: connectorList
    })
  })
}

const parseSocketConnection = (executionTraceDB, componentList) => {
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

module.exports = {
  component: [parseProcessComp, parseThreadComp, parseRemoteClientComp],
  connector: [parseSocketConnection, parseComposition]
}
