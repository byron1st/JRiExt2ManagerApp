module.exports = (executionTraceDB) => {
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
