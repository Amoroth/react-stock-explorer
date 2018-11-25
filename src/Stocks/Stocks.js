import React from 'react'

import Panel from './Panel'
import styles from './Stocks.module.css'

class Stocks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stocks: [
        {
          companyName: 'Alphabet Inc',
          symbol: 'GOOGL',
          close: 1098.77,
          change: 0.0467,
          favorite: false
        },
        {
          companyName: 'Microsoft Corporation',
          symbol: 'MSFT',
          close: 107.66,
          change: 0.0377,
          favorite: false
        },
        {
          companyName: 'International Business Machines Corporation',
          symbol: 'IBM',
          close: 114.99,
          change: -0.0037,
          favorite: false
        },
        {
          companyName: 'Twitter Inc',
          symbol: 'TWTR',
          close: 34.36,
          change: -0.0112,
          favorite: false
        },
      ]
    }
  }

  componentDidMount() {
    fetch('https://api.iextrading.com/1.0/stock/market/list/infocus').then((res) => {
      return res.json()
    }).then((json) => {
      this.setState({
        stocks: json
      })
    })

    this.loadFavorites()
  }

  loadFavorites = () => {
    console.log('loading favorites')
  }

  onFavorite = (event, symbol) => {
    event.stopPropagation()

    console.log('added to favorites')

    // let newStocks = this.state.stocks.slice()
    // newStocks.forEach(element => {
    //   if (element.short === symbol)
    //     element.favorite = !element.favorite
    // })
    // this.setState({
    //   stocks: newStocks
    // }, () => {
    //   localStorage.setItem('stock-explorer_favorites', this.state.stocks.reduce((arr, val) => {
    //     if (val.favorite)
    //       arr.push(val.symbol)
    //     return arr
    //   }, []))
    // })
  }

  render() {
    const stocks = this.state.stocks.map((val) => {
      return <Panel 
        title={val.companyName} 
        short={val.symbol} 
        price={val.close} 
        change={val.changePercent} 
        // favorite={val.favorite}
        key={val.symbol}
        onFav={this.onFavorite}
      />
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