import React from 'react'
import { withRouter } from 'react-router-dom'

import AddLoadoutDialog from './AddLoadoutDialog'

import CardListBaseComponent from 'app/shared/components/Lists/CardListBaseComponent'
import LoadoutListCardContent from './LoadoutListCardContent'
import database from '../../../firebase/database'

class LoadoutList extends CardListBaseComponent {
	get title() {
		return ''
	}

	get cardType() {
		return 'loadout'
	}

	get items() {
		return database.loadouts
	}

	buildCardTitle(loadout) {
		return loadout.name
	}

	buildCardSubtitle() {
		return ''
	}

	buildCardContent(loadout) {
		if (!loadout.weapons || Object.keys(loadout.weapons).length === 0) {
			return <div>No items</div>
		}

		return <LoadoutListCardContent weapons={ loadout.weapons } />
	}

	view(id) {
		this.props.history.push(id)
	}

	render() {
		let { isAddDialogOpen } = this.state
		return (
			<React.Fragment>
				{super.render()}

				<AddLoadoutDialog
					isOpen={ isAddDialogOpen }
					onSave={ (value) => this.save(value) }
					onClose={ () => this.handleAddDialogClose() }
				/>
			</React.Fragment>
		)
	}
}

export default withRouter(LoadoutList)
