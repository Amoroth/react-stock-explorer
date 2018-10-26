import React from 'react'

import Panel from '../Panel'

class Stocks extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
        <Panel />
        <Panel />
        <Panel />
      </div>
    )
  }
}

export default Stocks