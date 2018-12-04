import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Header from './Header/Header'
import Stocks from './Stocks/Stocks'
import StockPage from './StockPage/StockPage'
import CompanyPage from './CompanyPage/CompanyPage'

class App extends Component {
  state = { favorites: [], currency: 'USD' }

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
