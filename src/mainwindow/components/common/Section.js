import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Section extends Component {
  renderHeader (title) {
    if (title) {
      return (
        <div>
          <h3 style={styles.title}>{title}</h3>
          <hr style={styles.hr} />
        </div>
      )
    }
  }

  render () {
    const {
      title,
      customStyle,
      children
    } = this.props

    return (
      <div style={Object.assign({}, styles.container, customStyle)}>
        {this.renderHeader(title)}
        {children}
      </div>
    )
  }
}

Section.propTypes = {
  title: PropTypes.string,
  customStyle: PropTypes.object
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: 'rgb(212, 212, 212)',
    margin: '5px',
    padding: '5px'
  },
  title: {
    margin: '0px 0px 5px 0px',
    fontFamily: 'sans-serif'
  },
  hr: {
    margin: '0px 0px 5px 0px'
  }
}

export { Section }
