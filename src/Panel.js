import React from 'react'
import { css } from 'emotion'

const panel = (props) => {
  let priceChange = `${props.change > 0 ? '+' : ''}${(props.change * 100).toFixed(2)}%`
  let stockName = props.title
  if (stockName.length > 30)
  stockName = stockName.slice(0, 30) + '...'
  return (
    <div className={style}>
      <h6 className={titleStyle} title={ stockName[stockName.length - 2] === '.' ? props.title : null }>{ stockName }
      </h6>
      <div>
        <span>{ props.short }</span>
        <span>{ props.price }</span>
        {/* <span>Something?</span> */}
        <span 
          style={{color: props.change > 0 ? 'green' : 'red'}}>
          { priceChange }
        </span>
      </div>
    </div>
  )
}

const style = css({
  backgroundColor: '#fff',
  borderRadius: '5px',
  boxShadow: '2px 4px 10px rgba(0,0,0,.0125)',
  fontSize: '15px',
  margin: '4px 4px 4px 4px',
  maxWidth: '720px',
  padding: '16px',
  transition: 'box-shadow .1s ease-in-out',
  width: '48%',
  'div': {
    display: 'flex',
    justifyContent: 'space-between'
  },
  '&:hover': {
    boxShadow: '2px 4px 10px rgba(0,0,0,.1)',
  },
  '@media screen and (max-width: 800px)': {
    width: '60%',
    maxWidth: '97%'
  },
  '@media screen and (max-width: 620px)': {
    width: '100%',
    maxWidth: '97%'
  },
})

const titleStyle = css({
  fontSize: '21px',
  fontWeight: 'bold',
  margin: '0 0 10px 0',
})

const shortStyle = css({
  fontSize: '15px',
  fontWeight: 'normal',
  marginLeft: '8px',
})

export default panel