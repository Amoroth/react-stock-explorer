import React from 'react'
import { shallow } from 'enzyme'

import Stocks from './Stocks'

describe('<Stocks />', () => {
  let props
  let wrapper

  beforeEach(() => {
    props = {
      favorites: ['OTH', 'ZTM', 'TBC'],
      onFavorite: jest.fn(),
      currency: 'USD',
      currencyFormat: jest.fn(),
    }
    wrapper = shallow(<Stocks {...props} />)

    wrapper.setState({
      stocks: [
        { companyName: 'Company', symbol: 'COM', close: 1, changePercent: 0.01 },
        { companyName: 'Other', symbol: 'OTH', close: 2, changePercent: 0.02 },
        { companyName: 'Other 3', symbol: 'OTH 3', close: 3, changePercent: 0.03 },
        { companyName: 'Other 4', symbol: 'OTH 4', close: 4, changePercent: 0.04 },
      ],
    })
  })

  it('renders', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('loads other market', () => {
    const lastButton = wrapper.find('.markets-container').childAt(3)
    const linkname = lastButton.childAt(0).text().toLowerCase()
    lastButton.prop('func')()

    expect(fetch.mock.calls[fetch.mock.calls.length - 1][0]).toBe(`https://api.iextrading.com/1.0/stock/market/list/${linkname}`)
  })

  it('loads favorites', () => {
    const favButton = wrapper.find('.markets-container').childAt(1)
    const favFn = jest.fn()
    wrapper.instance().loadFavorites = favFn
    favButton.prop('func')()
    wrapper.setState({
      stocks: [
        { companyName: 'Some car company', symbol: 'ZTM', close: 1, changePercent: 0.01 },
        { companyName: 'The Burning', symbol: 'TBC', close: 2, changePercent: 0.02 },
        { companyName: 'Other', symbol: 'OTH', close: 3, changePercent: 0.03 },
      ],
      market: 'favorites',
    })

    expect(favFn).toBeCalled()
    expect(wrapper.find('.stocks-container').children().length).toBe(3)
  })

  it('shows spinner if no stocks', () => {
    expect(wrapper.find('withRouter(panel)').exists()).toBe(true)
    expect(wrapper.find('spinner').exists()).toBe(false)

    wrapper.setState({ stocks: [] })

    expect(wrapper.find('withRouter(panel)').exists()).toBe(false)
    expect(wrapper.find('spinner').exists()).toBe(true)
  })
})
