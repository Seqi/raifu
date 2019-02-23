import React from 'react'
import { shallow } from 'enzyme'

import { Button } from '@material-ui/core'

import SignupForm from './SignupForm'

let component
let onSubmitMock

beforeEach(() => {
	onSubmitMock = jest.fn(() => {})
	component = <SignupForm onSubmit={ onSubmitMock } />
})

it('renders without crashing', () => {
	shallow(component)
})

it('disables the sign up button with an empty form', () => {
	let wrapper = shallow(component)

	expect(wrapper.find(Button)
		.prop('disabled'))
		.toBe(true)
})

it('disables the sign up button with mismatched passwords', () => {
	let wrapper = shallow(component)
	wrapper.setState({
		email: 'test',
		password: 'password',
		confirmPassword: 'passwor'
	})

	expect(wrapper.find(Button)
		.prop('disabled'))
		.toBe(true)
})

it('enables the sign up button with a valid form', () => {
	let wrapper = shallow(component)
	wrapper.setState({
		email: 'test',
		password: 'password',
		confirmPassword: 'password'
	})

	expect(wrapper.find(Button)
		.prop('disabled'))
		.toBe(false)
})

it('displays an error with mismatched passwords', () => {
	let wrapper = shallow(component)
	wrapper.setState({
		email: 'test',
		password: 'password',
		confirmPassword: 'passwor'
	})

	let passwordEl = wrapper.findWhere((node) => node.name() === 'TextField' && node.prop('id') === 'confirmPassword')

	expect(passwordEl.prop('error'))
		.toBe(true)
})

it('should call the onSubmit prop with email and password when form is submitted', () => {
	let preventDefaultMock = jest.fn()

	let wrapper = shallow(component)
	wrapper.setState({
		email: 'test',
		password: 'password',
		confirmPassword: 'password'
	})

	wrapper.find('form')
		.simulate('submit', { preventDefault: preventDefaultMock })

	expect(preventDefaultMock.mock.calls.length)
		.toBe(1)
	expect(onSubmitMock.mock.calls.length)
		.toBe(1)
	expect(onSubmitMock.mock.calls[0][0])
		.toBe('test')
	expect(onSubmitMock.mock.calls[0][1])
		.toBe('password')
})
