import React from 'react'
import { shallow } from 'enzyme'

import Stocks from './Stocks'

const wrapper = shallow(<Stocks />)
const stocksState = {
  stocks: [
    {
      name: 'first',
      short: 'st',
      price: 15.5,
      change: 0.0001,
    },
    {
      name: 'second',
      short: 'nd',
      price: 105.5,
      change: -0.403,
    },
  ],
}
wrapper.setState(stocksState)

describe('<Stocks />', () => {
  test('renders a list of panels', () => {
    expect(wrapper.find('panel')).toHaveLength(2)
  })
  test('panels have right props passed', () => {
    expect(
      wrapper
        .find('panel')
        .first()
        .prop('title'),
    ).toBe(stocksState.stocks[0].name)
    expect(
      wrapper
        .find('panel')
        .first()
        .prop('short'),
    ).toBe(stocksState.stocks[0].short)
    expect(
      wrapper
        .find('panel')
        .first()
        .prop('price'),
    ).toBe(stocksState.stocks[0].price)
    expect(
      wrapper
        .find('panel')
        .first()
        .prop('change'),
    ).toBe(stocksState.stocks[0].change)
  })
})
