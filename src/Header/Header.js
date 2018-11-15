import React from 'react'

import styles from './Header.module.css'

/* eslint-disable jsx-a11y/anchor-is-valid */

const header = (props) => {
  return (
    <nav className={styles['container']}>
      <div>
        <h6 className={styles['brand']}>Stock Explorer!</h6>
      </div>
      <div className={styles['nav-links']}>
        <a href="#" className={styles['nav-link-active']}>Place One</a>
        <a href="#">Place Two</a>
      </div>
    </nav>
  )
}

export default header