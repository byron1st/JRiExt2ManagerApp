import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Section } from './common'
import { APP_STATUS } from '../actions/types'

class AppStatusSection extends Component {
  getStatuslightStyle (buttonStatus, appStatus) {
    return Object.assign({},
      styles.statuslight,
      buttonStatus <= appStatus ? styles.on : styles.off
    )
  }

  render () {
    return (
      <Section>
        <div style={styles.container}>
          <div style={this.getStatuslightStyle(APP_STATUS.CONFIG_LOADED, this.props.status)}>
            CONFIG_LOADED
          </div>
          &nbsp;/&nbsp;
          <div style={this.getStatuslightStyle(APP_STATUS.INST_DONE, this.props.status)}>
            INST_DONE
          </div>
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
  statuslight: {
    borderStyle: 'solid',
    borderWidth: 0,
    borderRadius: 3,
    margin: '0px 5px 0px 5px',
    padding: '5px 5px 5px 5px',
    fontSize: 12,
    fontFamily: 'sans-serif',
    color: 'white'
  },
  on: {
    backgroundColor: 'rgb(113,227,72)'
  },
  off: {
    backgroundColor: 'rgb(232,106,100)'
  }
}

const mapStatetoProps = (state) => {
  return {
    status: state.status
  }
}

export default connect(mapStatetoProps)(AppStatusSection)
