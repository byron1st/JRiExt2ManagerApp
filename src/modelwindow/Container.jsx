/* global document */

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { remote } from 'electron'
import { DataSet, Network } from 'vis'

const getRandomColor = () => {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

class Container extends Component {
  buildDataSet (elementSet) {
    let nodeDefList = []
    elementSet.componentList.forEach(component => {
      const color = getRandomColor()
      component.elementList.forEach(element => {
        const { id, name } = element
        nodeDefList.push({ id, label: name, color: { border: color } })
      })
    })

    let edgeDefList = []
    elementSet.connectorList.forEach(connector => {
      connector.elementList.forEach(element => {
        const { from, to } = element
        edgeDefList.push({ from, to, arrows: { to: true } })
      })
    })

    let nodes = new DataSet(nodeDefList)
    let edges = new DataSet(edgeDefList)
    return { nodes, edges }
  }

  renderGraph (elementSet) {
    let container = document.getElementById('graph-container')
    let data = this.buildDataSet(elementSet)
    let options = {
    }

    let graph = new Network(container, data, options)
  }

  componentDidMount () {
    const elementSet = remote.getCurrentWindow().elementSet
    console.log(elementSet)
    this.renderGraph(elementSet)
  }

  render () {
    return (
      <div id='graph-container' style={style.graphContainer} />
    )
  }
}

const style = {
  graphContainer: {
    height: 800,
    width: 800
  }
}

ReactDOM.render(<Container />, document.getElementById('react-container'))
