export default (extractor, executionTraceDb) => {
  return new Promise((resolve, reject) => {
    if (!extractor) {
      reject(new Error('Parser is null'))
    }

    let componentList = []
    let connectorList = []
    let compindex = 0
    let connindex = 0

    extractor.component.forEach(parsingFunction => {
      parsingFunction(executionTraceDb).then(result => {
        componentList.push(result)
        if ((++compindex) === extractor.component.length) {
          extractor.connector.forEach(parsingFunction => {
            parsingFunction(executionTraceDb, componentList).then(result => {
              connectorList.push(result)

              if ((++connindex) === extractor.connector.length) {
                resolve({ componentList, connectorList })
              }
            })
          })
        }
      })
    })
  })
}
