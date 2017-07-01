import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Section } from './common'
import { APP_STATUS } from '../actions/types'
import MainListItem from './MainListItem'

class MainListContainer extends Component {
  renderMainList (mainList) {
    const isRunButtonVisible = this.props.status >= APP_STATUS.INST_DONE

    return mainList.map(main => {
      return <MainListItem
        main={main}
        onClick={() => console.log('hello')}
        isRunButtonVisible={isRunButtonVisible}
        key={main.shortcut}
      />
    })
  }

  render () {
    return (
      <Section title='Main classes'>
        <div style={styles.container}>
          {this.renderMainList(this.props.mainList)}
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
  console.log(state)
  return {
    mainList: state.config.mainList,
    status: state.status
  }
}

MainListContainer.propTypes = {
  mainList: PropTypes.arrayOf(PropTypes.shape({
    shortcut: PropTypes.string,
    mainClassName: PropTypes.string.isRequired
  })),
  status: PropTypes.oneOf([0, 1, 2, 3])
}

export default connect(mapStateToProps)(MainListContainer)
