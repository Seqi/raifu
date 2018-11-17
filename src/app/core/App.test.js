import React from 'react'
import { mount } from 'enzyme'

import App from './App'
import Main from './layout/Main'
import AuthPage from './auth/AuthPage'

jest.mock('../../firebase/auth')
jest.mock('../../firebase/database')

it('renders without crashing', () => {
	mount(<App />)
})

it('defaults to auth page', () => {
	let component = mount(<App />)

	expect(component.find(AuthPage).length)
		.toBe(1)

	expect(component.find(Main).length)
		.toBe(0)
})
