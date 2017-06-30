import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Section, Button, ButtonType } from './common'

class ClasspathSection extends Component {
  render () {
    return (
      <Section title='Classpath'>
        <div style={styles.container}>
          <h4 style={styles.text}>{this.props.classpath}</h4>
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

const mapStateToProps = (state) => {
  return {
    classpath: state.config.classpath
  }
}

ClasspathSection.propTypes = {
  classpath: PropTypes.string
}

export default connect(mapStateToProps)(ClasspathSection)
