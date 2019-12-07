import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { mount } from 'enzyme'

import auth from '../../../../firebase/auth'

import SignupPage from './SignupPage'
import AuthError from '../AuthError'

let component

jest.mock('../../../../firebase/auth')

beforeEach(() => {
	component = (
		<MemoryRouter>
			<SignupPage />
		</MemoryRouter>
	)
})

afterEach(() => {
	auth.signup.withEmail.mockClear()
})

it('renders without crashing', () => {
	mount(component)
})

it('does not display an error by default', () => {
	let wrapper = mount(component)

	expect(wrapper.find(AuthError).length)
		.toBe(0)
})

it('calls sign up when form is submitted', () => {
	let wrapper = mount(component)

	let emailEl = wrapper.findWhere((node) => node.name() === 'TextField' && node.prop('id') === 'email')
	let passwordEl = wrapper.findWhere((node) => node.name() === 'TextField' && node.prop('id') === 'password')

	emailEl.props()
		.onChange({ target: { id: 'email', value: 'test' } })

	passwordEl.props()
		.onChange({ target: { id: 'password', value: 'pass' } })

	wrapper.find('form')
		.simulate('submit')

	expect(auth.signup.withEmail.mock.calls.length)
		.toBe(1)

	expect(auth.signup.withEmail.mock.calls[0][0])
		.toBe('test')

	expect(auth.signup.withEmail.mock.calls[0][1])
		.toBe('pass')

	expect(wrapper.find(AuthError).length)
		.toBe(0)
})

it('displays an error when sign up fails', () => {
	let wrapper = mount(component)

	let emailEl = wrapper.findWhere((node) => node.name() === 'TextField' && node.prop('id') === 'email')
	let passwordEl = wrapper.findWhere((node) => node.name() === 'TextField' && node.prop('id') === 'password')

	// Mock is designed to throw if this value is detected
	emailEl.props()
		.onChange({ target: { id: 'email', value: 'fail' } })

	passwordEl.props()
		.onChange({ target: { id: 'password', value: 'pass' } })

	wrapper.find('form')
		.simulate('submit')

	expect(auth.signup.withEmail.mock.calls.length)
		.toBe(1)

	expect(auth.signup.withEmail.mock.calls[0][0])
		.toBe('fail')

	expect(auth.signup.withEmail.mock.calls[0][1])
		.toBe('pass')

	// Wait for the current event loop to finish, which should wait
	// for setState to finish, so we can safely update the component and assert
	process.nextTick(() => {
		expect(wrapper.update()
			.find(AuthError).length)
			.toBe(1)
	})
})
