import React from 'react'
import { mount } from 'enzyme'
import Card from '@material-ui/core/Card'

import SecondariesList from './SecondariesList'
import AddCard from '../../../shared/components/Cards/AddCard'

import auth from '../../../../firebase/auth'
import database from '../../../../firebase/database'
jest.mock('../../../../firebase/auth')
jest.mock('../../../../firebase/database')
jest.mock('../../../shared/services/card-image-service')

beforeEach(() => {
	auth.user = { uid: '1' }
	database.secondaries.__setData({ val: () => ({}) })
	database.secondaries.__setError(null)
	database.secondaries.get.mockClear()
})

it('renders with a single add card if no items returned', () => {
	let wrapper = mount(<SecondariesList />)

	process.nextTick(() => {
		wrapper = wrapper.update()

		expect(database.secondaries.get.mock.calls.length)
			.toBe(1)

		expect(wrapper.find(Card).length)
			.toBe(1)

		expect(wrapper.find(AddCard).length)
			.toBe(1)
	})
})

it.only('renders a card for each item, plus one for add card', () => {
	database.secondaries.__setData({ val: () => ({ 1: { name: '1' }, 2: { name: '2' }, 3: { name: '3' } }) })

	let wrapper = mount(<SecondariesList />)

	process.nextTick(() => {
		wrapper = wrapper.update()

		expect(database.secondaries.get.mock.calls.length)
			.toBe(1)

		expect(wrapper.find(Card).length)
			.toBe(4)

		expect(wrapper.find(AddCard).length)
			.toBe(1)
	})
})

it('displays an error with no cards if the data retrieval was unsuccessful', () => {
	database.secondaries.__setError({ message: 'error' })

	let wrapper = mount(<SecondariesList />)

	process.nextTick(() => {
		wrapper = wrapper.update()

		expect(database.secondaries.get.mock.calls.length)
			.toBe(1)

		expect(wrapper.find('.error-alert').length)
			.toBe(1)

		expect(wrapper.find(Card).length)
			.toBe(0)

		expect(wrapper.find(AddCard).length)
			.toBe(0)
	})
})
