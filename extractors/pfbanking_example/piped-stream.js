module.exports = (executionTraceDB, componentList) => {
  return new Promise((resolve, reject) => {
    executionTraceDB.find({ ETType: 'ett-write' }, (error, traceList) => {
      if (error) {
        reject(error)
      } else {
        let count = 0

        let connectorList = []
        traceList.forEach(trace => {
          const currentThread = trace['ett-write-currentThread']
          const sinkId = trace['ett-write-sink-objectId']

          executionTraceDB.find({ ETType: 'ett-read', 'Object Id': sinkId }).limit(1).exec((error, readTraceList) => {
            if (error) {
              reject(error)
            } else {
              let sinkThread = ''
              if (readTraceList) {
                sinkThread = readTraceList[0]['ett-read-currentThread']
              }

              connectorList.push({
                from: currentThread,
                to: sinkThread
              })

              if ((++count) === traceList.length) {
                console.log(connectorList)
                resolve({
                  AEType: 'PipedStream',
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
