import React from 'react'
import { shallow } from 'enzyme'

import Panel from './Panel'

describe('<Panel />', () => {
  let props
  let wrapper

  beforeEach(() => {
    props = {
      change: 0.04,
      title: 'Company',
      short: 'COM',
      favorite: false,
      onFav: jest.fn(),
      history: { push: jest.fn() },
      price: '4',
      currency: 'USD',
    }
    wrapper = shallow(<Panel.WrappedComponent {...props} />)
  })

  it('renders', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('formats and styles percentage', () => {
    let percentage = wrapper.find('.panel-details').children().last()

    expect(percentage.text()).toBe('+4.00%')
    expect(percentage.prop('style')).toEqual({ color: 'green' })

    wrapper.setProps({ change: -0.02 })
    percentage = wrapper.find('.panel-details').children().last()

    expect(percentage.text()).toBe('-2.00%')
    expect(percentage.prop('style')).toEqual({ color: 'red' })
  })

  it('opens full page', () => {
    wrapper.simulate('click', { type: 'click' })

    expect(props.history.push).toBeCalledWith(`/stock?cmp=${props.short}`)
  })

  it('opens full page with keyboard', () => {
    wrapper.simulate('keypress', { type: 'keypress', which: 13 })

    expect(props.history.push).toBeCalledWith(`/stock?cmp=${props.short}`)
  })

  it('shortens title', () => {
    expect(wrapper.find('h6').text()).toBe(props.title)

    wrapper.setProps({ title: 'Another company created by Elon Musk' })

    expect(wrapper.find('h6').text()).toBe('Another company created by E...')
  })

  it('h6 has title prop if title is too long', () => {
    expect(wrapper.find('h6').prop('title')).toBe(null)

    const longName = 'Another company created by Elon Musk'
    wrapper.setProps({ title: longName })

    expect(wrapper.find('h6').prop('title')).toBe(longName)
  })

  it('saves company on favorite', () => {
    wrapper.find('.panel-favorite').simulate('click')

    expect(props.onFav).toBeCalled()
    expect(props.onFav.mock.calls[0][1]).toBe(props.short)
  })

  it('styles favorite button', () => {
    expect(wrapper.find('.panel-favorite i').text()).toBe('favorite_border')

    wrapper.setProps({ favorite: true })

    expect(wrapper.find('.panel-favorite i').text()).toBe('favorite')
    expect(wrapper.find('.panel-favorite i').prop('style')).toEqual({ color: 'red' })
  })

  it('sets price to 0 if NaN', () => {
    expect(wrapper.find('.panel-details').childAt(1).text()).toBe('4 USD')

    wrapper.setProps({ price: 'NaN' })

    expect(wrapper.find('.panel-details').childAt(1).text()).toBe('0 USD')
  })
})
