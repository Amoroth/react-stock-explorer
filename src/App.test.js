import React from 'react'
import { mount, shallow } from 'enzyme'
import * as rrd from 'react-router-dom'

import App from './App'
import Header from './Header/Header'
import Stocks from './Stocks/Stocks'
import StockPage from './StockPage/StockPage'
import CompanyPage from './CompanyPage/CompanyPage'

// eslint-disable-next-line react/prop-types
rrd.BrowserRouter = ({ children }) => <div>{children}</div>

describe('<app />', () => {
  it('renders without crashing', () => {
    const wrapper = mount(
      <rrd.MemoryRouter initialEntries={[{ pathname: '/market', key: 'testkey' }]}>
        <App />
      </rrd.MemoryRouter>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('renders "/market" route', () => {
    const wrapper = mount(
      <rrd.MemoryRouter initialEntries={[{ pathname: '/market', key: 'testkey' }]}>
        <App />
      </rrd.MemoryRouter>,
    )
    expect(wrapper.find(Stocks).exists()).toBe(true)
  })

  it('redirects from "/" to "/stocks"', () => {
    const wrapper = mount(
      <rrd.MemoryRouter initialEntries={[{ pathname: '/', key: 'testkey' }]}>
        <App />
      </rrd.MemoryRouter>,
    )
    expect(wrapper.find(Stocks).exists()).toBe(true)
  })

  it('renders "/stock" route', () => {
    const wrapper = mount(
      <rrd.MemoryRouter initialEntries={[{ pathname: '/stock', key: 'testkey' }]}>
        <App />
      </rrd.MemoryRouter>,
    )
    expect(wrapper.find(StockPage).exists()).toBe(true)
  })

  it('renders "/company" route', () => {
    const wrapper = mount(
      <rrd.MemoryRouter initialEntries={[{ pathname: '/company', key: 'testkey' }]}>
        <App />
      </rrd.MemoryRouter>,
    )
    expect(wrapper.find(CompanyPage).exists()).toBe(true)
  })

  it('renders header component', () => {
    const wrapper = mount(
      <rrd.MemoryRouter initialEntries={['/']}>
        <App />
      </rrd.MemoryRouter>,
    )
    expect(wrapper.find(Header).exists()).toBe(true)
  })

  it('correctly calls onFavorite', () => {
    const wrapper = shallow(<App />, { disableLifecycleMethods: true })

    wrapper.instance().onFavorite({ stopPropagation: jest.fn() }, 'SYMB')
    expect(wrapper.state('favorites')).toContain('SYMB')

    wrapper.instance().onFavorite({ stopPropagation: jest.fn() }, 'SYMB')
    expect(wrapper.state('favorites')).toHaveLength(0)
  })

  it('correctly changes currency', () => {
    const wrapper = shallow(<App />, { disableLifecycleMethods: true })

    wrapper.instance().onCurrencyChange('EUR')
    expect(wrapper.state('currency')).toBe('EUR')
  })

  it('correctly formats number', () => {
    const wrapper = shallow(<App />, { disableLifecycleMethods: true })
    wrapper.setState({ currencyRates: { USD: 1, EUR: 2, GBP: 3 } })

    expect(wrapper.instance().currencyFormat(10)).toBe('10.00')
    expect(wrapper.instance().currencyFormat(5000000)).toBe('5.00 mln')
    expect(wrapper.instance().currencyFormat(5000000000)).toBe('5.00 mld')

    wrapper.setState({ currency: 'EUR' })
    expect(wrapper.instance().currencyFormat(5000000)).toBe('10.00 mln')
  })

  it('correctly reads from localStorage', () => {
    localStorage.setItem('stock-explorer_favorites', ['LOL', 'OMG', 'ZTM'])
    localStorage.setItem('stock-explorer_currency', 'PLN')
    const wrapper = shallow(<App />)

    expect(wrapper.state('favorites')).toContain('LOL', 'OMG', 'ZTM')
    expect(wrapper.state('currency')).toBe('PLN')
  })
})
