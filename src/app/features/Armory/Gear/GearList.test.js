import React from 'react'
import { mount } from 'enzyme'
import Card from '@material-ui/core/Card'

import GearList from './GearList'
import AddCard from '../../../shared/components/Cards/AddCard'

import auth from '../../../../firebase/auth'
import database from '../../../../firebase/database'
jest.mock('../../../../firebase/auth')
jest.mock('../../../../firebase/database')

beforeEach(() => {
	auth.user = { uid: '1' }
	database.gear.__setData({ val: () => ({}) })
	database.gear.__setError(null)
	database.gear.get.mockClear()
})

it('renders with a single add card if no items returned', () => {
	let wrapper = mount(<GearList />)

	process.nextTick(() => {
		wrapper = wrapper.update()

		expect(database.gear.get.mock.calls.length)
			.toBe(1)

		expect(wrapper.find(Card).length)
			.toBe(1)

		expect(wrapper.find(AddCard).length)
			.toBe(1)
	})
})

it('renders a card for each item, plus one for add card', () => {
	database.gear.__setData({ val: () => ({ 1: { name: '1' }, 2: { name: '2' }, 3: { name: '3' } }) })

	let wrapper = mount(<GearList />)

	process.nextTick(() => {
		wrapper = wrapper.update()

		expect(database.gear.get.mock.calls.length)
			.toBe(1)

		expect(wrapper.find(Card).length)
			.toBe(4)

		expect(wrapper.find(AddCard).length)
			.toBe(1)
	})
})

it('displays an error with no cards if the data retrieval was unsuccessful', () => {
	database.gear.__setError({ message: 'error' })

	let wrapper = mount(<GearList />)

	process.nextTick(() => {
		wrapper = wrapper.update()

		expect(database.gear.get.mock.calls.length)
			.toBe(1)

		expect(wrapper.find('.error-alert').length)
			.toBe(1)

		expect(wrapper.find(Card).length)
			.toBe(0)

		expect(wrapper.find(AddCard).length)
			.toBe(0)
	})
})
