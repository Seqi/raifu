import React from 'react'

import AddPrimaryDialog from './AddPrimaryDialog'
import database from '../../../../firebase/database'
import CardListBaseComponent from '../../../shared/components/Lists/CardListBaseComponent'
import WeaponCardContent from '../../../shared/components/Images/WeaponCardContent'

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

	buildCardContent(item) {
		return <WeaponCardContent weapon={ item } />
	}

	render() {
		let { isAddDialogOpen } = this.state
		return (
			<React.Fragment>
				{super.render()}

				<AddPrimaryDialog
					isOpen={ isAddDialogOpen }
					onSave={ (value) => this.save(value) }
					onClose={ () => this.handleAddDialogClose() }
				/>
			</React.Fragment>
		)
	}
}

export default PrimariesList
