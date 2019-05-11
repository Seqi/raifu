import React from 'react'
import PropTypes from 'prop-types'

import LoadoutAdd from '../LoadoutAdd'
import LoadoutSeparator from '../LoadoutSeparator'
import LoadoutWeapon from './Weapon/LoadoutWeapon'
import AddWeaponDialog from './AddWeaponDialog/AddWeaponDialog'

import database from '../../../../../../firebase/database'

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
        
		let { loadoutId, canEdit, onAttachmentsAdd, onAttachmentDelete } = this.props

		return weapons.map((weapon) => (			
			<LoadoutSeparator key={ weapon.id }>				
				<LoadoutWeapon
					loadoutId={ loadoutId }
					weapon={ weapon }
					canEdit={ canEdit }
					onDelete={ (weaponId) => this.deleteWeapon(weaponId) }
					onAttachmentsAdded={ (attachments) => onAttachmentsAdd(weapon.id, attachments) }
					onAttachmentDeleted={ (attachmentId) => onAttachmentDelete(weapon.id, attachmentId) }
				/>
			</LoadoutSeparator>
		))
	}
    
	render() {
		let { isDialogOpen } = this.state
		let { weapons, canEdit } = this.props
        
		return (
			<React.Fragment>       
				{this.renderWeapons(weapons)}

				{ canEdit && 
					<LoadoutSeparator showBottom={ true } >
						<LoadoutAdd onClick={ () => this.openDialog() } />
					</LoadoutSeparator>
				}

				{ !canEdit && <LoadoutSeparator /> }

				{ canEdit && <AddWeaponDialog
					filterIds={ weapons && weapons.map((w) => w.id) }
					isOpen={ isDialogOpen }
					onSave={ (weaponId) => this.addWeapon(weaponId) }
					onClose={ () => this.closeDialog() }
				/> }
			</React.Fragment>
		)
	}
}

LoadoutWeaponList.propTypes = {
	loadoutId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	weapons: PropTypes.array,
	canEdit: PropTypes.bool,
	onAdd: PropTypes.func,
	onDelete: PropTypes.func,
	onAttachmentsAdd: PropTypes.func,
	onAttachmentDelete: PropTypes.func
}

LoadoutWeaponList.defaultProps = {
	weapons: [],
	canEdit: false,
	onAdd: weapon => {},
	onDelete: weaponId => {},
	onAttachmentsAdd: (weaponId, attachments) => {},
	onAttachmentDelete: (weaponId, attachmentId) => {}
}