import React from 'react'
import { shallow } from 'enzyme'

import CompanyPage from './CompanyPage'

describe('<CompanyPage />', () => {
  let props
  let wrapper

  beforeEach(() => {
    props = {
      location: { search: '&cmp=COM' },
      favorites: [],
      onFavorite: jest.fn(),
      currency: 'USD',
      currencyFormat: jest.fn(),
    }
    wrapper = shallow(<CompanyPage {...props} />)
  })

  it('renders', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('fetches on mount', () => {
    expect(fetch).toBeCalledWith('https://api.iextrading.com/1.0/stock/COM/batch?types=company,logo,financials')
  })

  it('renders page title', () => {
    expect(wrapper.find('withRouter(pageTitle)').exists()).toBe(true)
  })

  it('renders CEO, Industry and website', () => {
    wrapper.setState({
      company: {
        CEO: 'Guy',
        industry: 'Space',
        website: 'ehh',
      },
    })

    const spans = wrapper.find('.company-info-row').children()
    expect(spans.length).toBe(3)
    expect(spans.at(0).text()).toBe('CEO: Guy')
    expect(spans.at(1).text()).toBe('Industry: Space')
    expect(spans.at(2).children().first().type()).toBe('a')
    expect(spans.at(2).children().first().prop('href')).toBe('ehh')
  })

  it('chenges time of finances', () => {
    wrapper.setState({ financials: [{ reportDate: '08.12.2018' }, { reportDate: '09.12.2018' }] })

    wrapper.find('.fintime-button').at(1).simulate('click')
    expect(wrapper.state('finTime')).toBe(1)
  })

  it('chegest fintime button class on active', () => {
    wrapper.setState({ financials: [{ reportDate: '08.12.2018' }, { reportDate: '09.12.2018' }] })

    expect(wrapper.find('.fintime-button').at(0).prop('className')).toBe('fintime-button fintime-button-active')
    expect(wrapper.find('.fintime-button').at(1).prop('className')).toBe('fintime-button null')
    wrapper.find('.fintime-button').at(1).simulate('click')
    expect(wrapper.find('.fintime-button').at(0).prop('className')).toBe('fintime-button null')
    expect(wrapper.find('.fintime-button').at(1).prop('className')).toBe('fintime-button fintime-button-active')
  })

  it('renders financial details', () => {
    wrapper.setState({ financials: [{ reportDate: '08.12.2018', a: 1, b: 2, c: null }] })

    expect(wrapper.find('.fin-info').children().length).toBe(6) // No report date
    expect(wrapper.find('.fin-info').children().last().text()).toBe('-')
    expect(props.currencyFormat.mock.calls.length).toBe(2) // not called on empty values
  })
})
