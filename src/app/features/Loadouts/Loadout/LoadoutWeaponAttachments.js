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

	handleSave(attachmentId) {
		let { loadoutId, weapon, onAttachmentAdded } = this.props

		database.loadouts
			.loadout(loadoutId)
			.weapons.weapon(weapon.id)
			.attachments.add(attachmentId)
			.then((attachment) => onAttachmentAdded(attachment))
			.then(() => this.handleDialogClose())
	}

	handleDelete(attachmentId) {
		let { loadoutId, weapon, onAttachmentDeleted } = this.props

		database.loadouts
			.loadout(loadoutId)
			.weapons.weapon(weapon.id)
			.attachments.delete(attachmentId)
			.then(() => this.handleDialogClose())
			.then(() => onAttachmentDeleted(attachmentId))
	}

	render() {
		let { weapon, filterAttachmentIds } = this.props

		return (
			<React.Fragment>
				<div className='weapon-attachments'>
					<CardList
						cardType='attachment'
						items={ weapon.attachments }
						onAdd={ () => this.handleDialogOpen() }
						onCardDelete={ (id) => this.handleDelete(id) }
					/>
				</div>

				<AddAttachmentDialog
					weaponId={ weapon.id }
					weaponName={ weapon.getTitle() }
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
