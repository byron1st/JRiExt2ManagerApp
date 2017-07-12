module.exports = (executionTraceDB) => {
  return new Promise((resolve, reject) => {
    executionTraceDB.find({ ETType: 'ett-socket-input' }, (error, traceList) => {
      if (error) {
        reject(error)
      } else {
        let resultList = []

        traceList.forEach(trace => {
          const name = trace['Object Id'] + '\n' + trace['socket-host-address1'] + ':' + trace['socket-local-port1']
          const id = trace['Object Id']

          resultList.push(Object.assign({
            name: name,
            id: id
          }, trace))
        })

        resolve({
          AEType: 'Socket',
          AEKind: 'component',
          elementList: resultList
        })
      }
    })
  })
}
