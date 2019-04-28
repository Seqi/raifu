import './LoadoutWeapon.css'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import LoadoutWeaponAttachments from './LoadoutWeaponAttachments'
import ConfirmDeleteDialog from 'app/shared/components/Cards/ConfirmDeleteDialog'
import { WeaponCard } from 'app/shared/components/Cards/Entities'

import database from '../../../../firebase/database'

class LoadoutWeapon extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isDialogOpen: false
		}
	}

	handleDialogOpen() {
		this.setState({ isDialogOpen: true })
	}

	handleDialogClose() {
		this.setState({ isDialogOpen: false })
	}

	handleDelete() {
		let { loadoutId, weapon, onDelete } = this.props

		database.loadouts
			.loadout(loadoutId)
			.weapons.delete(weapon.id)
			.then(() => this.handleDialogClose())
			.then(() => onDelete())
	}

	render() {
		let { isDialogOpen } = this.state
		let { weapon } = this.props

		return (
			<div className='weapon-mod'>			
				<WeaponCard 
					weapon={ weapon }
					canDelete={ true } 
					onDelete={ () => this.handleDialogOpen() }
				/>

				<LoadoutWeaponAttachments { ...this.props } />

				<ConfirmDeleteDialog
					title={ weapon.getTitle() }
					isOpen={ isDialogOpen }
					onClose={ () => this.handleDialogClose() }
					onConfirm={ () => this.handleDelete() }
				/>
			</div>
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
	filterAttachmentIds: PropTypes.array,
	onDelete: PropTypes.func,
	onAttachmentAdded: PropTypes.func,
	onAttachmentDeleted: PropTypes.func
}

LoadoutWeapon.defaultProps = {
	filterAttachmentIds: [],
	onDelete: () => {},
	onAttachmentAdded: (attachment) => {},
	onAttachmentDeleted: (attachmentId) => {}
}

export default LoadoutWeapon
