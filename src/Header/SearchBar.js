import React, { Component } from 'react'
import { createFilter } from 'react-search-input'
import { Link } from 'react-router-dom'

import styles from './Header.module.css'

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      symbols: [],
      searchResults: false
    }
  }

  componentDidMount() {
    this.setState({ symbols: [
      {name: 'Alphabet Inc.', symbol: 'googl'},
      {name: 'Microsoft Corporation', symbol: 'msft'},
      {name: 'International Buissnes Machines Corporation', symbol: 'ibm'},
      {name: 'Twitter Inc.', symbol: 'twtr'}
    ] })
  }

  handleChange = (e) => {
    this.setState({ input: e.target.value })
  }

  onClickFill = (term) => {
    this.setState({ input: term })
  }

  showSearchBox = () => {
    this.setState({ searchResults: true })
  }

  hideSearchBox = () => {
    setTimeout(() => this.setState({ searchResults: false }), 100)
  }

  render() {
    const filteredCmps = this.state.symbols.filter(createFilter(this.state.input, ['name', 'symbol']))
    return (
      <div style={{display: 'inline'}}>
        {/* <SearchInput onChange={this.handleChange} ref={this.inputRef} /> */}
        <input
          className={styles['search-box']}
          onChange={this.handleChange}
          value={this.state.input}
          onFocus={this.showSearchBox}
          onBlur={this.hideSearchBox} />
        <div className={styles['search-box-results']}>
        {this.state.searchResults ? filteredCmps.slice(0, 4).map(cmp => {
          return (
            <Link
              className={styles['search-box-result']}
              key={cmp.symbol}
              onClick={() => this.onClickFill(cmp.name)}
              to={`stock?cmp=${cmp.symbol}`}>
              {cmp.name}
              <span>{cmp.symbol}</span>
            </Link>
          )
        }) : null}
        </div>
      </div>
    )
  }
}

export default SearchBar