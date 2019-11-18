/*// test file, run it with react-scripts test --env=jsdom

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})*/

import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'

import App from './App'

describe('<App />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />)
  })
})