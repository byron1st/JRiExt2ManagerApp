import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Button, ButtonType } from './common'
import { EXEC_STATUS } from '../actions/types'
import { startExec } from '../actions'

class ExecListItem extends Component {
  constructor () {
    super()
    this.renderButton = this.renderButton.bind(this)
  }

  renderButton () {
    const { exec, index } = this.props

    switch (exec.status) {
      case EXEC_STATUS.BEFORE_READY:
        return
      case EXEC_STATUS.EXEC_READY:
        return <Button buttonType={ButtonType.PRIMARY} onClick={() => this.props.startExec({ exec, index })}>Run</Button>
      case EXEC_STATUS.EXEC_ONGOING:
        return <Button buttonType={ButtonType.NEGATIVE} onClick={() => console.log('stop')}>Stop</Button>
      case EXEC_STATUS.EXEC_DONE:
        return <Button buttonType={ButtonType.SECONDARY} onClick={() => console.log('done')}>Open a log file</Button>
    }
  }

  render () {
    const { exec } = this.props

    return (
      <div style={styles.container}>
        <h4 style={styles.text}>({exec.uniqueName}) {exec.mainClassName}</h4>
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
  index: PropTypes.number.isRequired,
  isRunButtonVisible: PropTypes.bool.isRequired
}

export default connect(null, { startExec })(ExecListItem)
