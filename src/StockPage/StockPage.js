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
    book: {
      symbol: '',
      companyName: '',
      primaryExchange: '',
      sector: '',
      open: 0,
      openTime: 0,
      close: 0,
      closeTime: 0,
      high: 0,
      low: 0,
      previousClose: 0,
      change: 0,
      week52High: 0,
      week52Low: 0
    },
    chart: [],
    chartTime: 0
  }

  componentDidMount() {
    const cmp = new URLSearchParams(this.props.location.search.slice(1)).get('cmp')
    this.updateBook(cmp)
    this.updateChart(cmp, '1m')
  }

  componentDidUpdate() {
    const cmp = new URLSearchParams(this.props.location.search.slice(1)).get('cmp')
    if (cmp !== this.state.book.symbol) {
      this.updateBook(cmp)
    }
  }

  updateBook = (cmp) => {
    fetch(`https://api.iextrading.com/1.0/stock/${cmp}/quote?filter=symbol,companyName,primaryExchange,sector,open,close,high,low,previousClose,change,week52High,week52Low,latestUpdate,marketCap,peRatio`)
      .then((res) => {
        return res.json()
      }).then((json) => {
        this.setState({
          book: json
        })
      })
  }

  updateChart = (symbol, time) => {
    fetch(`https://api.iextrading.com/1.0/stock/${symbol}/chart/${time}?filter=date,close,label`).then((res) => {
      return res.json()
    }).then((json) => {
      let timeNum = ['1m', '3m', '6m', '1y', '2y'].indexOf(time)
      this.setState({
        chart: json,
        chartTime: timeNum
      })
    })
  }

  onSelectCharttime = (time) => {
    this.setState({
      chart: []
    })
    this.updateChart(this.state.book.symbol, time)
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
              <h6>{ this.state.book.companyName }</h6>
              <span>{this.state.book.primaryExchange}: { this.state.book.symbol }</span>
            </div>
            <button onClick={() => this.props.history.push('/')}>
              <i className="material-icons md-48">arrow_back</i>
            </button>
          </div>
          <hr />
          <div>
            <div className={styles['charttime-container']}>
              <button className={`${styles['charttime-button']} ${this.state.chartTime === 0 ? styles['charttime-button-active'] : null}`} onClick={() => this.onSelectCharttime('1m')}>1m</button>
              <button className={`${styles['charttime-button']} ${this.state.chartTime === 1 ? styles['charttime-button-active'] : null}`} onClick={() => this.onSelectCharttime('3m')}>3m</button>
              <button className={`${styles['charttime-button']} ${this.state.chartTime === 2 ? styles['charttime-button-active'] : null}`} onClick={() => this.onSelectCharttime('6m')}>6m</button>
              <button className={`${styles['charttime-button']} ${this.state.chartTime === 3 ? styles['charttime-button-active'] : null}`} onClick={() => this.onSelectCharttime('1y')}>1y</button>
              <button className={`${styles['charttime-button']} ${this.state.chartTime === 4 ? styles['charttime-button-active'] : null}`} onClick={() => this.onSelectCharttime('2y')}>2y</button>
            </div>
            { chartEl }
            <div className={styles['book-info']}>
                <span>Open:</span> <span>{this.state.book.open} USD</span>
                <span>Prev. Close:</span> <span>{this.state.book.previousClose} USD</span>
                <span>Max:</span> <span>{this.state.book.high} USD</span>
                <span>Highest/52 weeks:</span> <span>{this.state.book.week52High} USD</span>
                <span>Min:</span> <span>{this.state.book.low} USD</span>
                <span>Lowest/52 weeks</span> <span>{this.state.book.week52Low} USD</span>
                <span>Market Cap</span> <span>{(this.state.book.marketCap / 1000000000).toFixed(2)} mld USD</span>
                <span>P/E Ratio</span> <span>{this.state.book.peRatio} USD</span>
            </div>
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