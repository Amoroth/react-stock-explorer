import React from 'react'
import { withRouter, Link } from 'react-router-dom'

import SmallSpinner from './SmallSpinner'
import styles from './shared.module.css'

const pageTitle = (props) => {
  const { logo, name, link, history, exchange, symbol } = props

  const onBackClick = () => {
    if (link) {
      history.push('/')
    } else {
      history.goBack()
    }
  }

  let titleEl = <h6>{name}</h6>
  if (link) {
    titleEl = (
      <Link to={`/company?cmp=${props.symbol}`} style={{ cursor: 'pointer' }}>
        {props.name}
        {props.name ? (
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
          {titleEl}
          <span>{symbol ? `${exchange}: ${symbol}` : null}</span>
        </div>
      </div>
      <button onClick={onBackClick} type="button">
        <i className="material-icons md-48">arrow_back</i>
      </button>
    </div>
  )
}

export default withRouter(pageTitle)
