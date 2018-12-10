import React from 'react'
import { shallow } from 'enzyme'

import StockPage from './StockPage'

describe('<StockPage />', () => {
  let props
  let wrapper

  beforeEach(() => {
    props = {
      location: { search: '&cmp=COM' },
      favorites: [],
      onFavorite: jest.fn(),
      currency: 'USD',
      currencyFormat: jest.fn((e) => e),
    }
    wrapper = shallow(<StockPage {...props} />)

    wrapper.setState({
      chart: [
        { label: 'a', close: 1 },
        { label: 'b', close: 2 },
        { label: 'c', close: 3 },
      ],
    })
  })

  it('renders', () => {
    wrapper.setState({
      relevant: [
        { companyName: 'Company', symbol: 'COM', close: '2', changePercent: 0.02 },
        { companyName: 'Other', symbol: 'OTH', close: '3', changePercent: 0.03 },
        { companyName: 'Other 2', symbol: 'OT2', close: '4', changePercent: 0.04 },
      ],
    })

    expect(wrapper).toMatchSnapshot()
  })

  it('shows spinner if no chart data', () => {
    wrapper.setState({ chart: [] })
    expect(wrapper.find('.spinner-container').exists()).toBe(true)
    expect(wrapper.find('stockChart').exists()).toBe(false)
  })

  it('shows chart if chart data exists', () => {
    expect(wrapper.find('.spinner-container').exists()).toBe(false)
    expect(wrapper.find('stockChart').exists()).toBe(true)
  })

  it('shows p with sector if sector exists', () => {
    wrapper.setState({ book: { sector: 'Supreme' } })

    expect(wrapper.find('p').text()).toBe('Sector: Supreme')
  })

  it('shows p with relevant if no sector', () => {
    expect(wrapper.find('p').text()).toBe('Relevant:')
  })

  it('shows relevant items', () => {
    expect(wrapper.find('relevantPanel').length).toBe(0)

    wrapper.setState({
      relevant: [
        { companyName: 'Company', symbol: 'COM', close: '2', changePercent: 0.02 },
        { companyName: 'Other', symbol: 'OTH', close: '3', changePercent: 0.03 },
        { companyName: 'Other 2', symbol: 'OT2', close: '4', changePercent: 0.04 },
      ],
    })

    expect(wrapper.find('relevantPanel').length).toBe(3)
  })

  it('renders all book info', () => {
    expect(wrapper.find('.book-info span').length).toBe(20)
  })

  it('formats book info item', () => {
    wrapper.setState({ book: { close: 2, latestPrice: 3 } })

    expect(wrapper.find('.book-info span').at(0).text()).toBe('Close:')
    expect(wrapper.find('.book-info span').at(1).text()).toBe('2 USD')
    expect(wrapper.find('.book-info span').at(2).text()).toBe('Latest Price:')
    expect(wrapper.find('.book-info span').at(3).text()).toBe('3 USD')
  })

  it('changes chart time', () => {
    const mockFn = jest.fn()
    wrapper.instance().onSelectCharttime = mockFn

    wrapper.find('.charttime-button').last().simulate('click')
    expect(mockFn).toBeCalledWith('2y')
  })
})
