import React from 'react'
import { mount } from 'enzyme'
import Card from '@material-ui/core/Card'

import AttachmentsList from './AttachmentsList'
import AddCard from 'app/shared/components/Cards/AddCard'

import database from '../../../../firebase/database'
jest.mock('../../../../firebase/auth')
jest.mock('../../../../firebase/database')
jest.mock('app/shared/services/card-image-service')

beforeEach(() => {
	database.attachments.__setData([])
	database.attachments.__setError(null)
	database.attachments.get.mockClear()
})

it('renders with a single add card if no items returned', () => {
	let wrapper = mount(<AttachmentsList />)

	process.nextTick(() => {
		wrapper = wrapper.update()

		expect(database.attachments.get.mock.calls.length)
			.toBe(1)

		expect(wrapper.find(Card).length)
			.toBe(1)

		expect(wrapper.find(AddCard).length)
			.toBe(1)
	})
})

it('renders a card for each item, plus one for add card', () => {
	database.attachments.__setData([{ id: 1, name: '1' }, { id: 2, name: '2' }, { id: 3, name: '3' }])

	let wrapper = mount(<AttachmentsList />)

	process.nextTick(() => {
		wrapper = wrapper.update()

		expect(database.attachments.get.mock.calls.length)
			.toBe(1)

		expect(wrapper.find(Card).length)
			.toBe(4)

		expect(wrapper.find(AddCard).length)
			.toBe(1)
	})
})

it('displays an error with no cards if the data retrieval was unsuccessful', () => {
	database.attachments.__setError({ message: 'error' })

	let wrapper = mount(<AttachmentsList />)

	process.nextTick(() => {
		wrapper = wrapper.update()

		expect(database.attachments.get.mock.calls.length)
			.toBe(1)

		expect(wrapper.find('.error-alert').length)
			.toBe(1)

		expect(wrapper.find(Card).length)
			.toBe(0)

		expect(wrapper.find(AddCard).length)
			.toBe(0)
	})
})
