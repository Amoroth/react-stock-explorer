import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import styles from './Stocks.module.css'

const panel = ({ change, title, short, favorite, onFav, price, history }) => {
  const priceChange = `${change > 0 ? '+' : ''}${(change * 100).toFixed(2)}%`
  let stockName = title
  if (stockName.length > 30) {
    stockName = `${stockName.slice(0, 28)}...`
  }

  const openFullPage = (e) => {
    if ((e.type === 'keypress' && e.which === 13) || e.type === 'click') {
      history.push(`/stock?cmp=${short}`)
    }
  }

  return (
    <div
      className={styles.panel}
      onClick={openFullPage}
      role="button"
      onKeyPress={openFullPage}
      tabIndex={0}
    >
      <div className={styles['panel-upper']}>
        <h6
          className={styles['panel-title']}
          title={stockName[stockName.length - 2] === '.' ? title : null}
        >
          {stockName}
        </h6>
        <button
          className={styles['panel-favorite']}
          onClick={(e) => onFav(e, short)}
          type="button"
        >
          {favorite ? (
            <i className="material-icons" style={{ color: 'red' }}>
              favorite
            </i>
          ) : (
            <i className="material-icons">favorite_border</i>
          )}
        </button>
      </div>
      <div className={styles['panel-details']}>
        <span>{short}</span>
        <span>{`${price} USD`}</span>
        <span style={{ color: change > 0 ? 'green' : 'red' }}>
          {priceChange}
        </span>
      </div>
    </div>
  )
}

panel.propTypes = {
  change: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  short: PropTypes.string.isRequired,
  favorite: PropTypes.bool,
  onFav: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  price: PropTypes.number.isRequired,
}

panel.defaultProps = { favorite: false }

export default withRouter(panel)
