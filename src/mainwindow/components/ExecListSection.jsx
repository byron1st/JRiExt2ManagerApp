import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { shell } from 'electron'

import { Section } from './common'
import { APP_STATUS } from '../actions/types'
import ExecListItem from './ExecListItem'

class ExecListContainer extends Component {
  renderExecList (execList) {
    const isRunButtonVisible = this.props.status >= APP_STATUS.INST_DONE

    return execList.map((exec, index) => {
      return <ExecListItem
        exec={exec}
        index={index}
        isRunButtonVisible={isRunButtonVisible}
        key={exec.uniqueName}
      />
    })
  }

  render () {
    return (
      <Section
        title='Executables'
        buttonOnClick={this.props.cacheRoot ? () => {
          shell.showItemInFolder(this.props.cacheRoot)
        } : undefined}
        buttonText={<span><i className='fa fa-folder-open' aria-hidden='true' /> Open the cache folder</span>}
      >
        <div style={styles.container}>
          {this.renderExecList(this.props.execList)}
        </div>
      </Section>
    )
  }
}

const styles = {
  container: {
    height: 100,
    overflow: 'scroll'
  }
}

const mapStateToProps = (state) => {
  return {
    execList: state.config.execList,
    cacheRoot: state.config.cacheRoot,
    status: state.status
  }
}

ExecListContainer.propTypes = {
  execList: PropTypes.arrayOf(PropTypes.shape({
    shortcut: PropTypes.string,
    mainClassName: PropTypes.string.isRequired
  })),
  status: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  cacheRoot: PropTypes.string
}

export default connect(mapStateToProps)(ExecListContainer)
