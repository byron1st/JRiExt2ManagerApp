import React from 'react'
import PropTypes from 'prop-types'

import { Button, ButtonType } from './common'

const MainListItem = ({ main, onClick, isRunButtonVisible }) => {
  const renderButton = isRunButtonVisible
    ? <Button buttonType={ButtonType.SECONDARY} onClick={onClick}>Run</Button>
    : ''

  return (
    <div style={styles.container}>
      <h4 style={styles.text}>({main.shortcut}) {main.mainClassName}</h4>
      {renderButton}
    </div>
  )
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
