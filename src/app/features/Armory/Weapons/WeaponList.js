import React from 'react'

import AddWeaponDialog from './AddWeaponDialog'
import database from '../../../../firebase/database'
import CardListBaseComponent from 'app/shared/components/Lists/CardListBaseComponent'
import WeaponCardContent from 'app/shared/components/Images/WeaponCardContent'

class WeaponList extends CardListBaseComponent {
	get title() {
		return 'WEAPONS'
	}

	get items() {
		return database.weapons
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

				<AddWeaponDialog
					isOpen={ isAddDialogOpen }
					onSave={ (value) => this.save(value) }
					onClose={ () => this.handleAddDialogClose() }
				/>
			</div>
		)
	}
}

export default WeaponList
