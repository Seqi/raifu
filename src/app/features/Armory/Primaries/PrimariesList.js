import React from 'react'

import AddPrimaryDialog from './AddPrimaryDialog'
import database from '../../../../firebase/database'
import CardListBaseComponent from '../../../shared/components/Lists/CardListBaseComponent'

class PrimariesList extends CardListBaseComponent {
	get title() {
		return 'PRIMARIES'
	}

	get items() {
		return database.primaries
	}

	buildCardTitle(weapon) {
		return weapon.nickname || `${weapon.platform} ${weapon.model}`
	}

	render() {
		let { isAddDialogOpen } = this.state
		return (
			<div>
				{super.render()}

				<AddPrimaryDialog
					isOpen={ isAddDialogOpen }
					onSave={ (value) => this.save(value) }
					onClose={ () => this.handleAddDialogClose() }
				/>
			</div>
		)
	}
}

export default PrimariesList
