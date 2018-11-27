import React from 'react'

import styles from './shared.module.css'

const smallSpinner = (props) => {
  return (
    <div className={styles['lds-ripple']}>
      <div></div>
      <div></div>
    </div>
  )
}

export default smallSpinner