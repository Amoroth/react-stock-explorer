import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Header from './Header/Header'
import Stocks from './Stocks/Stocks'
import StockPage from './StockPage/StockPage'
import CompanyPage from './CompanyPage/CompanyPage'

class App extends Component {
  state = { favorites: [] }

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

  render() {
    const { favorites } = this.state

    const router = (
      <Switch>
        <Route path="/" exact render={() => <Stocks favorites={favorites} onFavorite={this.onFavorite} />} />
        <Route path="/stock" exact component={StockPage} />
        <Route path="/company" exact component={CompanyPage} />
        <Route render={() => <h1>404</h1>} />
      </Switch>
    )

    return (
      <div className="App">
        <Header />
        {router}
      </div>
    )
  }
}

export default App
