import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button, ButtonType } from './common'
import { MAIN_STATUS } from '../actions/types'

class MainListItem extends Component {
  constructor () {
    super()
    this.renderButton = this.renderButton.bind(this)
  }

  renderButton () {
    const { main, onClick } = this.props

    switch (main.status) {
      case MAIN_STATUS.BEFORE_READY:
        return
      case MAIN_STATUS.EXEC_READY:
        return <Button buttonType={ButtonType.PRIMARY} onClick={onClick}>Run</Button>
      case MAIN_STATUS.EXEC_ONGOING:
        return <Button buttonType={ButtonType.NEGATIVE} onClick={onClick}>Stop</Button>
      case MAIN_STATUS.EXEC_DONE:
        return <Button buttonType={ButtonType.SECONDARY} onClick={onClick}>Open a log file</Button>
    }
  }

  render () {
    const { main } = this.props

    return (
      <div style={styles.container}>
        <h4 style={styles.text}>({main.shortcut}) {main.mainClassName}</h4>
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

MainListItem.propTypes = {
  main: PropTypes.shape({
    shortcut: PropTypes.string,
    mainClassName: PropTypes.string.isRequired
  }),
  onClick: PropTypes.func.isRequired,
  isRunButtonVisible: PropTypes.bool.isRequired
}

export default MainListItem
