import React from 'react'
import PropTypes from 'prop-types'

import styles from './shared.module.css'

const circularButton = ({ children, func }) => (
  <button className={styles['circular-button']} type="button" onClick={func}>
    {children}
  </button>
)

circularButton.propTypes = {
  children: PropTypes.string,
  func: PropTypes.func,
}

circularButton.defaultProps = {
  children: '',
  func: () => {},
}

export default circularButton
