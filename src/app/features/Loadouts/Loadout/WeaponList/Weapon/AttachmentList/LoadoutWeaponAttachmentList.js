import React, { Component } from 'react'
import PropTypes from 'prop-types'

import LoadoutContext from '../../../LoadoutContext'
import AddAttachmentDialog from './AddAttachmentDialog/AddAttachmentDialog'
import LoadoutWeaponAttachment from './Attachment/LoadoutWeaponAttachment'

import AddButton from 'app/shared/components/Buttons/AddButton'

import database from '../../../../../../../firebase/database'

class LoadoutWeaponAttachmentList extends Component {
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

	addAttachments(attachmentIds) {
		let { loadoutId, weapon, onAttachmentsAdded } = this.props

		let addToDbPromises = attachmentIds.map(attachmentId => {
			return database.loadouts
				.loadout(loadoutId)
				.weapons
				.weapon(weapon.id)
				.attachments
				.add(attachmentId)				
		})

		Promise.all(addToDbPromises)
			.then(attachments => onAttachmentsAdded(attachments))
			.then(() => this.closeDialog())
	}

	deleteAttachment(attachmentId) {
		let { loadoutId, weapon, onAttachmentDeleted } = this.props

		database.loadouts
			.loadout(loadoutId)
			.weapons
			.weapon(weapon.id)
			.attachments
			.delete(attachmentId)
			.then(() => onAttachmentDeleted(attachmentId))
	}

	getAttachmentsToFilter(loadout) {
		return loadout.weapons
			.flatMap(w => w.attachments || [])
			.map(a => a.id)
	}

	renderAttachments(attachments) {
		if (!attachments) {
			return null
		}
		
		return attachments.map(attachment => (
			<div key={ attachment.id } className='loadout-weapon-attachment-item'>
				<LoadoutWeaponAttachment attachment={ attachment } onDelete={ () => this.deleteAttachment(attachment.id) } />
			</div>
		))
	}

	render() {
		let { weapon } = this.props

		return (
			<LoadoutContext.Consumer>
				{ loadout => (
					<React.Fragment>
						<div className='loadout-weapon-attachment-list-container'>
							{ this.renderAttachments(weapon.attachments)}

							<div className='loadout-weapon-attachment-item'>
								<AddButton onClick={ () => this.openDialog() } />   
							</div>
						</div>

						<AddAttachmentDialog
							weaponId={ weapon.id }
							weaponName={ weapon.getTitle() }
							filterIds={ this.getAttachmentsToFilter(loadout) }
							isOpen={ this.state.isDialogOpen }
							onClose={ () => this.closeDialog() }
							onSave={ (ids) => this.addAttachments(ids) }
						/>
					</React.Fragment>
				)}
			</LoadoutContext.Consumer>
		)
	}
}

LoadoutWeaponAttachmentList.propTypes = {
	loadoutId: PropTypes.string.isRequired,
	weapon: PropTypes.shape({
		platform: PropTypes.string.isRequired,
		model: PropTypes.string,
		brand: PropTypes.string,
		nickname: PropTypes.string,
		type: PropTypes.string.isRequired,
		getTitle: PropTypes.func.isRequired,
		getSubtitle: PropTypes.func.isRequired,
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
	onAttachmentsAdded: PropTypes.func,
	onAttachmentDeleted: PropTypes.func
}

LoadoutWeaponAttachmentList.defaultProps = {
	filterAttachmentIds: [],
	onAttachmentsAdded: (attachment) => {},
	onAttachmentDeleted: (attachmentId) => {}
}

export default LoadoutWeaponAttachmentList
