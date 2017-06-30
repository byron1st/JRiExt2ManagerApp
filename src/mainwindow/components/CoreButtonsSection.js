import React, { Component } from 'react'
import { connect } from 'react-redux'
import { remote } from 'electron'

import { Section, Button, ButtonType } from './common'
import { getConfig } from '../actions'

class CoreButtonsSection extends Component {
  getConfig () {
    remote.dialog.showOpenDialog({
      title: 'Get a config file'
    }, (filePaths) => {
      if (filePaths) {
        const configFilePath = filePaths[0]
        this.props.getConfig({ configFilePath })
      }
    })
  }

  render () {
    return (
      <Section title='Core buttons'>
        <div style={styles.container}>
          <Button buttonType={ButtonType.PRIMARY} onClick={this.getConfig.bind(this)}>Get a config</Button>
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

export default connect(null, { getConfig })(CoreButtonsSection)
