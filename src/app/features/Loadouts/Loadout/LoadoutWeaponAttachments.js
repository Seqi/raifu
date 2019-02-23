import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AddAttachmentDialog from './AddAttachmentDialog'
import CardList from 'app/shared/components/Cards/CardList'

import database from '../../../../firebase/database'

class LoadoutWeaponAttachments extends Component {
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

	buildWeaponName() {
		let { weapon } = this.props
		return weapon.nickname || `${weapon.platform} ${weapon.model}`
	}

	handleSave(attachmentId) {
		let { loadoutId, weaponId, onAttachmentAdded } = this.props

		database.loadouts
			.loadout(loadoutId)
			.weapons(weaponId)
			.addAttachment(attachmentId)
			.then(() => this.handleDialogClose())
			.then(() => onAttachmentAdded(attachmentId))
	}

	handleDelete(attachmentId) {
		let { loadoutId, weaponId, onAttachmentDeleted } = this.props

		database.loadouts
			.loadout(loadoutId)
			.weapons(weaponId)
			.removeAttachment(attachmentId)
			.then(() => this.handleDialogClose())
			.then(() => onAttachmentDeleted(attachmentId))
	}

	render() {
		let { weapon, weaponId, filterAttachmentIds } = this.props

		return (
			<React.Fragment>
				<div className='weapon-attachments'>
					<CardList
						cardType='attachment'
						buildSubtitle={ () => '' }
						items={ weapon.attachments }
						onAdd={ () => this.handleDialogOpen() }
						onCardDelete={ (id) => this.handleDelete(id) }
					/>
				</div>

				<AddAttachmentDialog
					weaponId={ weaponId }
					weaponName={ this.buildWeaponName() }
					filterIds={ filterAttachmentIds }
					isOpen={ this.state.isDialogOpen }
					onClose={ () => this.handleDialogClose() }
					onSave={ (id) => this.handleSave(id) }
				/>
			</React.Fragment>
		)
	}
}

LoadoutWeaponAttachments.propTypes = {
	loadoutId: PropTypes.string.isRequired,
	weaponId: PropTypes.string.isRequired,
	weapon: PropTypes.object.isRequired,
	filterAttachmentIds: PropTypes.array,
	onAttachmentAdded: PropTypes.func,
	onAttachmentDeleted: PropTypes.func
}

LoadoutWeaponAttachments.defaultProps = {
	filterAttachmentIds: [],
	onAttachmentAdded: (attachment) => {},
	onAttachmentDeleted: (attachmentId) => {}
}

export default LoadoutWeaponAttachments
