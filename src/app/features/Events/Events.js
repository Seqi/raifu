import React from 'react'

import CardListBaseComponent from 'app/shared/components/Lists/CardListBaseComponent'

import database from '../../../firebase/database'

export default class Events extends CardListBaseComponent {

	get items() {
		return database.events
	}

	get cardType() {
		return 'loadout'
	}

	render() {
		return super.render()
	}
}