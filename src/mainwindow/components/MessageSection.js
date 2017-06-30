import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Section, Button, ButtonType } from './common'

export default class MessageSection extends Component {
  render () {
    return (
      <Section title='Messages'>
        <div style={styles.container}>
          <div style={styles.button}>
            <Button buttonType={ButtonType.NEGATIVE}>clear</Button>
          </div>
          <h4 style={styles.text}>message</h4>
          <h4 style={styles.text}>message</h4>
          <h4 style={styles.text}>message</h4>
          <h4 style={styles.text}>message</h4>
          <h4 style={styles.text}>message</h4>
          <h4 style={styles.text}>message</h4>
          <h4 style={styles.text}>message</h4>
          <h4 style={styles.text}>message</h4>
          <h4 style={styles.text}>message</h4>
          <h4 style={styles.text}>message</h4>
          <h4 style={styles.text}>message</h4>
          <h4 style={styles.text}>message</h4>
          <h4 style={styles.text}>message</h4>
          <h4 style={styles.text}>message</h4>
          <h4 style={styles.text}>message</h4>
          <h4 style={styles.text}>message</h4>
          <h4 style={styles.text}>message</h4>
          <h4 style={styles.text}>message</h4>
          <h4 style={styles.text}>message</h4>
          <h4 style={styles.text}>message</h4>
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
}
