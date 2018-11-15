import React, { Component } from 'react'

import styles from './StockPage.module.css'

class StockPage extends Component {
  state = {
    title: ''
  }

  componentDidMount() {
    const comp = new URLSearchParams(this.props.location.search.slice(1)).get('comp')
    this.setState(() => {
      return {title: comp}
    })
  }

  render() {
    return (
      (
        <div className={styles['container']}>
          <h1>{ this.state.title }</h1>
        </div>
      )
    )
  }
}

export default StockPage