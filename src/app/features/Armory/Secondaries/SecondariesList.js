import React from 'react'

import AddSecondaryDialog from './AddSecondaryDialog'

import database from '../../../../firebase/database'
import CardListBaseComponent from '../../../shared/components/Lists/CardListBaseComponent'
import { getImage } from '../../../shared/services/card-image-service'

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
		console.log('building', item)
		let img = getImage('weapons', item.type, item.platform)

		if (img) {
			return <img className='card-img-skew' alt={ item.platform } src={ img } />
		}
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
