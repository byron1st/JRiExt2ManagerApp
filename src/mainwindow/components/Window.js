'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ipcRenderer, remote } from 'electron'

import AppStatusSection from './AppStatusSection'
import CoreButtonsSection from './CoreButtonsSection'
import ClasspathSection from './ClasspathSection'
import MainListSection from './MainListSection'
import MessageSection from './MessageSection'
import { changeAppStatus } from '../actions'
import { APP_STATUS } from '../actions/types'

class Window extends Component {
  componentWillMount () {
    const MSG = {
      INST: 'msg.inst',
      EXEC: 'msg.exec',
      QUIT: 'msg.quit'
    }

    ipcRenderer.on('done-response', (event, body) => {
      switch (body) {
        case MSG.INST:
          this.props.changeAppStatus({ appStatus: APP_STATUS.INST_DONE })
          break
        default:
          break
      }
    })

    ipcRenderer.on('error-response', (event, body) => {
      remote.dialog.showErrorBox('JRiExt2 throws an error!', body)
    })
  }

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

export default connect(null, { changeAppStatus })(Window)

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
