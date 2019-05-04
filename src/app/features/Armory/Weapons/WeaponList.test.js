import React from 'react'
import { mount } from 'enzyme'
import Card from '@material-ui/core/Card'

import WeaponList from './WeaponList'
import AddCard from 'app/shared/components/Cards/AddCard'

import database from '../../../../firebase/database'
jest.mock('../../../../firebase/auth')
jest.mock('../../../../firebase/database')
jest.mock('app/shared/services/armory-image-service')

beforeEach(() => {
	database.weapons.__setData([])
	database.weapons.__setError(null)
	database.weapons.get.mockClear()
})

it('renders with a single add card if no items returned', () => {
	let wrapper = mount(<WeaponList />)

	process.nextTick(() => {
		wrapper = wrapper.update()

		expect(database.weapons.get.mock.calls.length)
			.toBe(1)

		expect(wrapper.find(Card).length)
			.toBe(1)

		expect(wrapper.find(AddCard).length)
			.toBe(1)
	})
})

it('renders a card for each item, plus one for add card', () => {
	database.weapons.__setData([{ id: 1, name: '1' }, { id: 2, name: '2' }, { id: 3, name: '3' }])

	let wrapper = mount(<WeaponList />)

	process.nextTick(() => {
		wrapper = wrapper.update()

		expect(database.weapons.get.mock.calls.length)
			.toBe(1)

		expect(wrapper.find(Card).length)
			.toBe(4)

		expect(wrapper.find(AddCard).length)
			.toBe(1)
	})
})

it('displays an error with no cards if the data retrieval was unsuccessful', () => {
	database.weapons.__setError({ message: 'error' })

	let wrapper = mount(<WeaponList />)

	process.nextTick(() => {
		wrapper = wrapper.update()

		expect(database.weapons.get.mock.calls.length)
			.toBe(1)

		expect(wrapper.find('.error-alert').length)
			.toBe(1)

		expect(wrapper.find(Card).length)
			.toBe(0)

		expect(wrapper.find(AddCard).length)
			.toBe(0)
	})
})
