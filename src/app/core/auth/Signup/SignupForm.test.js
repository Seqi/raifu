import React from 'react'
import { shallow } from 'enzyme'
import SignupForm from './SignupForm'
import { Button } from '@material-ui/core'

let signupForm
let onSubmitMock

beforeEach(() => {
	onSubmitMock = jest.fn(() => {})
	signupForm = <SignupForm onSubmit={ onSubmitMock } />
})

it('renders without crashing', () => {
	shallow(signupForm)
})

it('disables the sign up button with an empty form', () => {
	let component = shallow(signupForm)

	expect(component.find(Button)
		.prop('disabled'))
		.toBe(true)
})

it('disables the sign up button with mismatched passwords', () => {
	let component = shallow(signupForm)
	component.setState({
		email: 'test',
		password: 'password',
		confirmPassword: 'passwor'
	})

	expect(component.find(Button)
		.prop('disabled'))
		.toBe(true)
})

it('enables the sign up button with a valid form', () => {
	let component = shallow(signupForm)
	component.setState({
		email: 'test',
		password: 'password',
		confirmPassword: 'password'
	})

	expect(component.find(Button)
		.prop('disabled'))
		.toBe(false)
})

it('displays an error with mismatched passwords', () => {
	let component = shallow(signupForm)
	component.setState({
		email: 'test',
		password: 'password',
		confirmPassword: 'passwor'
	})

	let passwordEl = component.findWhere((node) => node.name() === 'TextField' && node.prop('id') === 'confirmPassword')

	expect(passwordEl.prop('error'))
		.toBe(true)
})

it('should call the onSubmit prop with email and password when form is submitted', () => {
	let preventDefaultMock = jest.fn()

	let component = shallow(signupForm)
	component.setState({
		email: 'test',
		password: 'password',
		confirmPassword: 'password'
	})

	component.find('form')
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
