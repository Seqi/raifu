import React from 'react'
import { mount } from 'enzyme'

import App from './App'
import Main from './layout/Main'
import AuthPage from './auth/AuthPage'

it('renders and defaults to login page', () => {
	let component = mount(<App />)

	expect(component.find(Main).length)
		.toBe(0)

	expect(component.find(AuthPage).length)
		.toBe(1)
})
