import React from 'react'
import PropTypes from 'prop-types'

import AddCard from 'app/shared/components/Cards/AddCard'

import LoadoutWeapon from './Weapon/LoadoutWeapon'
import AddWeaponDialog from './AddWeaponDialog/AddWeaponDialog'

import database from '../../../../../firebase/database'

export default class LoadoutWeaponList extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			isDialogOpen: false,
		}
	}
    
	openDialog() {
		this.setState({ isDialogOpen: true })
	}

	closeDialog() {
		this.setState({ isDialogOpen: false })
	}
    
	addWeapon(weaponId) {
		let { loadoutId, onAdd } = this.props 

		database.loadouts
			.loadout(loadoutId)
			.weapons
			.add(weaponId)
			.then((weapon) => onAdd(weapon))
			.then(() => this.closeDialog())
	}

	deleteWeapon(weaponId) {
		let { loadoutId, onDelete } = this.props

		database.loadouts
			.loadout(loadoutId)
			.weapons
			.delete(weaponId)
			.then(() => onDelete(weaponId))
	}
    
	renderWeapons(weapons) {
		if (!weapons || !weapons.length) {
			return null
		}
        
		let { loadoutId, onAttachmentAdd, onAttachmentDelete } = this.props

		return weapons.map((weapon) => (
			<LoadoutWeapon
				key={ weapon.id }
				loadoutId={ loadoutId }
				weapon={ weapon }
				onDelete={ (weaponId) => this.deleteWeapon(weaponId) }
				onAttachmentAdded={ (attachment) => onAttachmentAdd(weapon.id, attachment) }
				onAttachmentDeleted={ (attachmentId) => onAttachmentDelete(weapon.id, attachmentId) }
			/>
		))
	}
    
	render() {
		let { isDialogOpen } = this.state
		let { weapons } = this.props
        
		return (
			<React.Fragment>       
				{this.renderWeapons(weapons)}
				<AddCard onClick={ () => this.openDialog() } />        

				<AddWeaponDialog
					filterIds={ weapons && weapons.map((w) => w.id) }
					isOpen={ isDialogOpen }
					onSave={ (weapon) => this.addWeapon(weapon) }
					onClose={ () => this.closeDialog() }
				/>
			</React.Fragment>
		)
	}
}

LoadoutWeaponList.propTypes = {
	loadoutId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	weapons: PropTypes.array,
	onAdd: PropTypes.func,
	onDelete: PropTypes.func,
	onAttachmentAdd: PropTypes.func,
	onAttachmentDelete: PropTypes.func
}

LoadoutWeaponList.defaultProps = {
	weapons: [],
	onAdd: weapon => {},
	onDelete: weaponId => {},
	onAttachmentAdd: (weaponId, attachment) => {},
	onAttachmentDelete: (weaponId, attachmentId) => {}
}