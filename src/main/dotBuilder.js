const getRandomColor = () => {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export default (elementSet) => {
  let dotString = 'strict digraph {'

  elementSet.componentList.forEach(component => {
    const color = getRandomColor()
    component.elementList.forEach(element => {
      const { id, name } = element
      dotString += id + ' [style=filled fillcolor="' + color + '" label="' + name + '"]\n'
    })
  })

  elementSet.connectorList.forEach(connector => {
    connector.elementList.forEach(element => {
      const { from, to } = element
      dotString += from + ' -> ' + to

      if (connector.AEKind === 'composition') {
        dotString += ' [arrowtail=diamond dir="back"]'
      }

      dotString += '\n'
    })
  })

  dotString += '}'

  return dotString
}
