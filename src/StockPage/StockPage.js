import React, { Component } from 'react'
import Draggable from 'react-draggable'
import { Link } from 'react-router-dom'

import PageTitle from '../shared/PageTitle'
import StockChart from './StockChart'
import Spinner from '../shared/Spinner'
import styles from './StockPage.module.css'

class StockPage extends Component {
  state = {
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
    chartTime: 0,
    relevant: [],
    logo: ''
  }

  componentDidMount() {
    const cmp = new URLSearchParams(this.props.location.search.slice(1)).get('cmp')
    this.updateBook(cmp)
    this.updateChart(cmp, '1m')
  }

  componentDidUpdate() {
    const cmp = new URLSearchParams(this.props.location.search.slice(1)).get('cmp')
    if (cmp.toLowerCase() !== this.state.book.symbol.toLowerCase()) {
      this.updateBook(cmp)
      this.updateChart(cmp, '1m')
    }
  }

  updateBook = (cmp) => {
    fetch(`https://api.iextrading.com/1.0/stock/${cmp}/batch?types=quote,relevant,logo`)
      .then((res) => {
        return res.json()
      }).then((json) => {
        fetch(`https://api.iextrading.com/1.0/stock/market/batch?types=quote&symbols=${json.relevant.symbols.join(',')}&filter=companyName,symbol,changePercent,close`)
          .then((response) => {
            return response.json()
          }).then((endJson) => {
            let relevantCompanies = []
            for (let key in endJson) {
              let tempCompany = {...endJson[key].quote}
              tempCompany.symbol = key
              relevantCompanies.push(tempCompany)
            }
            this.setState({
              book: json.quote,
              relevant: relevantCompanies,
              logo: json.logo.url
            })
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
          <PageTitle
            logo={this.state.logo}
            name={this.state.book.companyName}
            exchange={this.state.book.primaryExchange}
            symbol={this.state.book.symbol}
            link
          />
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
            {this.state.book.sector ? <p>Sector: {this.state.book.sector}</p> : <p>Relevant:</p>}
            <div className={styles['relevant']}>
              <Draggable
                axis="x"
                defaultPosition={{x: 0, y: 0}}
                bounds={{left: -1010, right: 0}}
              >
                <div className={styles['relevant-inner']}>
                  {this.state.relevant.map((val) => {
                    let shortCompanyName = val.companyName
                    let priceChange = `${val.changePercent > 0 ? '+' : ''}${(val.changePercent * 100).toFixed(2)}%`

                    if (shortCompanyName.length > 14)
                      shortCompanyName = shortCompanyName.slice(0, 12) + '...'
                    return (
                      <div className={styles['relavent-item']} key={val.symbol}>
                        <div className={`${styles['relavent-item-row']} ${styles['relavent-item-title']}`}>
                          <h6 title={ shortCompanyName[shortCompanyName.length - 2] === '.' ? val.companyName : null }>{shortCompanyName}</h6>
                          <span>{val.symbol}</span>
                        </div>
                        <div className={`${styles['relavent-item-row']} ${styles['relavent-item-info']}`}>
                          <span>{val.close}</span>
                          <span style={{color: val.changePercent > 0 ? 'green' : 'red'}}>
                            { priceChange }
                          </span>
                          <Link
                            to={`/stock?cmp=${val.symbol}`}
                            onDragStart={(e) => e.preventDefault()}
                            onClick={() => window.scrollTo(0, 0)}
                          >More...</Link>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Draggable>
            </div>
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