'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ipcRenderer, remote } from 'electron'

import AppStatusSection from './AppStatusSection'
import CoreButtonsSection from './CoreButtonsSection'
import ClasspathSection from './ClasspathSection'
import ExecListSection from './ExecListSection'
import MessageSection from './MessageSection'
import {
  changeAppStatus,
  changeAllExecReady,
  changeExecStatus,
  changeExecStatusFromUniqueName,
  updateProcessKey
} from '../actions'
import { APP_STATUS, EXEC_STATUS } from '../actions/types'

class Window extends Component {
  componentWillMount () {
    ipcRenderer.on('done-inst', () => {
      this.props.changeAppStatus({ appStatus: APP_STATUS.INST_DONE })
      this.props.changeAllExecReady()
    })

    ipcRenderer.on('done-exec', (event, args) => {
      const uniqueName = args[0]
      const processKey = args[1]

      this.props.changeExecStatusFromUniqueName({ uniqueName, execStatus: EXEC_STATUS.EXEC_ONGOING })
      this.props.updateProcessKey({ uniqueName, processKey })
    })

    ipcRenderer.on('term-exec', (event, args) => {
      const uniqueName = args[0]
      this.props.changeExecStatusFromUniqueName({ uniqueName, execStatus: EXEC_STATUS.EXEC_DONE })
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
        <ExecListSection />
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

const mapDispatchToProps = {
  changeAppStatus,
  changeAllExecReady,
  changeExecStatus,
  changeExecStatusFromUniqueName,
  updateProcessKey
}

export default connect(null, mapDispatchToProps)(Window)
