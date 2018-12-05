import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import styles from './StockPage.module.css'

const relevantPanel = ({ name, change, symbol, close, onSelect }) => {
  let shortCompanyName = name
  const priceChange = `${change > 0 ? '+' : ''}${(
    change * 100
  ).toFixed(2)}%`

  if (shortCompanyName.length > 14) {
    shortCompanyName = `${shortCompanyName.slice(0, 12)}...`
  }

  return (
    <div className={styles['relavent-item']} key={symbol}>
      <div
        className={`${styles['relavent-item-row']} ${
          styles['relavent-item-title']
        }`}
      >
        <h6
          title={
            shortCompanyName[shortCompanyName.length - 2] === '.'
              ? name
              : null
          }
        >
          {shortCompanyName}
        </h6>
        <span>{symbol}</span>
      </div>
      <div
        className={`${styles['relavent-item-row']} ${
          styles['relavent-item-info']
        }`}
      >
        <span>{close}</span>
        <span
          style={{ color: change > 0 ? 'green' : 'red' }}
        >
          {priceChange}
        </span>
        <Link
          to={`/stock?cmp=${symbol}`}
          onDragStart={(e) => e.preventDefault()}
          onClick={() => onSelect(symbol)}
        >
          More...
        </Link>
      </div>
    </div>
  )
}

relevantPanel.propTypes = {
  name: PropTypes.string.isRequired,
  change: PropTypes.number.isRequired,
  symbol: PropTypes.string.isRequired,
  close: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default relevantPanel
