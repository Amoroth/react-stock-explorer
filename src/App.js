import React, { Component } from 'react';

import Header from './Header/Header'
import Panel from './Panel'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div>
          <Panel />
          <Panel />
          <Panel />
        </div>
      </div>
    );
  }
}

export default App;
