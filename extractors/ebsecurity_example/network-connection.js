module.exports = (executionTraceDB, componentList) => {
  return new Promise((resolve, reject) => {
    executionTraceDB.find({ ETType: 'ett-socket-input' }, (error, traceList) => {
      let connectorList = []
      if (error) {
        reject(error)
      } else {
        let count = 0
        traceList.forEach(trace => {
          const remoteAddress = trace['socket-remote-address1']
          const remotePort = trace['socket-remote-port1']
          const from = trace['Object Id']

          executionTraceDB.find({ 'socket-host-address1': remoteAddress, 'socket-local-port1': remotePort }, (error, targetList) => {
            if (error) {
              reject(error)
            } else {
              targetList.forEach(target => {
                const to = target['Object Id']
                connectorList.push({ from, to })
              })

              if ((++count) === traceList.length) {
                resolve({
                  AEType: 'NetworkConnection',
                  AEKind: 'connector',
                  elementList: connectorList
                })
              }
            }
          })
        })
      }
    })
  })
}
