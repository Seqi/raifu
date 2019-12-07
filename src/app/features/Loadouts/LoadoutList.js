import React from 'react'

import AddLoadoutDialog from './AddLoadoutDialog'

import CardListBaseComponent from 'app/shared/components/Lists/CardListBaseComponent'
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

	view(loadout) {
		this.props.history.push(`${this.props.location.pathname}/${loadout.id}`)
	}

	render() {
		let { isAddDialogOpen } = this.state
		return (
			<React.Fragment>
				{super.render()}

				<AddLoadoutDialog
					isOpen={ isAddDialogOpen }
					onSave={ (value) => this.save(value) }
					onClose={ () => this.setDialogOpen(false) }
				/>
			</React.Fragment>
		)
	}
}

export default LoadoutList
