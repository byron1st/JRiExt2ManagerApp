import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ipcRenderer } from 'electron'

import { Section } from './common'
import { APP_STATUS } from '../actions/types'

class AppStatusSection extends Component {
  getStatuslightStyle (buttonStatus, appStatus) {
    return Object.assign({},
      styles.statuslight,
      buttonStatus <= appStatus ? styles.on : styles.off
    )
  }

  renderInstStatus (appStatus) {
    let instStatus

    if (appStatus === APP_STATUS.INST_ONGOING) {
      instStatus = (
        <span>
          <i className='fa fa-cog fa-spin' /> Instrumentation Ongoing...
        </span>
      )
    } else {
      instStatus = 'Instrumentation Done'
    }

    return instStatus
  }

  render () {
    const jriext2Pid = ipcRenderer.sendSync('get-jriext2-pid')

    return (
      <Section>
        <div style={styles.container}>
          <div style={this.getStatuslightStyle(APP_STATUS.READY, this.props.status)}>
            JRiExt2 Ready (pid: {jriext2Pid})
          </div>
          &nbsp;<i className='fa fa-angle-double-right' aria-hidden='true' />&nbsp;
          <div style={this.getStatuslightStyle(APP_STATUS.CONFIG_LOADED, this.props.status)}>
            Config Loaded
          </div>
          &nbsp;<i className='fa fa-angle-double-right' aria-hidden='true' />&nbsp;
          <div style={this.getStatuslightStyle(APP_STATUS.INST_DONE, this.props.status)}>
            {this.renderInstStatus(this.props.status)}
          </div>
          &nbsp;<i className='fa fa-angle-double-right' aria-hidden='true' />&nbsp;
          <div style={this.getStatuslightStyle(APP_STATUS.EXTR_READY, this.props.status)}>
            Extraction Ready
          </div>
          &nbsp;<i className='fa fa-angle-double-right' aria-hidden='true' />&nbsp;
          <div style={this.getStatuslightStyle(APP_STATUS.EXTR_DONE, this.props.status)}>
            Extraction Done
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
