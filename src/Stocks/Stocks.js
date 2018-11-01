import React from 'react'
import { css } from 'emotion'

import Panel from '../Panel'

class Stocks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stocks: [
        {
          name: 'Alphabet Inc',
          short: 'GOOGL',
          price: 1098.77,
          change: 0.0467
        },
        {
          name: 'Microsoft Corporation',
          short: 'MSFT',
          price: 107.66,
          change: 0.0377
        },
        {
          name: 'International Business Machines Corporation',
          short: 'IBM',
          price: 114.99,
          change: -0.0037
        },
        {
          name: 'Twitter Inc',
          short: 'TWTR',
          price: 34.36,
          change: -0.0112
        },
      ]
    }
  }
  render() {
    const stocks = this.state.stocks.map((val) => {
      return <Panel title={val.name} short={val.short} price={val.price} change={val.change} />
    })
    return (
      <div className={style}>
        {this.props.children}
        {stocks}
      </div>
    )
  }
}

const style = css({
  display: 'flex',
  margin: 'auto',
  flexWrap: 'wrap',
  width: '60%',
  '@media screen and (max-width: 620px)': {
    width: '100%'
  }
})

export default Stocks