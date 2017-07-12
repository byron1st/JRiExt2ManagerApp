module.exports = (executionTraceDB, componentList) => {
  return new Promise((resolve, reject) => {
    let connectorList = []
    componentList
      .filter(component => component.AEType === 'Thread' || component.AEType === 'Socket')
      .forEach(childrenComp => {
        childrenComp.elementList.forEach(child => {
          const from = child.processKey
          const to = child.id

          connectorList.push({ from, to })
        })
      })

    resolve({
      AEType: 'Composition',
      AEKind: 'composition',
      elementList: connectorList
    })
  })
}
