import React, { Component } from 'react'

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
        totalDebt: 0
      }
    ],
    finTime: 0
  }

  componentDidMount() {
    const companyQuery = new URLSearchParams(this.props.location.search.slice(1)).get('cmp')
    fetch(`https://api.iextrading.com/1.0/stock/${companyQuery}/batch?types=company,logo,financials`)
      .then((res) => {
        return res.json()
      }).then((json) => {
        this.setState({
          company: json.company,
          logo: json.logo.url,
          financials: json.financials.financials
        })
      })
  }
  
  onSelectFintime = (index) => {
    this.setState({
      finTime: index
    })
  }

  render() {
    let currentReport = {}
    if (this.state.financials) {
      currentReport = Object.assign({}, this.state.financials[this.state.finTime])
      delete currentReport.reportDate
    }

    for (let key in currentReport) {
      if (Math.abs(currentReport[key]) / 1000000000 > 1) {
        currentReport[key] = (Math.abs(currentReport[key]) / 1000000000).toFixed(2) + ' mld'
      } else if (Math.abs(currentReport[key]) / 1000000 > 1) {
        currentReport[key] = (Math.abs(currentReport[key]) / 1000000).toFixed(2) + ' mln'
      }
    }

    let financialsElement = null
    if (this.state.financials) {
      financialsElement = (
        <React.Fragment>
        <hr />
        <div>
          <div className={styles['fintime-container']}>
            {this.state.financials.map((val, ind) => {
              return (
                <button
                  className={`${styles['fintime-button']} ${this.state.finTime === ind ? styles['fintime-button-active'] : null}`}
                  onClick={() => this.onSelectFintime(ind)}
                  key={val.reportDate}
                >
                  { val.reportDate }
                </button>
              )
            })}
          </div>
          <div className={styles['fin-info']}>
            { Object.keys(currentReport).map((val) => {
              let tempName = val.replace(/([A-Z])/g, " $1")
              let labelName = tempName.charAt(0).toUpperCase() + tempName.slice(1)
              return (
                <React.Fragment key={val}>
                  <span>{labelName}</span>
                  <span>{currentReport[val] ? currentReport[val] : '-'}</span>
                </React.Fragment>)
            }) }
          </div>
        </div>
        </React.Fragment>
      )
    }

    return (
      <div className={styles['container']}>
        <PageTitle
          logo={this.state.logo}
          name={this.state.company.companyName}
          exchange={this.state.company.exchange}
          symbol={this.state.company.symbol}
        />
        <hr />
        <div>
          <div className={styles['company-info-row']}>
            <span>CEO: { this.state.company.CEO }</span>
            <span>Industry: { this.state.company.industry }</span>
            <span>
              <a href={this.state.company.website}>Website</a>
            </span>
          </div>
          <p>{this.state.company.description || 'No Description.'}</p>
        </div>
        { financialsElement }
      </div>
    )
  }
}

export default CompanyPage