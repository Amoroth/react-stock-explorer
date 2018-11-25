import React from 'react'
import { withRouter } from 'react-router-dom'

import styles from './Stocks.module.css'

const panel = (props) => {
  let priceChange = `${props.change > 0 ? '+' : ''}${(props.change * 100).toFixed(2)}%`
  let stockName = props.title
  if (stockName.length > 30)
    stockName = stockName.slice(0, 28) + '...'

  const openFullPage = () => {
    props.history.push(`/stock?cmp=${props.short}`)
  }

  return (
    <div className={styles['panel']} onClick={openFullPage}>
      <div className={styles['panel-upper']}>
        <h6 
          className={styles['panel-title']} 
          title={ stockName[stockName.length - 2] === '.' ? props.title : null }>
          { stockName }
        </h6>
        <button className={styles['panel-favorite']} onClick={(e) => props.onFav(e, props.short)}>
          { props.favorite ? 
            <i className={'material-icons'} style={{color: 'red'}}>favorite</i> : 
            <i className={'material-icons'}>favorite_border</i> }
        </button>
      </div>
      <div className={styles['panel-details']}>
        <span>{ props.short }</span>
        <span>{ props.price } USD</span>
        <span style={{color: props.change > 0 ? 'green' : 'red'}}>
          { priceChange }
        </span>
      </div>
    </div>
  )
}

export default withRouter(panel)