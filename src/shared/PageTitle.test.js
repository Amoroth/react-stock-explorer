import React from 'react'
import { shallow } from 'enzyme'

import PageTitle from './PageTitle'

describe('<PageTitle />', () => {
  let props
  let wrapper

  beforeEach(() => {
    props = {
      logo: 'https://placekitten.com/g/56/56',
      name: 'Company',
      link: false,
      symbol: 'COM',
      exchange: 'PRI',
      history: { push: jest.fn(), goBack: jest.fn() },
      favorite: false,
      onFav: jest.fn(),
    }
    wrapper = shallow(<PageTitle.WrappedComponent {...props} />)
  })

  it('renders', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('renders title without link prop', () => {
    expect(wrapper.find('h6').exists()).toBe(true)
    expect(wrapper.find('Link').exists()).toBe(false)
    expect(wrapper.find('h6').text()).toBe(props.name)
  })

  it('renders link with link prop', () => {
    wrapper.setProps({ link: true })

    expect(wrapper.find('h6').exists()).toBe(false)
    expect(wrapper.find('Link').exists()).toBe(true)
    expect(wrapper.find('Link').children().first().text()).toBe(props.name)
  })

  it('renders symbol and exchange', () => {
    expect(wrapper.find('span').text()).toBe(`${props.exchange}: ${props.symbol}`)
  })

  it('sets up logo', () => {
    expect(wrapper.find('img').prop('src')).toBe(props.logo)
    expect(wrapper.find('img').prop('alt')).toBe(`${props.name}'s logo`)
  })

  it('shows spinner if no logo', () => {
    wrapper.setProps({ logo: null })

    expect(wrapper.find('smallSpinner').exists()).toBe(true)
    expect(wrapper.find('img').exists()).toBe(false)
  })

  it('sets favorite', () => {
    wrapper.find('.favorite-button').simulate('click')
    expect(props.onFav).toBeCalled()
    expect(props.onFav.mock.calls[0][1]).toBe(props.symbol)
  })

  it('changes logo if favorite', () => {
    let button = wrapper.find('.favorite-button').children().first()
    expect(button.text()).toBe('favorite_border')
    wrapper.setProps({ favorite: true })
    button = wrapper.find('.favorite-button').children().first()
    expect(button.text()).toBe('favorite')
    expect(button.prop('style')).toEqual({ color: 'red' })
  })

  it('back button sends to market if link prop', () => {
    wrapper.setProps({ link: true })
    wrapper.find('.back-button').simulate('click')
    expect(props.history.push).toBeCalledWith('/market')
  })

  it('back button sends to previous if no link prop', () => {
    wrapper.find('.back-button').simulate('click')
    expect(props.history.goBack).toBeCalled()
  })
})
