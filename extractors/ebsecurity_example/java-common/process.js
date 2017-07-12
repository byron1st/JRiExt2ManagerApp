module.exports = (executionTraceDB) => {
  return new Promise((resolve, reject) => {
    executionTraceDB.find({ ETType: 'ett-thread' }, (error, traceList) => {
      if (error) {
        reject(error)
      } else {
        const processSet = new Set(traceList.map(trace => trace.processKey))

        let elementList = []
        processSet.forEach(processKey => elementList.push({ id: processKey, name: processKey }))

        resolve({
          AEType: 'Process',
          AEKind: 'component',
          elementList: elementList
        })
      }
    })
  })
}
