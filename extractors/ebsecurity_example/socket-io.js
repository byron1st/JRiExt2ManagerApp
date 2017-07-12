module.exports = (executionTraceDB, componentList) => {
  return new Promise((resolve, reject) => {
    executionTraceDB.find({ ETType: 'ett-socket-input' }, (error, traceList) => {
      if (error) {
        reject(error)
      } else {
        let connectorList = []

        traceList.forEach(trace => {
          const socketId = trace['Object Id']
          const currentThread = trace['ett-currentThread4']

          connectorList.push({
            from: currentThread,
            to: socketId
          })
        })

        resolve({
          AEType: 'SocketI/O',
          AEKind: 'connector',
          elementList: connectorList
        })
      }
    })
  })
}
