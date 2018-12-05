import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Draggable from 'react-draggable'

import PageTitle from '../shared/PageTitle'
import StockChart from './StockChart'
import Spinner from '../shared/Spinner'
import RelevantPanel from './RelevantPanel'
import styles from './StockPage.module.css'

class StockPage extends Component {
  state = {
    book: {
      symbol: '',
      companyName: '',
      primaryExchange: '',
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
    this.updateChart(cmp)
  }

  onRelevantSelect = (symbol) => {
    this.setState({
      chart: [],
      book: {
        symbol: '',
        companyName: '',
        primaryExchange: '',
      },
      relevant: [],
      logo: '',
    })
    window.scrollTo(0, 0)

    this.updateChart(symbol)
    this.updateBook(symbol)
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

  updateChart = (symbol, time = '1m') => {
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
    const { favorites, onFavorite, currency, currencyFormat } = this.props

    const charttimeButtonElements = ['1m', '3m', '6m', '1y', '2y'].map(
      (val, ind) => (
        <button
          type="button"
          className={`${styles['charttime-button']} ${
            chartTime === ind ? styles['charttime-button-active'] : null
          }`}
          onClick={() => this.onSelectCharttime(val)}
          key={val}
        >
          {val}
        </button>
      ),
    )

    let bookInfoElements = null
    if (Object.keys(book).length > 1) {
      const newBook = (({
        close,
        latestPrice,
        changePercent,
        change,
        high,
        week52High,
        low,
        week52Low,
        marketCap,
        peRatio,
      }) => ({
        close,
        latestPrice,
        changePercent,
        change,
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
        const formatedNumber = key === 'changePercent'
          ? `${newBook[key] > 0 ? '+' : ''}${(newBook[key] * 100).toFixed(2)}%`
          : `${currencyFormat(newBook[key] || 0)} ${currency}`
        return (
          <React.Fragment key={key}>
            <span>
              {`${labelName}:`}
            </span>
            <span>{formatedNumber}</span>
          </React.Fragment>
        )
      })
    }

    let chartEl = (
      <div className={styles['spinner-container']}>
        <Spinner />
      </div>
    )
    if (chart.length > 0) {
      chartEl = (
        <div>
          <div className={styles['charttime-container']}>
            {charttimeButtonElements}
          </div>
          <StockChart data={chart} />
          <div className={styles['book-info']}>{bookInfoElements}</div>
        </div>
      )
    }

    return (
      <div className={styles.container}>
        <PageTitle
          logo={logo}
          name={book.companyName}
          exchange={book.primaryExchange}
          symbol={book.symbol}
          favorite={favorites.includes(book.symbol)}
          onFav={onFavorite}
          link
        />
        <hr />
        {chartEl}
        <hr />
        <div>
          {book.sector ? <p>{`Sector: ${book.sector}`}</p> : <p>Relevant:</p>}
          <div className={styles.relevant}>
            <Draggable
              axis="x"
              defaultPosition={{ x: 0, y: 0 }}
              bounds={{ left: (relevant.length - 3.48) * -220, right: 0 }}
            >
              <div className={styles['relevant-inner']}>
                {relevant.map((val) => (
                  <RelevantPanel
                    name={val.companyName}
                    symbol={val.symbol}
                    close={currencyFormat(val.close)}
                    change={val.changePercent}
                    onSelect={this.onRelevantSelect}
                    key={`rel-${val.symbol}`}
                  />
                ))}
              </div>
            </Draggable>
          </div>
        </div>
      </div>
    )
  }
}

StockPage.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFavorite: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  currencyFormat: PropTypes.func.isRequired,
}

export default StockPage
