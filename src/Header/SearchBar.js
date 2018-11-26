import React, { Component } from 'react'
import { createFilter } from 'react-search-input'
import { Link, withRouter } from 'react-router-dom'

import Overlay from '../shared/Overlay'
import styles from './Header.module.css'

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      symbols: [],
      searchResults: false,
      searchBoxInput: false,
      inputCursor: null,
    }
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    fetch('https://api.iextrading.com/1.0/ref-data/symbols?filter=symbol,name').then((res) => {
      return res.json()
    }).then((json) => {
      this.setState({ symbols: json, searchBoxInput: window.innerWidth > 800 })
    })
    this.setState({ symbols: [
      {name: 'Alphabet Inc.', symbol: 'googl'},
      {name: 'Microsoft Corporation', symbol: 'msft'},
      {name: 'International Buissnes Machines Corporation', symbol: 'ibm'},
      {name: 'Twitter Inc.', symbol: 'twtr'}
    ],
    searchBoxInput: window.innerWidth > 800 })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.input !== prevState.input) {
      return true
    }
    return false
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
    setTimeout(() => this.setState({ searchResults: false, searchBoxInput: window.innerWidth > 800 }), 100)
  }

  showSearchBoxInput = () => {
    this.setState({ searchBoxInput: true }, () => {
      this.inputRef.current.focus()
    })
  }

  onKeyPressHandler = (e, symbols) => {
    if (this.state.inputCursor > Math.min(3, symbols.length - 1)) {
      this.setState({
        inputCursor: Math.min(3, symbols.length - 1)
      })
    }
    if (e.keyCode === 38 && this.state.inputCursor > 0) {
      this.setState((prevState) => ({
        inputCursor: (prevState.inputCursor || 0) - 1
      }))
    } else if (e.keyCode === 40 && this.state.inputCursor < Math.min(3, symbols.length - 1)) {
      this.setState((prevState) => ({
        inputCursor: prevState.inputCursor === null ? 0 : prevState.inputCursor + 1
      }))
    } else if (e.keyCode === 13) {
      this.inputRef.current.blur()
      this.onClickFill(symbols[this.state.inputCursor].name)
      this.props.history.push(`stock?cmp=${symbols[this.state.inputCursor].symbol}`)
    }
  }

  render() {
    const filteredCmps = this.state.symbols.filter(
      createFilter(this.state.input, ['name', 'symbol'])
    )

    return (
      <div style={{display: 'inline'}}>
        {this.state.searchBoxInput ? 
        <input
          className={styles['search-box']}
          onChange={this.handleChange}
          value={this.state.input}
          onFocus={this.showSearchResults}
          onBlur={this.hideSearchResults}
          onKeyUp={(e) => this.onKeyPressHandler(e, filteredCmps)}
          ref={this.inputRef}
        /> : 
        <button onClick={this.showSearchBoxInput} className={styles['search-box-icon']}>
          <i className="material-icons">search</i>
        </button>}

        <div className={styles['search-box-results']}>
          {this.state.searchResults ? filteredCmps.slice(0, 4).map((cmp, idx) => {
            return (
              <Link
                className={`${styles['search-box-result']} ${this.state.inputCursor === idx ? styles['search-box-result-active'] : null}`}
                key={cmp.symbol}
                onClick={() => this.onClickFill(cmp.name)}
                to={`stock?cmp=${cmp.symbol}`}
              >
                {cmp.name}
                <span>{cmp.symbol}</span>
              </Link>
            )}) : null}
        </div>
        {this.state.searchResults && window.innerWidth < 800 ? <Overlay /> : null}
      </div>
    )
  }
}

export default withRouter(SearchBar)