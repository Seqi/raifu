import React from 'react'

import AddPrimaryDialog from './AddPrimaryDialog'
import database from '../../../../firebase/database'
import CardListBaseComponent from '../../../shared/components/Lists/CardListBaseComponent'
import { getWeaponImage } from '../../../shared/services/card-image-service'

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
		let img = getWeaponImage(item.type, item.platform)

		if (img) {
			return <img className='card-img-skew' alt={ item.platform } src={ img } />
		}
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
