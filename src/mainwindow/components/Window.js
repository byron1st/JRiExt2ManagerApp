'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ipcRenderer } from 'electron'

import {
  instrument,
  quit,
  execute
} from '../command'

class Window extends Component {
  render () {
    return (
      <div style={styles.container}>
        <div style={styles.buttonContainer}>
          <button>Get a config</button>
          <button>Get a ETTypes</button>
          <button>Instrumentation</button>
        </div>
        <div style={styles.classpathContainer}>
          <h4>class path</h4>
          <button>Open</button>
        </div>
        <div style={styles.mainListContainer}>
          <div style={styles.mainContainer}>
            <h4>main 1</h4>
            <button>Run</button>
          </div>
          <div style={styles.mainContainer}>
            <h4>main 1</h4>
            <button>Run</button>
          </div>
          <div style={styles.mainContainer}>
            <h4>main 1</h4>
            <button>Run</button>
          </div>
        </div>
        <div style={styles.messageContainer}>
          <h4>message</h4>
          <h4>message</h4>
          <h4>message</h4>
          <h4>message</h4>
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  classpathContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  mainListContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  messageContainer: {
    display: 'flex',
    flexDirection: 'column'
  }
}

export default Window

// export default class Window extends Component {
//   requestInst () {
//     const targetClassPath = '/Users/byron1st/Developer/Workspace/IntelliJ/jriext2/src/test/resources/bin'
//     const ettypeDefFilePath = '/Users/byron1st/Developer/Workspace/IntelliJ/jriext2/src/test/resources/monitoringUnits_banking.json'

//     const command = instrument(targetClassPath, ettypeDefFilePath)
//     ipcRenderer.send('send-command', command)
//   }

//   requestExecute () {
//     const mainClassName = 'framework/PFSystemMain'

//     const command = execute(mainClassName)
//     ipcRenderer.send('send-command', command)
//   }

//   requestQuit () {
//     ipcRenderer.send('send-command', quit())
//   }

//   render () {
//     return (
//       <div>
//         <h1> Hello, World!!!! </h1>
//         <button onClick={() => this.requestInst()}>inst</button>
//         <button onClick={() => this.requestExecute()}>execute</button>
//         <button onClick={() => this.requestStop()}>stop</button>
//         <button onClick={() => this.requestQuit()}>quit</button>
//       </div>
//     )
//   }
// }
// Window.propTypes = {
//   store: PropTypes.object.isRequired
// }
