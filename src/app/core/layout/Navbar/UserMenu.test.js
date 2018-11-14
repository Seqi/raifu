import React from 'react'
import { mount } from 'enzyme'

import UserMenu from './UserMenu'
import { Avatar, MenuItem } from '@material-ui/core'
import auth from '../../../../firebase/auth'

jest.mock('../../../../firebase/auth')

it('displays user information with display name and photo (third party login)', () => {
	let wrapper = mount(<UserMenu user={ { displayName: 'Test Name', photoURL: 'test' } } />)

	expect(wrapper.find('.user-name')
		.contains('Test Name'))
		.toBe(true)

	expect(wrapper.find(Avatar)
		.prop('src'))
		.toBe('test')
})

it('displays user information with email (email login)', () => {
	let wrapper = mount(<UserMenu user={ { email: 'Test Name' } } />)

	expect(wrapper.find('.user-name')
		.contains('Test Name'))
		.toBe(true)

	expect(wrapper.find('i').length)
		.toBe(1)
})

it('doesn\'t show menu items by default', () => {
	let wrapper = mount(<UserMenu user={ { email: 'Test Name' } } />)

	expect(wrapper.find(MenuItem).length)
		.toBe(0)
})

it('shows menu items when avatar clicked', () => {
	let wrapper = mount(<UserMenu user={ { email: 'Test Name' } } />)

	let btn = wrapper.find('.avatar-button')

	btn.props()
		.onClick({ currentTarget: btn.getDOMNode() })

	process.nextTick(() => {
		expect(wrapper.update()
			.find(MenuItem).length)
			.toBeGreaterThan(0)
	})
})

it('has a logout button which logs the user out when clicked', () => {
	let wrapper = mount(<UserMenu user={ { email: 'Test Name' } } />)

	// Open the menu
	let btn = wrapper.find('.avatar-button')

	btn.props()
		.onClick({ currentTarget: btn.getDOMNode() })

	// Wait for the menu to open before continuing

	wrapper
		.update()
		.findWhere((node) => node.name() === 'MenuItem' && node.contains('Logout'))
		.props()
		.onClick()

	expect(auth.logout.mock.calls.length)
		.toBe(1)
})
