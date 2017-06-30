import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Section } from './common'
import MainListItem from './MainListItem'

class MainListContainer extends Component {
  renderMainList (mainList) {
    return mainList.map(main => {
      return <MainListItem
        main={main}
        onClick={() => console.log('hello')}
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
  return {
    mainList: state.config.mainList
  }
}

MainListContainer.propTypes = {
  mainList: PropTypes.arrayOf(PropTypes.shape({
    shortcut: PropTypes.string,
    mainClassName: PropTypes.string.isRequired
  }))
}

export default connect(mapStateToProps)(MainListContainer)
