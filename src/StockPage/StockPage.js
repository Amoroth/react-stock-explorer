import React, { Component } from 'react'

import styles from './StockPage.module.css'

class StockPage extends Component {
  state = {
    name: '',
    short: '',
    price: 0,
    change: 0
  }

  componentDidMount() {
    const comp = new URLSearchParams(this.props.location.search.slice(1)).get('comp')
    this.setState(() => {
      return {name: comp}
    })
  }

  render() {
    return (
      (
        <div className={styles['container']}>
          <div className={styles['title-bar']}>
            <h6>{ this.state.name }</h6>
            <button onClick={this.props.history.goBack}>
              <i class="material-icons">arrow_back</i>
            </button>
          </div>
          <div>

          </div>
        </div>
      )
    )
  }
}

export default StockPage