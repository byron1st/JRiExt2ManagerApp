import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { shell } from 'electron'

import { Section, Button, ButtonType } from './common'

class ClasspathSection extends Component {
  renderButton (path) {
    if (path) {
      return (
        <Button
          buttonType={ButtonType.SECONDARY}
          onClick={() => shell.showItemInFolder(path)}
        >
          Open
        </Button>
      )
    }
  }

  render () {
    return (
      <Section title='Paths'>
        <div style={styles.container}>
          <h4 style={styles.text}>Classpath: {this.props.classpath}</h4>
          {this.renderButton(this.props.classpath)}
        </div>
        <div style={styles.container}>
          <h4 style={styles.text}>Mapping Cond. Script: {this.props.mappingConditionScript}</h4>
          {this.renderButton(this.props.mappingConditionScript)}
        </div>
      </Section>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '21px',
    marginTop: '5px'
  },
  text: {
    margin: 0,
    fontStyle: 'italic',
    fontFamily: 'monospace'
  }
}

const mapStateToProps = (state) => {
  return {
    classpath: state.config.classpath,
    mappingConditionScript: state.config.mappingConditionScript
  }
}

ClasspathSection.propTypes = {
  classpath: PropTypes.string,
  mappingConditionScript: PropTypes.string
}

export default connect(mapStateToProps)(ClasspathSection)
