import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button, ButtonType } from './Button'

class Section extends Component {
  renderHeader (title, buttonOnClick, buttonText) {
    if (title) {
      if (buttonOnClick && buttonText) {
        return this.renderButtonHeader(title, buttonOnClick, buttonText)
      } else {
        return this.renderNormalHeader(title)
      }
    }
  }

  renderNormalHeader (title) {
    return (
      <div>
        <div style={styles.textContainer}>
          <h3 style={styles.title}>{title}</h3>
        </div>
        <hr style={styles.hr} />
      </div>
    )
  }

  renderButtonHeader (title, buttonOnClick, buttonText) {
    return (
      <div>
        <div style={styles.textContainer}>
          <h3 style={styles.title}>{title}</h3>
          <Button
            buttonType={ButtonType.SECONDARY}
            onClick={buttonOnClick}
          >
            {buttonText}
          </Button>
        </div>
        <hr style={styles.hr} />
      </div>
    )
  }

  render () {
    const {
      title,
      buttonOnClick,
      buttonText,
      customStyle,
      children
    } = this.props

    return (
      <div style={Object.assign({}, styles.container, customStyle)}>
        {this.renderHeader(title, buttonOnClick, buttonText)}
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
    margin: '0px 0px 0px 0px',
    fontFamily: 'sans-serif'
  },
  textContainer: {
    margin: '0px 0px 5px 0px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  hr: {
    margin: '0px 0px 5px 0px'
  }
}

export { Section }
