import React from 'react'
import withRouter from 'react-router-dom/withRouter'

import CardListBaseComponent from 'app/shared/components/Lists/CardListBaseComponent'

import AddEventDialog from './AddEventDialog'

import database from '../../../firebase/database'

class Events extends CardListBaseComponent {

	get items() {
		return database.events
	}

	get cardType() {
		return 'loadout'
	}

	view(event) {
		this.props.history.push(`${this.props.location.pathname}/${event.id}`)
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
					onSave={ value => this.formatDateThenSave(value) } 
					onClose={ () => this.handleDialogClose() }
					isOpen={ this.state.isAddDialogOpen } 
				/>
			</React.Fragment>			
		)
	}
}

export default withRouter(Events)