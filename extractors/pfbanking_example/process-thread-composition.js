module.exports = (executionTraceDB, componentList) => {
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
