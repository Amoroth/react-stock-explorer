import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PageTitle from '../shared/PageTitle'
import styles from './CompanyPage.module.css'

class CompanyPage extends Component {
  state = {
    company: {
      companyName: '',
      symbol: '',
      exchange: '',
      industry: '',
      website: '',
      description: '',
      CEO: '',
    },
    logo: '',
    financials: [
      {
        reportDate: '',
        grossProfit: 0,
        totalRevenue: 0,
        netIncome: 0,
        researchAndDevelopment: 0,
        totalAssets: 0,
        totalDebt: 0,
      },
    ],
    finTime: 0,
  }

  componentDidMount() {
    const { location } = this.props
    const companyQuery = new URLSearchParams(location.search.slice(1)).get(
      'cmp',
    )
    fetch(
      `https://api.iextrading.com/1.0/stock/${companyQuery}/batch?types=company,logo,financials`,
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          company: json.company,
          logo: json.logo.url,
          financials: json.financials.financials,
        })
      })
  }

  onSelectFintime = (index) => {
    this.setState({ finTime: index })
  }

  render() {
    const { financials, finTime, logo, company } = this.state
    const { favorites, onFavorite, currency, currencyFormat } = this.props

    let currentReport = {}
    if (financials) {
      currentReport = Object.assign({}, financials[finTime])
      delete currentReport.reportDate
    }

    let financialsElement = null
    if (financials) {
      financialsElement = (
        <React.Fragment>
          <hr />
          <div>
            <div className={styles['fintime-container']}>
              {financials.map((val, ind) => (
                <button
                  className={`${styles['fintime-button']} ${
                    finTime === ind ? styles['fintime-button-active'] : null
                  }`}
                  type="button"
                  onClick={() => this.onSelectFintime(ind)}
                  key={val.reportDate}
                >
                  {val.reportDate}
                </button>
              ))}
            </div>
            <div className={styles['fin-info']}>
              {Object.keys(currentReport).map((val) => {
                const tempName = val.replace(/([A-Z])/g, ' $1')
                const labelName = tempName.charAt(0).toUpperCase() + tempName.slice(1)
                return (
                  <React.Fragment key={val}>
                    <span>{labelName}</span>
                    <span>{currentReport[val] ? `${currencyFormat(currentReport[val])} ${currency}` : '-'}</span>
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        </React.Fragment>
      )
    }

    return (
      <div className={styles.container}>
        <PageTitle
          logo={logo}
          name={company.companyName}
          exchange={company.exchange}
          symbol={company.symbol}
          favorite={favorites.includes(company.symbol)}
          onFav={onFavorite}
        />
        <hr />
        <div>
          <div className={styles['company-info-row']}>
            <span>
              {`CEO: ${company.CEO}`}
            </span>
            <span>
              {`Industry: ${company.industry}`}
            </span>
            <span>
              <a href={company.website}>Website</a>
            </span>
          </div>
          <p>{company.description || 'No Description.'}</p>
        </div>
        {financialsElement}
      </div>
    )
  }
}

CompanyPage.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFavorite: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  currencyFormat: PropTypes.func.isRequired,
}

export default CompanyPage
