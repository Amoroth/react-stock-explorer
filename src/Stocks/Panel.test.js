import React from 'react'
import Enzyme, { shallow } from 'enzyme'

import Panel from './Panel'

const wrapper = shallow(<Panel title={''} short={''} price={0} change={0} />)
const stockProps = {
  title: 'first',
  short: 'st',
  price: 123.45,
  change: 0.0012
}
wrapper.setProps(stockProps)

describe('<Panel />', () => {
  test('renders all elements', () => {
    expect(wrapper.find('h6').text()).toBe(stockProps.title)
    expect(wrapper.find('span').at(0).text()).toBe(stockProps.short)
    expect(wrapper.find('span').at(1).text()).toBe(stockProps.price + ' USD')
    expect(wrapper.find('span').at(2).exists()).toBe(true)
  })
  test('renders concat title', () => {
    const newTitle = 'This is a loong title omg when is it gonna sthaap!!!'
    wrapper.setProps({title: newTitle})
    expect(wrapper.find('h6').text()).toBe(newTitle.slice(0, 30) + '...')
  })
  test('correctly calculates change', () => {
    expect(wrapper.find('span').at(2).text()).toBe('+0.12%')
  })
  test('color is applied to percentage change el', () => {
    expect(wrapper.find('span').at(2).prop('style')).toEqual({"color": "green"})
    wrapper.setProps({change: -0.004})
    expect(wrapper.find('span').at(2).prop('style')).toEqual({"color": "red"})
  })
})