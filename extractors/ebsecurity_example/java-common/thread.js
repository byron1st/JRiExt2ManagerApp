module.exports = (executionTraceDB) => {
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
