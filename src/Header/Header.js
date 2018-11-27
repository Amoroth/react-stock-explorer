import React from 'react'
import { withRouter, NavLink } from 'react-router-dom'

import SearchBar from './SearchBar'
import styles from './Header.module.css'

const header = (props) => {
  let expandButton = (
  <button className={styles['expand-button']}>
    <i className="material-icons">menu</i>
  </button>)

  if (props.location.pathname === '/stock') {
    expandButton = (
      <button className={styles['expand-button']} onClick={() => props.history.push('/')}>
        <i className="material-icons">arrow_back</i>
      </button>
    )
  }

  let navlinkStyle = [styles['nav-link'], styles['desktop-only']].join(' ')

  return (
    <nav className={styles['container']}>
      <div className={styles['brand-container']}>
        { expandButton }
        <h6 className={styles['brand']}>Stock Explorer!</h6>
      </div>
      <div className={[styles['nav-links']].join(' ')}>
        <SearchBar />
        <NavLink to="/" exact activeClassName={styles['nav-link-active']} className={navlinkStyle}>Home</NavLink>
        <NavLink to="/error" activeClassName={styles['nav-link-active']} className={navlinkStyle}>Error</NavLink>
      </div>
    </nav>
  )
}

export default withRouter(header)