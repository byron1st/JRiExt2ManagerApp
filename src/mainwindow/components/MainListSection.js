import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Section, Button, ButtonType } from './common'

export default class MainListContainer extends Component {
  render () {
    return (
      <Section title='Main classes'>
        <div style={styles.container}>
          <div style={styles.itemContainer}>
            <h4 style={styles.text}>package/to/main/class</h4>
            <Button
              buttonType={ButtonType.SECONDARY}
            >
              Run
            </Button>
          </div>
          <div style={styles.itemContainer}>
            <h4 style={styles.text}>package/to/main/class</h4>
            <Button
              buttonType={ButtonType.SECONDARY}
            >
              Run
            </Button>
          </div>
          <div style={styles.itemContainer}>
            <h4 style={styles.text}>package/to/main/class</h4>
            <Button
              buttonType={ButtonType.SECONDARY}
            >
              Run
            </Button>
          </div>
          <div style={styles.itemContainer}>
            <h4 style={styles.text}>package/to/main/class</h4>
            <Button
              buttonType={ButtonType.SECONDARY}
            >
              Run
            </Button>
          </div>
        </div>
      </Section>
    )
  }
}

const styles = {
  container: {
    height: 100,
    overflow: 'scroll'
  },
  itemContainer: {
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

MainListContainer.propTypes = {
}
