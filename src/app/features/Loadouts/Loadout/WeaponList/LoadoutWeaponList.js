import React from 'react'
import PropTypes from 'prop-types'

import AddButton from 'app/shared/components/Buttons/AddButton'

import LoadoutWeaponContainer from './LoadoutWeaponContainer'
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
			<LoadoutWeaponContainer key={ weapon.id }>				
				<LoadoutWeapon
					loadoutId={ loadoutId }
					weapon={ weapon }
					onDelete={ (weaponId) => this.deleteWeapon(weaponId) }
					onAttachmentAdded={ (attachment) => onAttachmentAdd(weapon.id, attachment) }
					onAttachmentDeleted={ (attachmentId) => onAttachmentDelete(weapon.id, attachmentId) }
				/>
			</LoadoutWeaponContainer>
		))
	}
    
	render() {
		let { isDialogOpen } = this.state
		let { weapons } = this.props
        
		return (
			<React.Fragment>       
				{this.renderWeapons(weapons)}

				<LoadoutWeaponContainer showBottom={ true } >
					<div style={ {
						width: '100%',
						height: '250px',
					} }>
						<AddButton onClick={ () => this.openDialog() } />        
					</div>
				</LoadoutWeaponContainer>

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