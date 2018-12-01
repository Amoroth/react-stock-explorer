import React from 'react'

import Panel from './Panel'
import Spinner from '../shared/Spinner'
import styles from './Stocks.module.css'

class Stocks extends React.Component {
  state = { stocks: [] }

  componentDidMount() {
    fetch('https://api.iextrading.com/1.0/stock/market/list/infocus')
      .then((res) => res.json())
      .then((json) => {
        this.setState({ stocks: json })
      })

    this.loadFavorites()
  }

  loadFavorites = () => {
    console.log('loading favorites')

    // fetch('https://api.iextrading.com/1.0/stock/market/batch?types=previous&symbols=aapl,msft,googl')
  }

  onFavorite = (event, symbol) => {
    event.stopPropagation()

    console.log('added to favorites', symbol)

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
    const { stocks } = this.state

    const stocksElements = stocks.map((val) => (
      <Panel
        title={val.companyName}
        short={val.symbol}
        price={val.close}
        change={val.changePercent}
        // favorite={val.favorite}
        key={val.symbol}
        onFav={this.onFavorite}
      />
    ))

    return (
      <div className={styles.container}>
        <div />
        {stocks.length < 1 ? <Spinner /> : stocksElements}
      </div>
    )
  }
}

export default Stocks
