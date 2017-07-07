import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ipcRenderer, shell } from 'electron'
import path from 'path'

import { executeJRiExt2, stopExecJRiExt2 } from '../actions/commands'
import { Button, ButtonType } from './common'
import { EXEC_STATUS } from '../actions/types'

class ExecListItem extends Component {
  constructor () {
    super()
    this.renderButton = this.renderButton.bind(this)
    this.renderProcessKey = this.renderProcessKey.bind(this)
    this.startExec = this.startExec.bind(this)
    this.stopExec = this.stopExec.bind(this)
  }

  startExec () {
    const command = executeJRiExt2(this.props.exec)
    ipcRenderer.send('send-command', command)
  }

  stopExec () {
    const command = stopExecJRiExt2(this.props.exec)
    ipcRenderer.send('send-command', command)
  }

  renderButton () {
    const { exec } = this.props

    switch (exec.status) {
      case EXEC_STATUS.BEFORE_READY:
        return
      case EXEC_STATUS.EXEC_READY:
        return <Button buttonType={ButtonType.PRIMARY} onClick={this.startExec}>Run</Button>
      case EXEC_STATUS.EXEC_ONGOING:
        return <Button buttonType={ButtonType.NEGATIVE} onClick={this.stopExec}>Stop</Button>
      case EXEC_STATUS.EXEC_DONE:
        return <Button buttonType={ButtonType.SECONDARY} onClick={this.startExec}>Re-run</Button>
    }
  }

  renderProcessKey () {
    const { exec } = this.props
    if (exec.processKey) {
      if (exec.status === EXEC_STATUS.EXEC_ONGOING) {
        return (
          <span>
            <i className='fa fa-cog fa-spin' /> {exec.processKey}
          </span>
        )
      } else if (exec.status === EXEC_STATUS.EXEC_DONE) {
        const outputFilePath = path.join(exec.outputPath, exec.processKey + '.txt')
        return (
          <span>
            <a href='#' style={{ color: 'black' }}>
              <i className='fa fa-file' onClick={() => shell.showItemInFolder(outputFilePath)} />
            </a> {exec.processKey}
          </span>
        )
      }
    }
  }

  render () {
    const { exec } = this.props

    return (
      <div style={styles.container}>
        <h4 style={styles.text}>({exec.uniqueName}) {exec.mainClassName} : {this.renderProcessKey()}</h4>
        {this.renderButton()}
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    paddingBottom: 5,
    borderStyle: 'solid',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    height: 30
  },
  text: {
    margin: 0,
    fontStyle: 'italic',
    fontFamily: 'monospace'
  }
}

ExecListItem.propTypes = {
  exec: PropTypes.shape({
    uniqueName: PropTypes.string,
    executable: PropTypes.string.isRequired
  }),
  isRunButtonVisible: PropTypes.bool.isRequired
}

export default ExecListItem
