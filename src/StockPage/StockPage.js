import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
      week52High: 0,
      week52Low: 0,
      marketCap: 0,
      peRatio: 0,
    },
    chart: [],
    chartTime: 0,
    relevant: [],
    logo: '',
  }

  componentDidMount() {
    const { location } = this.props
    const cmp = new URLSearchParams(location.search.slice(1)).get('cmp')
    this.updateBook(cmp)
    this.updateChart(cmp, '1m')
  }

  componentDidUpdate() {
    const { location } = this.props
    const { book } = this.state
    const cmp = new URLSearchParams(location.search.slice(1)).get('cmp')
    if (cmp.toLowerCase() !== book.symbol.toLowerCase()) {
      this.updateBook(cmp)
      this.updateChart(cmp, '1m')
    }
  }

  updateBook = (cmp) => {
    fetch(
      `https://api.iextrading.com/1.0/stock/${cmp}/batch?types=quote,relevant,logo`,
    )
      .then((res) => res.json())
      .then((json) => {
        fetch(
          `https://api.iextrading.com/1.0/stock/market/batch?types=quote&symbols=${json.relevant.symbols.join(
            ',',
          )}&filter=companyName,symbol,changePercent,close`,
        )
          .then((response) => response.json())
          .then((endJson) => {
            const relevantCompanies = []

            Object.keys(endJson).forEach((key) => {
              const tempCompany = { ...endJson[key].quote }
              tempCompany.symbol = key
              relevantCompanies.push(tempCompany)
            })

            this.setState({
              book: json.quote,
              relevant: relevantCompanies,
              logo: json.logo.url,
            })
          })
      })
  }

  updateChart = (symbol, time) => {
    fetch(
      `https://api.iextrading.com/1.0/stock/${symbol}/chart/${time}?filter=date,close,label`,
    )
      .then((res) => res.json())
      .then((json) => {
        const timeNum = ['1m', '3m', '6m', '1y', '2y'].indexOf(time)
        this.setState({
          chart: json,
          chartTime: timeNum,
        })
      })
  }

  onSelectCharttime = (time) => {
    const { book } = this.state
    this.setState({ chart: [] })
    this.updateChart(book.symbol, time)
  }

  render() {
    const { chart, logo, book, chartTime, relevant } = this.state

    let chartEl = (
      <div className={styles['spinner-container']}>
        <Spinner />
      </div>
    )
    if (chart.length > 0) {
      chartEl = <StockChart data={chart} />
    }

    const charttimeButtonElements = ['1m', '3m', '6m', '1y', '2y'].map(
      (val, ind) => (
        <button
          type="button"
          className={`${styles['charttime-button']} ${
            chartTime === ind ? styles['charttime-button-active'] : null
          }`}
          onClick={() => this.onSelectCharttime(val)}
        >
          {val}
        </button>
      ),
    )

    let bookInfoElements = null
    if (Object.keys(book).length > 1) {
      const newBook = (({
        open,
        previousClose,
        high,
        week52High,
        low,
        week52Low,
        marketCap,
        peRatio,
      }) => ({
        open,
        previousClose,
        high,
        week52High,
        low,
        week52Low,
        marketCap,
        peRatio,
      }))(book)

      bookInfoElements = Object.keys(newBook).map((key) => {
        const tempName = key.replace(/([A-Z])/g, ' $1')
        const labelName = tempName.charAt(0).toUpperCase() + tempName.slice(1)
        return (
          <React.Fragment>
            <span>
              {`${labelName}:`}
            </span>
            <span>{`${newBook[key]} USD`}</span>
          </React.Fragment>
        )
      })
    }

    return (
      <div className={styles.container}>
        <PageTitle
          logo={logo}
          name={book.companyName}
          exchange={book.primaryExchange}
          symbol={book.symbol}
          link
        />
        <hr />
        <div>
          <div className={styles['charttime-container']}>
            {charttimeButtonElements}
          </div>
          {chartEl}
          <div className={styles['book-info']}>{bookInfoElements}</div>
        </div>
        <hr />
        <div>
          {book.sector ? <p>{`Sector: ${book.sector}`}</p> : <p>Relevant:</p>}
          <div className={styles.relevant}>
            <Draggable
              axis="x"
              defaultPosition={{ x: 0, y: 0 }}
              bounds={{ left: -1010, right: 0 }}
            >
              <div className={styles['relevant-inner']}>
                {relevant.map((val) => {
                  let shortCompanyName = val.companyName
                  const priceChange = `${val.changePercent > 0 ? '+' : ''}${(
                    val.changePercent * 100
                  ).toFixed(2)}%`

                  if (shortCompanyName.length > 14) {
                    shortCompanyName = `${shortCompanyName.slice(0, 12)}...`
                  }
                  return (
                    <div className={styles['relavent-item']} key={val.symbol}>
                      <div
                        className={`${styles['relavent-item-row']} ${
                          styles['relavent-item-title']
                        }`}
                      >
                        <h6
                          title={
                            shortCompanyName[shortCompanyName.length - 2] === '.'
                              ? val.companyName
                              : null
                          }
                        >
                          {shortCompanyName}
                        </h6>
                        <span>{val.symbol}</span>
                      </div>
                      <div
                        className={`${styles['relavent-item-row']} ${
                          styles['relavent-item-info']
                        }`}
                      >
                        <span>{val.close}</span>
                        <span
                          style={{ color: val.changePercent > 0 ? 'green' : 'red' }}
                        >
                          {priceChange}
                        </span>
                        <Link
                          to={`/stock?cmp=${val.symbol}`}
                          onDragStart={(e) => e.preventDefault()}
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          More...
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Draggable>
          </div>
        </div>
      </div>
    )
  }
}

StockPage.propTypes = { location: PropTypes.objectOf(PropTypes.string).isRequired }

export default StockPage
