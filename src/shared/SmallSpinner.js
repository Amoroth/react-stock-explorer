import React from 'react'

import styles from './shared.module.css'

const smallSpinner = () => (
  <div className={styles['lds-ripple']}>
    <div />
    <div />
  </div>
)

export default smallSpinner
