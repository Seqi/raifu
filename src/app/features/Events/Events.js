import React from 'react'

import CardListBaseComponent from 'app/shared/components/Lists/CardListBaseComponent'

import AddEventDialog from './AddEventDialog'

import database from '../../../firebase/database'

export default class Events extends CardListBaseComponent {

	get items() {
		return database.events
	}

	get cardType() {
		return 'loadout'
	}

	formatDateThenSave(event) {
		// Firebase functions don't like date objects...
		if (event.date) {
			event.date = event.date.toISOString()
		}

		this.save(event)
	}

	render() {
		return (
			<React.Fragment>
			 { super.render() }

			 <AddEventDialog 
				onSave={ value => this.formatDateThenSave(value)} 
				onClose={() => this.handleDialogClose() }
				isOpen={ this.state.isAddDialogOpen } 
			/>
			</React.Fragment>


			
		)
	}
}