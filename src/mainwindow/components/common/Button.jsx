import React, { Component } from 'react'
import PropTypes from 'prop-types'

const ButtonType = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  NEGATIVE: 'negative'
}

class Button extends Component {
  constructor () {
    super()
    this.state = {
      isHovered: false
    }
  }

  toggleHovered (isHovered) {
    this.setState({ isHovered: isHovered })
  }

  getButtonStyle (type, disabled) {
    if (disabled) {
      return Object.assign({},
        styles.container,
        { borderColor: '#4f4f4f', backgroundColor: '#a4a4a4', color: 'white' }
      )
    } else {
      let color = this.getButtonColor(type)
      return Object.assign({},
        styles.container,
        this.state.isHovered
          ? { borderColor: color, backgroundColor: 'white', color: color }
          : { borderColor: color, backgroundColor: color, color: 'white' }
      )
    }
  }

  getButtonColor (type) {
    switch (type) {
      case ButtonType.PRIMARY:
        return '#007aff'
      case ButtonType.SECONDARY:
        return 'rgb(113,227,72)'
      case ButtonType.NEGATIVE:
        return 'rgb(232,106,100)'
      default:
        return 'rgb(255,255,255)'
    }
  }

  render () {
    const {
      buttonType,
      onClick,
      children,
      disabled
    } = this.props

    return (
      <button
        type='button'
        style={this.getButtonStyle(buttonType, disabled)}
        onClick={onClick}
        onMouseEnter={() => this.toggleHovered(true)}
        onMouseLeave={() => this.toggleHovered(false)}
        disabled={disabled}
      >
        {children}
      </button>
    )
  }
}

Button.propTypes = {
  children: PropTypes.any.isRequired,
  onClick: PropTypes.func,
  buttonType: PropTypes.oneOf([ButtonType.PRIMARY, ButtonType.NEGATIVE, ButtonType.SECONDARY])
}

const styles = {
  container: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 3,
    margin: '0px 5px 0px 5px',
    fontSize: 12,
    boxShadow: '2px 2px 3px #000',
    fontFamily: 'sans-serif'
  }
}

export { Button, ButtonType }
