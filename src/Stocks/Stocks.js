import React from 'react'
import { css } from 'emotion'

import Panel from '../Panel'

class Stocks extends React.Component {
  render() {
    return (
      <div className={style}>
        {this.props.children}
        <Panel />
        <Panel />
        <Panel />
      </div>
    )
  }
}

const style = css({
  display: 'flex',
  margin: 'auto',
  flexWrap: 'wrap',
  width: '60%',
  '@media screen and (max-width: 620px)': {
    width: '100%'
  }
})

export default Stocks