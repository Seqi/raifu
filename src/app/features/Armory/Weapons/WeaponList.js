import React from 'react'

import AddWeaponDialog from './AddWeaponDialog'
import database from '../../../../firebase/database'
import CardListBaseComponent from 'app/shared/components/Lists/CardListBaseComponent'

class WeaponList extends CardListBaseComponent {
	get title() {
		return 'Weapons'
	}

	get items() {
		return database.weapons
	}

	render() {
		let { isAddDialogOpen } = this.state
		return (
			<React.Fragment>
				{super.render()}

				<AddWeaponDialog
					isOpen={ isAddDialogOpen }
					onSave={ (value) => this.save(value) }
					onClose={ () => this.setDialogOpen(false) }
				/>
			</React.Fragment>
		)
	}
}

export default WeaponList
