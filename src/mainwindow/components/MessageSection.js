import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Section, Button, ButtonType } from './common'
import { clearMessage } from '../actions'

class MessageSection extends Component {
  renderMessageList (messageList) {
    return messageList.map((message, index) => <h4 style={styles.text} key={'message' + index}>{message}</h4>)
  }

  render () {
    return (
      <Section title='Messages'>
        <div style={styles.container}>
          <div style={styles.button}>
            <Button
              buttonType={ButtonType.NEGATIVE}
              onClick={this.props.clearMessage}
            >clear</Button>
          </div>
          {this.renderMessageList(this.props.messageList)}
        </div>
      </Section>
    )
  }
}

const styles = {
  container: {
    height: 240,
    overflow: 'scroll',
    backgroundColor: 'black',
    padding: 5
  },
  text: {
    color: 'white',
    fontFamily: 'monospace',
    margin: 0,
    marginBottom: 1,
    fontSize: 12
  },
  button: {
    position: 'fixed',
    right: 23
  }
}

MessageSection.propTypes = {
  messageList: PropTypes.arrayOf(PropTypes.string).isRequired
}

const mapStateToProps = (state) => {
  return {
    messageList: state.messageList
  }
}

export default connect(mapStateToProps, { clearMessage })(MessageSection)
