import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { mount } from 'enzyme'

import auth from '../../../../firebase/auth'
import AuthError from 'app/core/auth/AuthError'
import LoginPage from './LoginPage'

let component

jest.mock('../../../../firebase/auth')

beforeEach(() => {
	component = (
		<MemoryRouter>
			<LoginPage />
		</MemoryRouter>
	)
})

afterEach(() => {
	auth.__triggerErrorOnLogin(false)
	auth.login.withTwitter.mockClear()
	auth.login.withGoogle.mockClear()
	auth.login.withEmail.mockClear()
})

it('renders without crashing', () => {
	mount(component)
})

it('authenticates with twitter when twitter icon clicked', () => {
	let wrapper = mount(component)

	wrapper
		.findWhere((node) => node.name() === 'IconButton' && node.prop('id') === 'twitter-icon')
		.props()
		.onClick()

	expect(auth.login.withTwitter.mock.calls.length)
		.toBe(1)

	process.nextTick(() => {
		expect(wrapper.update()
			.find(AuthError).length)
			.toBe(0)
	})
})

it('displays error when twitter login fails', () => {
	let wrapper = mount(component)

	auth.__triggerErrorOnLogin(true)

	wrapper
		.findWhere((node) => node.name() === 'IconButton' && node.prop('id') === 'twitter-icon')
		.props()
		.onClick()

	process.nextTick(() => {
		expect(wrapper.update()
			.find(AuthError).length)
			.toBe(1)
	})
})

it('authenticates with google when google icon clicked', () => {
	let wrapper = mount(component)

	wrapper
		.findWhere((node) => node.name() === 'IconButton' && node.prop('id') === 'google-icon')
		.props()
		.onClick()

	expect(auth.login.withGoogle.mock.calls.length)
		.toBe(1)

	process.nextTick(() => {
		expect(wrapper.update()
			.find(AuthError).length)
			.toBe(0)
	})
})

it('displays error when google login fails', () => {
	let wrapper = mount(component)

	auth.__triggerErrorOnLogin(true)

	wrapper
		.findWhere((node) => node.name() === 'IconButton' && node.prop('id') === 'google-icon')
		.props()
		.onClick()

	process.nextTick(() => {
		expect(wrapper.update()
			.find(AuthError).length)
			.toBe(1)
	})
})

it('authenticates with email and password when login is clicked', () => {
	let wrapper = mount(component)

	wrapper
		.findWhere((node) => node.name() === 'TextField' && node.prop('id') === 'email')
		.props()
		.onChange({ target: { id: 'email', value: 'test' } })

	wrapper
		.findWhere((node) => node.name() === 'TextField' && node.prop('id') === 'password')
		.props()
		.onChange({ target: { id: 'password', value: 'pass' } })

	wrapper.find('form')
		.simulate('submit')

	expect(auth.login.withEmail.mock.calls.length)
		.toBe(1)

	expect(auth.login.withEmail.mock.calls[0][0])
		.toBe('test')
	expect(auth.login.withEmail.mock.calls[0][1])
		.toBe('pass')

	process.nextTick(() => {
		expect(wrapper.update()
			.find(AuthError).length)
			.toBe(0)
	})
})

it('displays error when email login fails', () => {
	let wrapper = mount(component)

	auth.__triggerErrorOnLogin(true)

	wrapper.find('form')
		.simulate('submit')

	process.nextTick(() => {
		expect(wrapper.update()
			.find(AuthError).length)
			.toBe(1)
	})
})
