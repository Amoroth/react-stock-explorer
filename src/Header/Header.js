import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from './Header.module.css'

const header = (props) => {
  return (
    <nav className={styles['container']}>
      <div>
        <h6 className={styles['brand']}>Stock Explorer!</h6>
      </div>
      <div className={styles['nav-links']}>
        <NavLink to="/" exact activeClassName={styles['nav-link-active']}>Home</NavLink>
        <NavLink to="/error" activeClassName={styles['nav-link-active']}>Error</NavLink>
      </div>
    </nav>
  )
}

export default header