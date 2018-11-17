import React from 'react'
import { mount } from 'enzyme'
import { Tabs } from '@material-ui/core'

import Main from './Main'

import auth from '../../../firebase/auth'
jest.mock('../../../firebase/auth')
jest.mock('../../../firebase/database')

let component

beforeEach(() => {
	// Separates out the withRouter and passes in our own mock history
	component = <Main.WrappedComponent history={ ['/app'] } />

	// Reset the user
	auth.user = {}
})

it('should show the main app if logged in', () => {
	let wrapper = mount(component)

	expect(wrapper.find(Tabs).length)
		.toBe(1)
})

it('should redirect to login if no user is logged in', () => {
	auth.user = undefined

	let wrapper = mount(component)

	expect(wrapper.find(Tabs).length)
		.toBe(0)
	expect(wrapper.prop('history'))
		.toContain('/login')
})

it('should redirect if the user logs out', () => {
	let wrapper = mount(component)

	// Make sure it doesnt isntantly log us out
	expect(wrapper.find(Tabs).length)
		.toBe(1)
	expect(wrapper.prop('history')).not.toContain('/login')

	// Simulate log out
	auth.__changeAuth(null)

	expect(wrapper.prop('history'))
		.toContain('/login')
})
