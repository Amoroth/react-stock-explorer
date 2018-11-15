import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import Header from './Header/Header'
import Stocks from './Stocks/Stocks'

class App extends Component {
  render() {
    let router = (
      <Switch>
        <Route path="/" exact component={Stocks} />
        <Route path="/*" render={() => <h1>Something else</h1>} />
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
