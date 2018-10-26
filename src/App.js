import React, { Component } from 'react';

import Header from './Header/Header'
import Stocks from './Stocks/Stocks'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Stocks>
        </Stocks>
      </div>
    );
  }
}

export default App;
