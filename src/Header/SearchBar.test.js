import React from 'react'
import { shallow } from 'enzyme'

import SearchBar from './SearchBar'

describe('<SearchBar />', () => {
  let props
  let wrapper

  beforeEach(() => {
    props = { history: { push: jest.fn() } }
    wrapper = shallow(<SearchBar.WrappedComponent {...props} />)
  })

  it('renders', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('fetches search companies', () => {
    expect(fetch).toBeCalledWith('https://api.iextrading.com/1.0/ref-data/symbols?filter=symbol,name')
  })

  it('renders input on desktop', () => {
    window.innerWidth = 1000
    window.dispatchEvent(new Event('resize'))

    expect(wrapper.find('.search-box').exists()).toBe(true)
  })

  it('input shows search results on focus', () => {
    window.innerWidth = 1000
    window.dispatchEvent(new Event('resize'))
    wrapper.setState({ symbols: [{ name: 'Company', symbol: 'Symbol' }] })

    wrapper.find('.search-box').simulate('focus')
    expect(wrapper.state('searchResults')).toBe(true)
    expect(wrapper.find('Link').exists()).toBe(true)
  })

  it('input hides search results on blur', (done) => {
    window.innerWidth = 1000
    window.dispatchEvent(new Event('resize'))
    wrapper.setState({
      searchResults: true,
      symbols: [{ name: 'Company', symbol: 'Symbol' }],
    })

    wrapper.find('.search-box').simulate('blur')
    setTimeout(() => {
      expect(wrapper.state('searchResults')).toBe(false)
      expect(wrapper.find('Link').exists()).toBe(false)
      done()
    }, 200)
  })

  it('input can be controled with keyboard', () => {
    window.innerWidth = 1000
    window.dispatchEvent(new Event('resize'))
    wrapper.setState({
      searchResults: true,
      symbols: [{ name: 'Company', symbol: 'SYM' }, { name: 'Other', symbol: 'OTH' }],
    })

    wrapper.find('.search-box').simulate('keyup', { keyCode: 40 })
    wrapper.find('.search-box').simulate('keyup', { keyCode: 40 })
    wrapper.find('.search-box').simulate('keyup', { keyCode: 40 })
    expect(wrapper.state('inputCursor')).toBe(1)
    wrapper.find('.search-box').simulate('keyup', { keyCode: 38 })
    expect(wrapper.state('inputCursor')).toBe(0)
    wrapper.find('.search-box').simulate('keyup', { keyCode: 38 })
    expect(wrapper.state('inputCursor')).toBe(0)
  })

  it('input can be selected with enter', () => {
    window.innerWidth = 1000
    window.dispatchEvent(new Event('resize'))
    wrapper.setState({
      searchResults: true,
      symbols: [{ name: 'Company', symbol: 'SYM' }, { name: 'Other', symbol: 'OTH' }],
    })
    const blurFn = jest.fn()
    wrapper.instance().inputRef = { current: { blur: blurFn } }

    wrapper.find('.search-box').simulate('keyup', { keyCode: 40 })
    wrapper.find('.search-box').simulate('keyup', { keyCode: 13 })
    expect(blurFn).toBeCalled()
    expect(wrapper.state('input')).toBe('Company')
    expect(props.history.push).toBeCalledWith('stock?cmp=SYM')
  })

  it('search results render at most 4 links', () => {
    wrapper.setState({
      searchResults: true,
      symbols: [
        { name: 'Company', symbol: 'SYM' },
        { name: 'Other', symbol: 'OTH' },
        { name: 'Other2', symbol: 'OT2' },
        { name: 'Other3', symbol: 'OT3' },
        { name: 'Other4', symbol: 'OT4' },
        { name: 'Other5', symbol: 'OT5' },
      ],
    })

    expect(wrapper.find('Link').length).toBe(4)
  })

  it('click on link fills input', () => {
    wrapper.setState({
      searchResults: true,
      symbols: [{ name: 'Company', symbol: 'SYM' }],
    })

    wrapper.find('Link').first().simulate('click')
    expect(wrapper.state('input')).toBe('Company')
  })

  it('showes button on mobile', () => {
    expect(wrapper.find('.search-box').exists()).toBe(false)
    expect(wrapper.find('.search-box-icon').exists()).toBe(true)
  })

  it('search button on mobile showes search-box', () => {
    wrapper.instance().inputRef = { current: { focus: jest.fn() } }

    wrapper.find('.search-box-icon').simulate('click')
    expect(wrapper.state('searchBoxInput')).toBe(true)
  })

  it('search button on mobile focuses on input', () => {
    const focusFn = jest.fn()
    wrapper.instance().inputRef = { current: { focus: focusFn } }

    wrapper.find('.search-box-icon').simulate('click')
    expect(focusFn).toBeCalled()
  })

  it('on resize switches input with button', () => {
    expect(wrapper.find('.search-box-icon').exists()).toBe(true)
    expect(wrapper.find('.search-box').exists()).toBe(false)

    window.innerWidth = 1000
    window.dispatchEvent(new Event('resize'))

    expect(wrapper.find('.search-box-icon').exists()).toBe(false)
    expect(wrapper.find('.search-box').exists()).toBe(true)
  })
})
