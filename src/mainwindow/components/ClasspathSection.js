import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Section, Button, ButtonType } from './common'

export default class ClasspathSection extends Component {
  render () {
    return (
      <Section title='Classpath'>
        <div style={styles.container}>
          <h4 style={styles.text}>path/to/target/system/class/path</h4>
          <Button
            buttonType={ButtonType.SECONDARY}
          >
            Open
          </Button>
        </div>
      </Section>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    margin: 0,
    fontStyle: 'italic',
    fontFamily: 'monospace'
  }
}

ClasspathSection.propTypes = {
}
