import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import numberFormater from './shared/utils'
import Header from './Header/Header'
import Stocks from './Stocks/Stocks'
import StockPage from './StockPage/StockPage'
import CompanyPage from './CompanyPage/CompanyPage'

class App extends Component {
  state = { favorites: [], currency: 'USD', currencyRates: {} }

  componentDidMount() {
    const favorites = localStorage.getItem('stock-explorer_favorites')
    this.setState({ favorites: favorites ? favorites.split(',') : [] })
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

  getExchangeRates = () => {
    const { currencyRates } = this.state
    if (Object.keys(currencyRates).length > 1) {
      return
    }
    fetch('https://api.exchangeratesapi.io/latest?base=USD&symbols=GBP,PLN,EUR')
      .then((res) => res.json())
      .then((json) => {
        const exchangeRates = Object.assign({}, json.rates)
        exchangeRates.USD = 1

        this.setState({ currencyRates: exchangeRates })
      })
  }

  currencyFormat = (number) => {
    const { currency, currencyRates } = this.state
    this.getExchangeRates()

    let newNumber = number
    if (currency !== 'USD') {
      newNumber = number * currencyRates[currency]
    }
    return numberFormater(newNumber)
  }

  onCurrencyChange = (newCurrency) => {
    this.setState({ currency: newCurrency })
  }

  render() {
    const { favorites, currency } = this.state

    const router = (
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/market" />} />
        <Route
          path="/market"
          exact
          render={(props) => (
            <Stocks
              {...props}
              favorites={favorites}
              onFavorite={this.onFavorite}
              currency={currency}
              currencyFormat={this.currencyFormat}
            />
          )}
        />
        <Route
          path="/stock"
          exact
          render={(props) => (
            <StockPage
              {...props}
              favorites={favorites}
              onFavorite={this.onFavorite}
              currency={currency}
              currencyFormat={this.currencyFormat}
            />
          )}
        />
        <Route
          path="/company"
          exact
          render={(props) => (
            <CompanyPage
              {...props}
              favorites={favorites}
              onFavorite={this.onFavorite}
              currency={currency}
              currencyFormat={this.currencyFormat}
            />
          )}
        />
        <Route render={() => <h1>404</h1>} />
      </Switch>
    )

    return (
      <div className="App">
        <Header currencyChange={this.onCurrencyChange} currency={currency} />
        {router}
      </div>
    )
  }
}

export default App
