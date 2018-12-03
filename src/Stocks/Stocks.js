import React from 'react'
import PropTypes from 'prop-types'

import Panel from './Panel'
import CircularButton from '../shared/CircularButton'
import Spinner from '../shared/Spinner'
import styles from './Stocks.module.css'

class Stocks extends React.Component {
  state = {
    stocks: [],
    market: 'infocus',
  }

  componentDidMount() {
    const { market } = this.state

    fetch(`https://api.iextrading.com/1.0/stock/market/list/${market}`)
      .then((res) => res.json())
      .then((json) => {
        this.setState({ stocks: json })
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
    const { favorites } = this.props
    if (favorites.length < 1) {
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
        })
      })
  }

  render() {
    const { stocks, market } = this.state
    const { favorites, onFavorite } = this.props

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
          onFav={onFavorite}
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

Stocks.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFavorite: PropTypes.func.isRequired,
}

export default Stocks
