import React from 'react'

import Panel from './Panel'
import CircularButton from '../shared/CircularButton'
import Spinner from '../shared/Spinner'
import styles from './Stocks.module.css'

class Stocks extends React.Component {
  state = {
    stocks: [],
    favorites: [],
    market: 'infocus',
  }

  componentDidMount() {
    const favorites = localStorage.getItem('stock-explorer_favorites')
    if (!favorites) {
      this.setState({
        stocks: [],
        market: 'favorites',
      })
      return
    }
    const { market } = this.state

    fetch(`https://api.iextrading.com/1.0/stock/market/list/${market}`)
      .then((res) => res.json())
      .then((json) => {
        this.setState({ stocks: json, favorites: favorites.split(',') })
      })
  }

  onMarketChange = (newMarket) => {
    const { market } = this.state
    if (market === newMarket) {
      return
    }
    if (newMarket === 'favorites') {
      this.loadFavorites()
      return
    }
    // filter does not work
    fetch(`https://api.iextrading.com/1.0/stock/market/list/${newMarket}`)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          stocks: json,
          market: newMarket,
        })
      })
  }

  loadFavorites = () => {
    const favorites = localStorage.getItem('stock-explorer_favorites')
    if (!favorites) {
      this.setState({
        stocks: [],
        market: 'favorites',
      })
      return
    }
    fetch(`https://api.iextrading.com/1.0/stock/market/batch?types=quote&symbols=${favorites}&filter=companyName,symbol,close,changePercent`)
      .then((res) => res.json())
      .then((json) => {
        const newStocks = Object.keys(json).map((val) => json[val].quote)
        this.setState({
          stocks: newStocks,
          market: 'favorites',
          favorites: favorites.split(','),
        })
      })
  }

  onFavorite = (event, symbol) => {
    event.stopPropagation()
    const { favorites } = this.state

    if (!favorites.includes(symbol)) {
      const newFavorites = [...favorites, symbol]
      this.setState({ favorites: newFavorites }, () => localStorage.setItem('stock-explorer_favorites', newFavorites))
    } else {
      const newFavorites = favorites.filter((val) => val !== symbol)
      this.setState({ favorites: newFavorites }, () => localStorage.setItem('stock-explorer_favorites', newFavorites))
    }
  }

  render() {
    const { stocks, favorites, market } = this.state

    let stockElements = <Spinner />
    if (stocks.length > 0) {
      stockElements = stocks.map((val) => (
        <Panel
          title={val.companyName}
          short={val.symbol}
          price={val.close}
          change={val.changePercent}
          favorite={favorites.includes(val.symbol)}
          key={val.symbol}
          onFav={this.onFavorite}
        />
      ))
    } else if (market === 'favorites') {
      stockElements = <h4 className={styles['no-favorites']}>No Favorites! Add some by pressing the heart button</h4>
    }

    const markets = ['In Focus', 'Favorites', 'Gainers', 'Losers']
    const marketButtons = markets.map((val) => {
      const linkname = val.replace(' ', '').toLowerCase()
      return (
        <CircularButton
          func={() => this.onMarketChange(linkname)}
          key={linkname}
        >
          {val}
        </CircularButton>
      )
    })

    return (
      <div className={styles.container}>
        <div className={styles['markets-container']}>
          {marketButtons}
        </div>
        <div className={styles['stocks-container']}>
          {stockElements}
        </div>
      </div>
    )
  }
}

export default Stocks
