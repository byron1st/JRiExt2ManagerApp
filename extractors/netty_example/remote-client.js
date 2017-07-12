module.exports = (executionTraceDB) => {
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
