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
      searchResults: false,
      searchBox: false
    }
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.setState({ symbols: [
      {name: 'Alphabet Inc.', symbol: 'googl'},
      {name: 'Microsoft Corporation', symbol: 'msft'},
      {name: 'International Buissnes Machines Corporation', symbol: 'ibm'},
      {name: 'Twitter Inc.', symbol: 'twtr'}
    ],
    searchBox: window.innerWidth > 800 })
  }

  handleChange = (e) => {
    this.setState({ input: e.target.value })
  }

  onClickFill = (term) => {
    this.setState({ input: term })
  }

  showSearchResults = () => {
    this.setState({ searchResults: true })
  }

  hideSearchResults = () => {
    setTimeout(() => this.setState({ searchResults: false, searchBox: window.innerWidth > 800 }), 100)
  }

  showSearchBox = () => {
    this.setState({ searchBox: true }, () => {
      this.inputRef.current.focus()
    })
  }

  render() {
    const filteredCmps = this.state.symbols.filter(createFilter(this.state.input, ['name', 'symbol']))
    return (
      <div style={{display: 'inline'}}>
        {this.state.searchBox ? 
        <input
          className={styles['search-box']}
          onChange={this.handleChange}
          value={this.state.input}
          onFocus={this.showSearchResults}
          onBlur={this.hideSearchResults}
          ref={this.inputRef} /> : 
        <button onClick={this.showSearchBox} className={styles['search-box-icon']}>
          <i className="material-icons">search</i>
        </button>}

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