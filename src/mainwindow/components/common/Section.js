import React from 'react'
import PropTypes from 'prop-types'

const Section = (props) => {
  const {
    title,
    customStyle,
    children
  } = props

  return (
    <div style={Object.assign({}, styles.container, customStyle)}>
      <h3 style={styles.title}>{title}</h3>
      <hr style={styles.hr} />
      {children}
    </div>
  )
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
    borderColor: '#ddd',
    boxShadow: '2px 2px 3px #000',
    margin: '10px',
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
