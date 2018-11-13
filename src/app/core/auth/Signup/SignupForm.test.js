import React from 'react'
import { mount } from 'enzyme'
import SignupForm from './SignupForm'
import { Button } from '@material-ui/core'

let signupForm
let onSubmitMock

beforeEach(() => {
	onSubmitMock = jest.fn(() => {})
	signupForm = <SignupForm onSubmit={ onSubmitMock } />
})

it('renders without crashing', () => {
	mount(signupForm)
})

it('disables the sign up button with an empty form', () => {
	let component = mount(signupForm)

	expect(component.find(Button)
		.prop('disabled'))
		.toBe(true)
})

it('disables the sign up button with mismatched passwords', () => {
	let component = mount(signupForm)
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
	let component = mount(signupForm)
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
	let component = mount(signupForm)
	component.setState({
		email: 'test',
		password: 'password',
		confirmPassword: 'passwor'
	})

	let passwordEl = component.findWhere((node) => node.name() === 'TextField' && node.prop('id') === 'confirmPassword')

	expect(passwordEl.prop('error'))
		.toBe(true)
})
