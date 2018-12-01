import React from 'react'
import { shallow } from 'enzyme'

import Header from './Header'

const wrapper = shallow(<Header />)

describe('<Header />', () => {
  test('renders nav element', () => {
    expect(wrapper.find('nav').exists()).toBe(true)
  })
  test('renders title', () => {
    expect(wrapper.find('h6').exists()).toBe(true)
  })
  test('renders nav links', () => {
    expect(wrapper.find('a')).toHaveLength(2)
  })
})
