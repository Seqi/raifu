import React from 'react'

import AddGearDialog from './AddGearDialog'

import database from '../../../../firebase/database'
import CardListBaseComponent from 'app/shared/components/Lists/CardListBaseComponent'

class GearList extends CardListBaseComponent {
	get title() {
		return 'Gear'
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
			<React.Fragment>
				{super.render()}

				<AddGearDialog
					isOpen={ isAddDialogOpen }
					onSave={ (value) => this.save(value) }
					onClose={ () => this.setDialogOpen(false) }
				/>
			</React.Fragment>
		)
	}
}

export default GearList
