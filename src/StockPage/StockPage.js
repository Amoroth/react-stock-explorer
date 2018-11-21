import React, { Component } from 'react'

import StockChart from './StockChart'
import styles from './StockPage.module.css'

class StockPage extends Component {
  state = {
    name: 'International Business Machines Corporation',
    short: '',
    price: 159.51,
    change: 0.0241,
    chart: [
      {quarter: 1, earnings: 13000, label: 'hi'},
      {quarter: 2, earnings: 16500, label: 'hi'},
      {quarter: 3, earnings: 14250, label: 'hi'},
      {quarter: 4, earnings: 19000, label: 'hi'},
    ]
  }

  componentDidMount() {
    const cmp = new URLSearchParams(this.props.location.search.slice(1)).get('cmp')
    this.setState(() => {
      return {short: cmp}
    })
  }

  componentDidUpdate() {
    const cmp = new URLSearchParams(this.props.location.search.slice(1)).get('cmp')
    if (cmp !== this.state.short) {
      this.setState(() => {
        return {short: cmp}
      })
    }
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
            <button onClick={() => this.props.history.push('/')}>
              <i className="material-icons md-48">arrow_back</i>
            </button>
          </div>
          <hr />
          <div>
            <StockChart data={this.state.chart} />
            <p>Otwarcie | Maks. | Min. | Kapitalizacja | Wskaźnik C/Z</p>
            <p>Dywidenda | Poprz. zam. | Najw./52 tyg. | Najn./52 tyg.</p>
          </div>
          <hr />
          <div>
            <p>Sektor</p>
            <p>Powiazane firmy</p>
          </div>
          <hr />
          <div>
            <p>Informacje Finansowe (osobne okno?)</p>
            <p>O firmie (osobne okno?)</p>
          </div>
        </div>
      )
    )
  }
}

export default StockPage