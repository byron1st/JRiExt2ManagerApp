import React, { Component } from 'react'
import { connect } from 'react-redux'
import { remote } from 'electron'
import fs from 'fs'

import { Section, Button, ButtonType } from './common'
import { loadConfig, startInst } from '../actions'

class CoreButtonsSection extends Component {
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
    } catch (e) {
      remote.dialog.showErrorBox('Error!!', e.message)
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

  render () {
    return (
      <Section title='Menu'>
        <div style={styles.container}>
          <Button buttonType={ButtonType.PRIMARY} onClick={this.loadConfig.bind(this)}>Get a config</Button>
          <Button buttonType={ButtonType.PRIMARY} onClick={this.startInst.bind(this)}>Instrumentation</Button>
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
  return {
    classpath: state.config.classpath,
    ettypeList: state.config.ettypeList
  }
}

export default connect(mapStateToProps, { loadConfig, startInst })(CoreButtonsSection)
