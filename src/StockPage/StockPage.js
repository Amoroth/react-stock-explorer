import React, { Component } from 'react'

import styles from './StockPage.module.css'

class StockPage extends Component {
  state = {
    name: 'International Business Machines Corporation',
    short: '',
    price: 159.51,
    change: 0.0241
  }

  componentDidMount() {
    const comp = new URLSearchParams(this.props.location.search.slice(1)).get('comp')
    this.setState(() => {
      return {short: comp}
    })
  }

  render() {
    return (
      (
        <div className={styles['container']}>
          <div className={styles['title-bar']}>
            <div>
              <h6>{ this.state.name }</h6>
              <span>Nasdaq Global Select: { this.state.short }</span>
            </div>
            <button onClick={this.props.history.goBack}>
              <i className="material-icons md-48">arrow_back</i>
            </button>
          </div>
          <hr />
          <div>

          </div>
        </div>
      )
    )
  }
}

export default StockPage