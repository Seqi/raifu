import React from 'react'

import AddSecondaryDialog from './AddSecondaryDialog'

import database from '../../../../firebase/database'
import CardListBaseComponent from 'app/shared/components/Lists/CardListBaseComponent'
import WeaponCardContent from 'app/shared/components/Images/WeaponCardContent'

class SecondariesList extends CardListBaseComponent {
	get title() {
		return 'SECONDARIES'
	}

	get items() {
		return database.secondaries
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
			<div>
				{super.render()}

				<AddSecondaryDialog
					isOpen={ isAddDialogOpen }
					onSave={ (value) => this.save(value) }
					onClose={ () => this.handleAddDialogClose() }
				/>
			</div>
		)
	}
}

export default SecondariesList
