'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ipcRenderer, remote } from 'electron'

import AppStatusSection from './AppStatusSection'
import MenuSection from './MenuSection'
import ClasspathSection from './ClasspathSection'
import ExecListSection from './ExecListSection'
import MessageSection from './MessageSection'
import {
  changeAppStatus,
  changeAllExecReady,
  changeExecStatus,
  changeExecStatusFromUniqueName,
  updateProcessKey,
  updateOutputFile,
  appendMessage,
  addCacheRoot
} from '../actions'
import { APP_STATUS, EXEC_STATUS } from '../actions/types'

class Window extends Component {
  componentWillMount () {
    ipcRenderer.on('done-inst', (event, cacheRoot) => {
      this.props.changeAppStatus({ appStatus: APP_STATUS.INST_DONE })
      this.props.changeAllExecReady()
      this.props.appendMessage('Instrumentation has been finished.')
      this.props.appendMessage('You can now execute the target program from ' + cacheRoot + '.')
      this.props.addCacheRoot(cacheRoot)
    })

    ipcRenderer.on('done-exec', (event, args) => {
      const uniqueName = args[0]
      const processKey = args[1]

      this.props.changeExecStatusFromUniqueName({ uniqueName, execStatus: EXEC_STATUS.EXEC_ONGOING })
      this.props.updateProcessKey({ uniqueName, processKey })
      this.props.appendMessage(uniqueName + '(' + processKey + ') is executed now.')
    })

    ipcRenderer.on('term-exec', (event, args) => {
      const uniqueName = args[0]
      const outputFile = args[1]

      this.props.changeExecStatusFromUniqueName({ uniqueName, execStatus: EXEC_STATUS.EXEC_DONE })
      this.props.updateOutputFile({ uniqueName, outputFile })
      this.props.appendMessage(uniqueName + ' is terminated now. Logs are recorded at ' + outputFile + '.')
    })

    ipcRenderer.on('error-response', (event, body) => {
      remote.dialog.showErrorBox('JRiExt2 throws an error!', body)
      this.props.appendMessage('An error has been occured: ' + body)

      if (this.props.appStatus === APP_STATUS.INST_ONGOING) {
        this.props.changeAppStatus({ appStatus: APP_STATUS.CONFIG_LOADED })
      }
    })

    ipcRenderer.on('extract-model-done', (event, filename) => {
      remote.dialog.showMessageBox({
        message: 'A model has been extracted to ' + filename + '.'
      })
    })
  }

  render () {
    return (
      <div style={styles.container}>
        <AppStatusSection />
        <MenuSection />
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
  updateProcessKey,
  updateOutputFile,
  appendMessage,
  addCacheRoot
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    appStatus: state.status
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Window)
