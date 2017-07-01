import React, { Component } from 'react'
import { connect } from 'react-redux'
import { remote } from 'electron'
import fs from 'fs'

import { Section, Button, ButtonType } from './common'
import { loadConfig } from '../actions'

class CoreButtonsSection extends Component {
  checkConfigValidation (config) {
    return config.classpath && config.mainList && config.ettypeList &&
      Array.isArray(config.mainList) && Array.isArray(config.ettypeList) && typeof config.classpath === 'string'
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

  render () {
    return (
      <Section title='Core buttons'>
        <div style={styles.container}>
          <Button buttonType={ButtonType.PRIMARY} onClick={this.loadConfig.bind(this)}>Get a config</Button>
          <Button buttonType={ButtonType.PRIMARY}>Instrumentation</Button>
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

export default connect(null, { loadConfig })(CoreButtonsSection)
