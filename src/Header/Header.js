import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, NavLink } from 'react-router-dom'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

import SearchBar from './SearchBar'
import styles from './Header.module.css'

const header = ({ location, history, currencyChange, currency }) => {
  let expandButton = null

  const onBackClick = () => {
    if (location.pathname === '/company') {
      history.goBack()
    } else {
      history.push('/market')
    }
  }

  if (location.pathname !== '/market') {
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

  const dropdownOptions = ['USD', 'EUR', 'PLN', 'GBP', 'CHF']

  return (
    <nav className={styles.container}>
      <div className={styles['brand-container']}>
        {expandButton}
        {window.innerWidth > 800 ? <h6 className={styles.brand}>Stock Explorer!</h6> : null}
      </div>
      <div className={styles['nav-links']}>
        <SearchBar />
        <NavLink
          to="/market"
          exact
          activeClassName={styles['nav-link-active']}
          className={styles['nav-link']}
        >
          Stocks
        </NavLink>
        <NavLink
          to="/error"
          activeClassName={styles['nav-link-active']}
          className={styles['nav-link']}
        >
          Cryptos
        </NavLink>
        <Dropdown
          options={dropdownOptions}
          onChange={(cur) => currencyChange(cur.value)}
          value={currency}
          className={styles.dropdown}
          controlClassName={styles['dropdown-control']}
        />
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
  currencyChange: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
}

export default withRouter(header)
