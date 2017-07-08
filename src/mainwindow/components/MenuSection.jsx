import React, { Component } from 'react'
import { connect } from 'react-redux'
import { remote, ipcRenderer } from 'electron'
import fs from 'fs'
import path from 'path'

import { Section, Button, ButtonType } from './common'
import { loadConfig, startInst, appendMessage } from '../actions'
import { APP_STATUS } from '../actions/types'

class MenuSection extends Component {
  checkConfigValidation (config) {
    return config.classpath && config.execList && config.ettypeList &&
      Array.isArray(config.execList) && Array.isArray(config.ettypeList) && typeof config.classpath === 'string'
  }

  handleConfigFilePath (configFilePath) {
    try {
      const config = JSON.parse(fs.readFileSync(configFilePath))
      if (!this.checkConfigValidation(config)) {
        throw new Error('The format of a config file is wrong.')
      }

      this.props.loadConfig({ config })
      this.props.appendMessage('A config file has been loaded: ' + configFilePath)
    } catch (e) {
      remote.dialog.showErrorBox('Handle config file path error', e.message)
    }
  }

  loadConfig () {
    remote.dialog.showOpenDialog({
      title: 'Get a config file'
    }, (filePaths) => {
      if (filePaths) {
        this.handleConfigFilePath(filePaths[0])
      }
    })
  }

  startInst () {
    this.props.startInst({
      classpath: this.props.classpath,
      ettypeList: this.props.ettypeList
    })
  }

  extractModel () {
    const { outputFileList, mappingConditionScript } = this.props

    ipcRenderer.send('extract-model', outputFileList, mappingConditionScript)
  }

  render () {
    return (
      <Section>
        <div style={styles.container}>
          <Button buttonType={ButtonType.PRIMARY} onClick={this.loadConfig.bind(this)}>Get a config</Button>
          <Button
            buttonType={ButtonType.PRIMARY}
            onClick={this.startInst.bind(this)}
            disabled={this.props.status < APP_STATUS.CONFIG_LOADED}
          >
            Instrumentation
          </Button>
          <Button
            buttonType={ButtonType.PRIMARY}
            onClick={this.extractModel.bind(this)}
            disabled={this.props.status < APP_STATUS.EXTR_READY}
          >
            Extract a model
          </Button>
        </div>
      </Section>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row'
  }
}

const mapStateToProps = (state) => {
  const outputFileList = state.config.execList.map(exec => {
    if (exec.outputPath && exec.outputFile) {
      return path.join(exec.outputPath, exec.outputFile)
    }
  })
  return {
    classpath: state.config.classpath,
    ettypeList: state.config.ettypeList,
    status: state.status,
    outputFileList: outputFileList,
    mappingConditionScript: state.config.mappingConditionScript
  }
}

export default connect(mapStateToProps, { loadConfig, startInst, appendMessage })(MenuSection)
