import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'
import { withTheme } from '@material-ui/core'

import LoadoutWeaponAttachmentList from './AttachmentList/LoadoutWeaponAttachmentList'
import ConfirmDeleteDialog from 'app/shared/components/Cards/ConfirmDeleteDialog'
import ArmoryItemImage from 'app/shared/components/Images/ArmoryItemImage'

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
		let { theme, loadoutId, weapon, onAttachmentAdded, onAttachmentDeleted } = this.props

		return (
			<React.Fragment>
				<div className='loadout-weapon-container' style={ {					
					marginTop: '24px',
					marginBottom: '24px',
					borderTop: `1px solid ${theme.palette.primary.main}`
				} }>		
					<div className='loadout-weapon-item'>
						<Typography variant={ 'h4' } className='loadout-weapon-item-title'>
							{ weapon.getTitle() }
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
	onDelete: PropTypes.func,
	onAttachmentAdded: PropTypes.func,
	onAttachmentDeleted: PropTypes.func
}

LoadoutWeapon.defaultProps = {
	onDelete: () => {},
	onAttachmentAdded: (attachment) => {},
	onAttachmentDeleted: (attachmentId) => {}
}

export default withTheme()(LoadoutWeapon)
