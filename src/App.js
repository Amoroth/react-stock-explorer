import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import Header from './Header/Header'
import Stocks from './Stocks/Stocks'
import StockPage from './StockPage/StockPage'

class App extends Component {
  render() {
    let router = (
      <Switch>
        <Route path="/" exact component={Stocks} />
        <Route path="/stock" exact component={StockPage} />
        <Route render={() => <h1>404</h1>} />
      </Switch>
    )

    return (
      <div className="App">
        <Header />
        {router}
      </div>
    );
  }
}

export default App;
