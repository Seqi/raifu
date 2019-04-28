import React from 'react'

import AddGearDialog from './AddGearDialog'

import database from '../../../../firebase/database'
import CardListBaseComponent from 'app/shared/components/Lists/CardListBaseComponent'

class GearList extends CardListBaseComponent {
	get title() {
		return 'GEAR'
	}

	get items() {
		return database.gear
	}

	get cardType() {
		return 'gear'
	}

	render() {
		let { isAddDialogOpen } = this.state
		return (
			<div>
				{super.render()}

				<AddGearDialog
					isOpen={ isAddDialogOpen }
					onSave={ (value) => this.save(value) }
					onClose={ () => this.handleAddDialogClose() }
				/>
			</div>
		)
	}
}

export default GearList
