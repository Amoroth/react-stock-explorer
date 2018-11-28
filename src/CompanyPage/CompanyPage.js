import React, { Component } from 'react'

import PageTitle from '../shared/PageTitle'
import styles from './CompanyPage.module.css'

class CompanyPage extends Component {
  state = {
    company: {
      companyName: 'Netflix Inc.',
      symbol: 'NFLX',
      exchange: 'Nasdaq Global Select',
      industry: '',
      website: '',
      description: '',
      CEO: '',
    },
    logo: 'https://storage.googleapis.com/iex/api/logos/NFLX.png',
    financials: [
      {
        reportDate: '',
        grossProfit: 0
      }
    ]
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

  render() {
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
            <span>
              <a href={this.state.company.website}>Website</a>
            </span>
          </div>
          <p>{this.state.company.description || 'No Description.'}</p>
        </div>
        <hr />
        <div>
          <p>Company Finances</p>
        </div>
      </div>
    )
  }
}

export default CompanyPage