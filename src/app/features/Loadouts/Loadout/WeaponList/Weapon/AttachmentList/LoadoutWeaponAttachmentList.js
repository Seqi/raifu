import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AddAttachmentDialog from './AddAttachmentDialog/AddAttachmentDialog'
import AddCard from 'app/shared/components/Cards/AddCard'

import LoadoutContext from '../../../LoadoutContext'
import LoadoutWeaponAttachment from './Attachment/LoadoutWeaponAttachment'

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

	addAttachment(attachmentId) {
		let { loadoutId, weapon, onAttachmentAdded } = this.props

		database.loadouts
			.loadout(loadoutId)
			.weapons
			.weapon(weapon.id)
			.attachments
			.add(attachmentId)
			.then((attachment) => onAttachmentAdded(attachment))
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
			.then(() => this.closeDialog())
			.then(() => onAttachmentDeleted(attachmentId))
	}

	getAttachmentsToFilter(loadout) {
		return loadout.weapons
			.flatMap(w => w.attachments || [])
			.map(a => a.id)
	}

	renderAttachments(attachments) {
		return attachments.map(attachment => (
			<div key={ attachment.id } className='loadout-weapon-attachment-item'>
				<LoadoutWeaponAttachment attachment={ attachment } />
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
							<AddCard className={ 'loadout-weapon-attachment-item' } cardType={ 'attachment' } onClick={ () => this.openDialog() } />   
						</div>

						<AddAttachmentDialog
							weaponId={ weapon.id }
							weaponName={ weapon.getTitle() }
							filterIds={ this.getAttachmentsToFilter(loadout) }
							isOpen={ this.state.isDialogOpen }
							onClose={ () => this.closeDialog() }
							onSave={ (id) => this.addAttachment(id) }
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
	onAttachmentAdded: PropTypes.func,
	onAttachmentDeleted: PropTypes.func
}

LoadoutWeaponAttachmentList.defaultProps = {
	filterAttachmentIds: [],
	onAttachmentAdded: (attachment) => {},
	onAttachmentDeleted: (attachmentId) => {}
}

export default LoadoutWeaponAttachmentList
