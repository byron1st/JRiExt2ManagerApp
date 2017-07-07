import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { shell } from 'electron'

import { Section, Button, ButtonType } from './common'

class ClasspathSection extends Component {
  renderButton (classpath) {
    if (classpath) {
      return (
        <Button
          buttonType={ButtonType.SECONDARY}
          onClick={() => shell.showItemInFolder(classpath)}
        >
          Open
        </Button>
      )
    }
  }

  render () {
    return (
      <Section title='Classpath'>
        <div style={styles.container}>
          <h4 style={styles.text}>{this.props.classpath}</h4>
          {this.renderButton(this.props.classpath)}
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
