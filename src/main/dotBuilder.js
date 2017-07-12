export default (elementSet) => {
  let dotString = 'strict digraph {'

  elementSet.componentList.forEach(component => {
    const AEType = component.AEType
    component.elementList.forEach(element => {
      const { id, name } = element
      const label = '«' + AEType + '»\n' + name
      dotString += id + ' [shape=box label="' + label + '"]\n'
    })
  })

  elementSet.connectorList.forEach(connector => {
    const AEType = connector.AEType
    connector.elementList.forEach(element => {
      const { from, to } = element
      dotString += from + ' -> ' + to

      if (connector.AEKind === 'composition') {
        dotString += ' [arrowtail=diamond dir="back"]'
      } else {
        const label = '«' + AEType + '»'
        dotString += ' [label="' + label + '"]'
      }

      dotString += '\n'
    })
  })

  dotString += '}'

  return dotString
}
