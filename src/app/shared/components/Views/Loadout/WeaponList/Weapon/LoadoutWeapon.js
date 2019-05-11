import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'

import LoadoutWeaponAttachmentList from './AttachmentList/LoadoutWeaponAttachmentList'

import ConfirmDeleteDialog from 'app/shared/components/Cards/ConfirmDeleteDialog'
import ArmoryItemImage from 'app/shared/components/Images/ArmoryItemImage'
import DeleteButton from 'app/shared/components/Buttons/DeleteButton'

import './LoadoutWeapon.css'

class LoadoutWeapon extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isDialogOpen: false
		}
	}

	openDialog() {
		this.setState({ isDialogOpen: true })
	}

	closeDialog() {
		this.setState({ isDialogOpen: false })
	}

	deleteWeapon(weaponId) {
		this.closeDialog()
		this.props.onDelete(weaponId)
	}

	render() {
		let { isDialogOpen } = this.state
		let { loadoutId, weapon, canEdit, onAttachmentsAdded, onAttachmentDeleted } = this.props

		return (
			<React.Fragment>	
				<React.Fragment>
					<div className='loadout-weapon-item'>

						<Typography variant={ 'h4' } className='loadout-weapon-item-title'>
							{ weapon.getTitle() }
							
							{ canEdit && <DeleteButton style={ {position: 'initial'} } onClick={ () => this.openDialog() } /> }
						</Typography>

						<ArmoryItemImage 
							style={ {
								width: '100%',
								height: '100%'
							} }
							entity={ weapon }
							category={ 'weapons' }
						/>
					</div>	

					<LoadoutWeaponAttachmentList
						loadoutId={ loadoutId }
						weapon={ weapon }
						canEdit={ canEdit }
						onAttachmentsAdded={ onAttachmentsAdded }
						onAttachmentDeleted={ onAttachmentDeleted }
					/>
				</React.Fragment>	
				
				{ canEdit && <ConfirmDeleteDialog
					title={ weapon.getTitle() }
					isOpen={ isDialogOpen }
					onClose={ () => this.closeDialog() }
					onConfirm={ () => this.deleteWeapon(weapon.id) }
				/> }
			</React.Fragment>
		)
	}
}

LoadoutWeapon.propTypes = {
	// TODO: Move all of this stuff to a React.Context
	loadoutId: PropTypes.string.isRequired,
	weapon: PropTypes.shape({
		platform: PropTypes.string.isRequired,
		model: PropTypes.string,
		brand: PropTypes.string,
		nickname: PropTypes.string,
		type: PropTypes.string,
		attachments: PropTypes.arrayOf(PropTypes.shape({			
			platform: PropTypes.string.isRequired,
			model: PropTypes.string,
			brand: PropTypes.string,
			nickname: PropTypes.string,
			type: PropTypes.string.isRequired,
			getTitle: PropTypes.func.isRequired,
			getSubtitle: PropTypes.func.isRequired,
		}))
	}).isRequired,
	canEdit: PropTypes.bool,
	onDelete: PropTypes.func,
	onAttachmentsAdded: PropTypes.func,
	onAttachmentDeleted: PropTypes.func
}

LoadoutWeapon.defaultProps = {
	canEdit: false,
	onDelete: () => {},
	onAttachmentsAdded: (attachments) => {},
	onAttachmentDeleted: (attachmentId) => {}
}

export default LoadoutWeapon
