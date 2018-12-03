import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, NavLink } from 'react-router-dom'

import SearchBar from './SearchBar'
import styles from './Header.module.css'

const header = ({ location, history }) => {
  let expandButton = (
    <button className={styles['expand-button']} type="button">
      <i className="material-icons">menu</i>
    </button>
  )

  const onBackClick = () => {
    if (location.pathname === '/company') {
      history.goBack()
    } else {
      history.push('/')
    }
  }

  if (location.pathname !== '/') {
    expandButton = (
      <button
        className={styles['expand-button']}
        onClick={onBackClick}
        type="button"
      >
        <i className="material-icons">arrow_back</i>
      </button>
    )
  }

  const navlinkStyle = [styles['nav-link'], styles['desktop-only']].join(' ')

  return (
    <nav className={styles.container}>
      <div className={styles['brand-container']}>
        {expandButton}
        <h6 className={styles.brand}>Stock Explorer!</h6>
      </div>
      <div className={[styles['nav-links']].join(' ')}>
        <SearchBar />
        <NavLink
          to="/market"
          exact
          activeClassName={styles['nav-link-active']}
          className={navlinkStyle}
        >
          Stocks
        </NavLink>
        <NavLink
          to="/error"
          activeClassName={styles['nav-link-active']}
          className={navlinkStyle}
        >
          Cryptos
        </NavLink>
      </div>
    </nav>
  )
}

header.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default withRouter(header)
