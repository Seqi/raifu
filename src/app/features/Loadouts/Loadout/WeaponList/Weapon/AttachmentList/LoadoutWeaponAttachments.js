import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AddAttachmentDialog from './AddAttachmentDialog'
import CardList from 'app/shared/components/Cards/CardList'

import LoadoutContext from '../../../LoadoutContext'

import database from '../../../../../../../firebase/database'

class LoadoutWeaponAttachments extends Component {
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

	render() {
		let { weapon } = this.props

		return (
			<LoadoutContext.Consumer>
				{ loadout => (
					<React.Fragment>
						<div className='weapon-attachments'>
							<CardList
								cardType='attachment'
								items={ weapon.attachments }
								onAdd={ () => this.openDialog() }
								onCardDelete={ (id) => this.deleteAttachment(id) }
							/>
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

LoadoutWeaponAttachments.propTypes = {
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

LoadoutWeaponAttachments.defaultProps = {
	filterAttachmentIds: [],
	onAttachmentAdded: (attachment) => {},
	onAttachmentDeleted: (attachmentId) => {}
}

export default LoadoutWeaponAttachments
