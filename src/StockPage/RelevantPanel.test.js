import React from 'react'
import { shallow } from 'enzyme'

import RelevantPanel from './RelevantPanel'

describe('<RelevantPanel />', () => {
  let props
  let wrapper

  beforeEach(() => {
    props = {
      name: 'Company',
      change: 0.04,
      symbol: 'COM',
      close: '4 USD',
      onSelect: jest.fn(),
    }
    wrapper = shallow(<RelevantPanel {...props} />)
  })

  it('renders', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('sends to new company from link', () => {
    wrapper.find('Link').simulate('click')
    
    expect(props.onSelect).toBeCalled()
  })

  it('formats and styles percentage', () => {
    expect(wrapper.find('.relavent-item-info span').last().text()).toBe('+4.00%')
    expect(wrapper.find('.relavent-item-info span').last().prop('style')).toEqual({ color: 'green' })

    wrapper.setProps({ change: -0.06 })

    expect(wrapper.find('.relavent-item-info span').last().text()).toBe('-6.00%')
    expect(wrapper.find('.relavent-item-info span').last().prop('style')).toEqual({ color: 'red' })
  })

  it('shortens title if too long', () => {
    wrapper.setProps({ name: 'Company with really long name' })

    expect(wrapper.find('h6').text()).toBe('Company with...')
  })

  it('does not set title if title is short', () => {
    expect(wrapper.find('h6').prop('title')).toBe(null)
  })

  it('sets title if title is too long', () => {
    const longName = 'Company with really long name'
    wrapper.setProps({ name: longName })

    expect(wrapper.find('h6').prop('title')).toBe(longName)
  })
})
