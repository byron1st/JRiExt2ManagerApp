'use strict'

import React, { Component } from 'react'

import AppStatusSection from './AppStatusSection'
import CoreButtonsSection from './CoreButtonsSection'
import ClasspathSection from './ClasspathSection'
import MainListSection from './MainListSection'
import MessageSection from './MessageSection'

class Window extends Component {
  render () {
    return (
      <div style={styles.container}>
        <AppStatusSection />
        <CoreButtonsSection />
        <ClasspathSection />
        <MainListSection />
        <MessageSection />
      </div>
    )
  }
}

const styles = {
  container: {
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
