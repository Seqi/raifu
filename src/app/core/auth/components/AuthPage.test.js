import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { mount } from 'enzyme'

import AuthPage from './AuthPage'

import auth from '../../../firebase/auth'

let component

jest.mock('../../../firebase/auth')

beforeEach(() => {
	// Silence the basename warning
	window.history.pushState({}, 'Login', '/login')
	component = (
		<MemoryRouter>
			<AuthPage history={ ['/login'] } />
		</MemoryRouter>
	)
})

it('navigates to application if user is logged in', () => {
	let wrapper = mount(component)

	auth.__changeAuth({ user: true })

	let history = wrapper.find(AuthPage)
		.prop('history')

	expect(history.length)
		.toBe(2)
	expect(history[1])
		.toBe('/app')
})
