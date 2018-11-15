import React from 'react'

import styles from './Stocks.module.css'

const panel = (props) => {
  let priceChange = `${props.change > 0 ? '+' : ''}${(props.change * 100).toFixed(2)}%`
  let stockName = props.title
  if (stockName.length > 30)
  stockName = stockName.slice(0, 30) + '...'
  return (
    <div className={styles['panel']}>
      <h6 
        className={styles['panel-title']} 
        title={ stockName[stockName.length - 2] === '.' ? props.title : null }>
        { stockName }
      </h6>
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

export default panel