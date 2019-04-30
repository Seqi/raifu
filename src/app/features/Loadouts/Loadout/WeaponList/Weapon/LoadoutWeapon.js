import './LoadoutWeapon.css'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import LoadoutWeaponAttachments from './AttachmentList/LoadoutWeaponAttachments'
import ConfirmDeleteDialog from 'app/shared/components/Cards/ConfirmDeleteDialog'
import { WeaponCard } from 'app/shared/components/Cards/Entities'

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
		let { loadoutId, weapon, onAttachmentAdded, onAttachmentDeleted } = this.props

		return (
			<React.Fragment>
				<div className='weapon-mod'>			
					<WeaponCard 
						weapon={ weapon }
						canDelete={ true } 
						onDelete={ () => this.openDialog() }
					/>

					<LoadoutWeaponAttachments
						loadoutId={ loadoutId }
						weapon={ weapon }
						onAttachmentAdded={ onAttachmentAdded }
						onAttachmentDeleted={ onAttachmentDeleted }
					/>
				</div>
				
				<ConfirmDeleteDialog
					title={ weapon.getTitle() }
					isOpen={ isDialogOpen }
					onClose={ () => this.closeDialog() }
					onConfirm={ () => this.deleteWeapon(weapon.id) }
				/>
			</React.Fragment>
		)
	}
}

LoadoutWeapon.propTypes = {
	// TODO: Move all of this stuff to a React.Context
	loadoutId: PropTypes.number.isRequired,
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
	onDelete: PropTypes.func,
	onAttachmentAdded: PropTypes.func,
	onAttachmentDeleted: PropTypes.func
}

LoadoutWeapon.defaultProps = {
	onDelete: () => {},
	onAttachmentAdded: (attachment) => {},
	onAttachmentDeleted: (attachmentId) => {}
}

export default LoadoutWeapon
