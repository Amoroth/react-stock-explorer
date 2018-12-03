import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'

import SmallSpinner from './SmallSpinner'
import styles from './shared.module.css'

const pageTitle = (props) => {
  const { logo, name, link, history, exchange, symbol, favorite, onFav } = props

  const onBackClick = () => {
    if (link) {
      history.push('/market')
    } else {
      history.goBack()
    }
  }

  let titleEl = <h6>{name}</h6>
  if (link) {
    titleEl = (
      <Link to={`/company?cmp=${props.symbol}`} style={{ cursor: 'pointer' }}>
        {name}
        {name ? (
          <i
            className="material-icons"
            style={{ color: 'gray', marginLeft: 10 }}
          >
            info
          </i>
        ) : null}
      </Link>
    )
  }

  return (
    <div className={styles['title-bar']}>
      <div style={{ display: 'flex' }}>
        {logo ? (
          <img
            src={logo}
            height={56}
            alt={`${name}'s logo`}
            style={{ maxWidth: '100px' }}
          />
        ) : (
          <SmallSpinner />
        )}
        <div>
          <div style={{ display: 'flex' }}>
            {titleEl}
            {name ? (
              <button
                onClick={(e) => onFav(e, symbol)}
                type="button"
                className={styles['favorite-button']}
              >
                {favorite ? (
                  <i className="material-icons" style={{ color: 'red' }}>
                    favorite
                  </i>
                ) : (
                  <i className="material-icons">favorite_border</i>
                )}
              </button>
            ) : null}
          </div>
          <span>{symbol ? `${exchange}: ${symbol}` : null}</span>
        </div>
      </div>
      <button onClick={onBackClick} type="button" className={styles['back-button']}>
        <i className="material-icons md-48">arrow_back</i>
      </button>
    </div>
  )
}

pageTitle.propTypes = {
  logo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  link: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  symbol: PropTypes.string.isRequired,
  exchange: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  favorite: PropTypes.bool.isRequired,
  onFav: PropTypes.func.isRequired,
}

pageTitle.defaultProps = { link: false }

export default withRouter(pageTitle)
