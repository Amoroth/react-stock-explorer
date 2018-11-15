import React from 'react'

import Panel from './Panel'
import styles from './Stocks.module.css'

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
      return <Panel title={val.name} short={val.short} price={val.price} change={val.change} key={val.short} />
    })
    return (
      <div className={styles['container']}>
        {this.props.children}
        {stocks}
      </div>
    )
  }
}

export default Stocks