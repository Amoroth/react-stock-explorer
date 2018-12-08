import React from 'react'
import { shallow } from 'enzyme'

import Header from './Header'

describe('<Header />', () => {
  let props = {}
  let wrapper

  describe('desktop', () => {
    beforeEach(() => {
      props = {
        location: { pathname: '/market' },
        history: { goBack: jest.fn(), push: jest.fn() },
        currencyChange: jest.fn(),
        currency: 'USD',
      }
      wrapper = shallow(<Header.WrappedComponent {...props} />)
    })

    it('renders correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('renders brand as a Link', () => {
      expect(wrapper.find('Link').exists()).toBe(true)
      expect(wrapper.find('Link').props().to).toBe('/market')
    })

    it('renders dropdown', () => {
      expect(wrapper.find('Dropdown').exists()).toBe(true)
    })

    it('changes currency', () => {
      wrapper.find('Dropdown').simulate('change', { value: 'EUR' })
      expect(props.currencyChange).toBeCalledWith('EUR')
    })
  })

  describe('mobile', () => {
    beforeEach(() => {
      props = {
        location: { pathname: '/market' },
        history: { goBack: jest.fn(), push: jest.fn() },
        currencyChange: jest.fn(),
        currency: 'USD',
      }
      window.innerWidth = 400
      wrapper = shallow(<Header.WrappedComponent {...props} />)
    })

    it('renders brand on mobile', () => {
      expect(wrapper.find('h6').text()).toBe('SE!')
    })

    it('goes back from stock page', () => {
      wrapper.setProps({ location: { pathname: '/stock' } })

      wrapper.find('.expand-button').simulate('click')
      expect(props.history.goBack).not.toBeCalled()
      expect(props.history.push).toBeCalledWith('/market')
    })

    it('goes back from company page', () => {
      wrapper.setProps({ location: { pathname: '/company' } })

      wrapper.find('.expand-button').simulate('click')
      expect(props.history.goBack).toBeCalled()
      expect(props.history.push).not.toBeCalled()
    })
  })
})
