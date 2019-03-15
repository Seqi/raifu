import React from 'react'
import { shallow } from 'enzyme'

import { Button } from '@material-ui/core'

import LoginForm from './LoginForm'

let submitMock
let component

beforeEach(() => {
	submitMock = jest.fn()
	component = <LoginForm onSubmit={ submitMock } />
})

it('renders without crashing', () => {
	shallow(component)
})

it('should have a disabled login button in initial state', () => {
	let wrapper = shallow(component)

	expect(wrapper.find(Button)
		.prop('disabled'))
		.toBe(true)
})

it('should have a disabled login button if just the email is populated', () => {
	let wrapper = shallow(component)

	let emailEl = wrapper.findWhere((n) => n.name() === 'TextField' && n.prop('id') === 'email')

	emailEl.props()
		.onChange({ target: { id: 'email', value: 'email@email' } })

	expect(
		wrapper
			.update()
			.find(Button)
			.prop('disabled')
	)
		.toBe(true)
})

it('should enable the login button if both fields are populated', () => {
	let wrapper = shallow(component)

	wrapper
		.findWhere((n) => n.name() === 'TextField' && n.prop('id') === 'email')
		.props()
		.onChange({ target: { id: 'email', value: 'email@email' } })

	wrapper
		.findWhere((n) => n.name() === 'TextField' && n.prop('id') === 'password')
		.props()
		.onChange({ target: { id: 'password', value: 'password' } })

	expect(
		wrapper
			.update()
			.find(Button)
			.prop('disabled')
	)
		.toBe(false)
})

it('should call onsubmit prop when form is submitted', () => {
	let preventDefaultMock = jest.fn()

	let wrapper = shallow(component)

	wrapper
		.findWhere((n) => n.name() === 'TextField' && n.prop('id') === 'email')
		.props()
		.onChange({ target: { id: 'email', value: 'email@email' } })

	wrapper
		.findWhere((n) => n.name() === 'TextField' && n.prop('id') === 'password')
		.props()
		.onChange({ target: { id: 'password', value: 'password' } })

	wrapper.find('form')
		.simulate('submit', { preventDefault: preventDefaultMock })

	expect(preventDefaultMock.mock.calls.length)
		.toBe(1)
	expect(submitMock.mock.calls.length)
		.toBe(1)
	expect(submitMock.mock.calls[0][0])
		.toBe('email@email')
	expect(submitMock.mock.calls[0][1])
		.toBe('password')
})
