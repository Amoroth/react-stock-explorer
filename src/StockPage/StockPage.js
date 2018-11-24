import React, { Component } from 'react'

import StockChart from './StockChart'
import Spinner from '../shared/Spinner'
import styles from './StockPage.module.css'

class StockPage extends Component {
  state = {
    name: 'International Business Machines Corporation',
    short: '',
    price: 159.51,
    change: 0.0241,
    chart: [{
      "date": "2018-10-22",
      "close": 219.8828,
      "label": "Oct 22"
      },
      {
      "date": "2018-10-23",
      "close": 221.9556,
      "label": "Oct 23"
      },
      {
      "date": "2018-10-24",
      "close": 214.3421,
      "label": "Oct 24"
      },
      {
      "date": "2018-10-25",
      "close": 219.0358,
      "label": "Oct 25"
      }]
  }

  componentDidMount() {
    const cmp = new URLSearchParams(this.props.location.search.slice(1)).get('cmp')
    // fetch(`https://api.iextrading.com/1.0/stock/${cmp}/chart?filter=date,close,label`).then((res) => {
    //   return res.json()
    // }).then((json) => {
    //   this.setState({
    //     chart: json,
    //     short: cmp
    //   })
    // })
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

  onSelectCharttime = (time) => {
    this.setState({
      chart: []
    })
    fetch(`https://api.iextrading.com/1.0/stock/${this.state.short}/chart/${time}?filter=date,close,label`).then((res) => {
      return res.json()
    }).then((json) => {
      this.setState({
        chart: json
      })
    })
  }

  render() {
    let chartEl = (
      <div className={styles['spinner-container']}>
        <Spinner />
      </div>
    )
    if (this.state.chart.length > 0) {
      chartEl = <StockChart data={this.state.chart} />
    }

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
            <div className={styles['charttime-container']}>
              <button className={styles['charttime-button']} onClick={() => this.onSelectCharttime('1m')}>1m</button>
              <button className={styles['charttime-button']} onClick={() => this.onSelectCharttime('3m')}>3m</button>
              <button className={styles['charttime-button']} onClick={() => this.onSelectCharttime('6m')}>6m</button>
              <button className={styles['charttime-button']} onClick={() => this.onSelectCharttime('1y')}>1y</button>
              <button className={styles['charttime-button']} onClick={() => this.onSelectCharttime('2y')}>2y</button>
            </div>
            { chartEl }
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