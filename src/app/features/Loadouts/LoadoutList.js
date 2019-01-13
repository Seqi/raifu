import React from 'react'
import { withRouter } from 'react-router-dom'

import AddLoadoutDialog from './AddLoadoutDialog'

import database from '../../../firebase/database'
import CardListBaseComponent from '../../shared/components/Lists/CardListBaseComponent'
import LoadoutListCardContent from './LoadoutListCardContent'

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

	buildCardContent(loadout) {
		let items = { ...loadout.primaries, ...loadout.secondaries }

		if (Object.keys(items).length === 0) {
			return <div>No items</div>
		}

		return <LoadoutListCardContent weapons={ items } />
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
