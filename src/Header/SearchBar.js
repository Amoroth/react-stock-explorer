import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
    this.inputRef = React.createRef()
  }

  componentDidMount() {
    fetch('https://api.iextrading.com/1.0/ref-data/symbols?filter=symbol,name')
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          symbols: json,
          searchBoxInput: window.innerWidth > 800,
        })
      })
    this.setState({
      symbols: [
        { name: 'Alphabet Inc.', symbol: 'googl' },
        { name: 'Microsoft Corporation', symbol: 'msft' },
        { name: 'International Buissnes Machines Corporation', symbol: 'ibm' },
        { name: 'Twitter Inc.', symbol: 'twtr' },
      ],
      searchBoxInput: window.innerWidth > 800,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { input } = this.state
    if (input !== prevState.input) {
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
    setTimeout(() => {
      this.setState({
        searchResults: false,
        searchBoxInput: window.innerWidth > 800,
      })
    }, 100)
  }

  showSearchBoxInput = () => {
    this.setState({ searchBoxInput: true }, () => {
      this.inputRef.current.focus()
    })
  }

  onKeyPressHandler = (e, symbols) => {
    const { inputCursor } = this.state
    const { history } = this.props

    if (inputCursor > Math.min(3, symbols.length - 1)) {
      this.setState({ inputCursor: Math.min(3, symbols.length - 1) })
    }
    if (e.keyCode === 38 && inputCursor > 0) {
      this.setState((prevState) => {
        const newInputCursor = (prevState.inputCursor || 0) - 1
        return { inputCursor: newInputCursor }
      })
    } else if (
      e.keyCode === 40
      && inputCursor < Math.min(3, symbols.length - 1)
    ) {
      this.setState((prevState) => ({
        inputCursor:
          prevState.inputCursor === null ? 0 : prevState.inputCursor + 1,
      }))
    } else if (e.keyCode === 13) {
      this.inputRef.current.blur()
      this.onClickFill(symbols[inputCursor].name)
      history.push(`stock?cmp=${symbols[inputCursor].symbol}`)
    }
  }

  render() {
    const {
      symbols,
      input,
      inputCursor,
      searchBoxInput,
      searchResults,
    } = this.state

    const filteredCmps = symbols.filter(createFilter(input, ['name', 'symbol']))

    return (
      <div style={{ display: 'inline' }}>
        {searchBoxInput ? (
          <input
            className={styles['search-box']}
            onChange={this.handleChange}
            value={input}
            onFocus={this.showSearchResults}
            onBlur={this.hideSearchResults}
            onKeyUp={(e) => this.onKeyPressHandler(e, filteredCmps)}
            ref={this.inputRef}
          />
        ) : (
          <button
            onClick={this.showSearchBoxInput}
            className={styles['search-box-icon']}
            type="button"
          >
            <i className="material-icons">search</i>
          </button>
        )}

        <div className={styles['search-box-results']}>
          {searchResults
            ? filteredCmps.slice(0, 4).map((cmp, idx) => (
              <Link
                className={`${styles['search-box-result']} ${
                  inputCursor === idx
                    ? styles['search-box-result-active']
                    : null
                }`}
                key={cmp.symbol}
                onClick={() => this.onClickFill(cmp.name)}
                to={`stock?cmp=${cmp.symbol}`}
              >
                {cmp.name}
                <span>{cmp.symbol}</span>
              </Link>
            ))
            : null}
        </div>
        {searchResults && window.innerWidth < 800 ? <Overlay /> : null}
      </div>
    )
  }
}

SearchBar.propTypes = { history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired }

export default withRouter(SearchBar)
