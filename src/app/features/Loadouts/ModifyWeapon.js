import './ModifyWeapon.css'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import CardList from '../../shared/components/Cards/CardList'
import AddAttachmentDialog from './AddAttachmentDialog'

import database from '../../../firebase/database'
import CardDeleteButton from '../../shared/components/Cards/CardDeleteButton'
import ConfirmDeleteDialog from '../../shared/components/Cards/ConfirmDeleteDialog'

class ModifyWeapon extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isDialogOpen: false,
			dialogType: ''
		}
	}

	buildTitle() {
		let { weapon } = this.props
		return weapon.nickname || `${weapon.platform} ${weapon.model}`
	}

	buildSubtitle() {
		return this.props.weapon.brand
	}

	handleDialogOpen(type) {
		this.setState({ isDialogOpen: true, dialogType: type })
	}

	handleDialogClose() {
		this.setState({ isDialogOpen: false, dialogType: '' })
	}

	handleSave(attachmentId) {
		let { loadoutId, weaponId, slot, onAttachmentAdded } = this.props

		database.loadouts
			.loadout(loadoutId)
			// eslint-disable-next-line no-unexpected-multiline
			[slot](weaponId)
			.addAttachment(attachmentId)
			.then(() => this.handleDialogClose())
			.then(() => onAttachmentAdded(attachmentId))
	}

	handleWeaponDelete() {}

	handleAttachmentDelete(attachmentId) {
		let { loadoutId, weaponId, slot, onAttachmentDeleted } = this.props
		database.loadouts
			.loadout(loadoutId)
			// eslint-disable-next-line no-unexpected-multiline
			[slot](weaponId)
			.removeAttachment(attachmentId)
			.then(() => this.handleDialogClose())
			.then(() => onAttachmentDeleted(attachmentId))
	}

	filterAttachments() {}

	render() {
		let { weapon, filterAttachmentIds } = this.props
		let { isDialogOpen, dialogType } = this.state

		return (
			<div className='weapon-mod'>
				<Card className='card weapon-card'>
					<CardDeleteButton onClick={ () => this.handleDialogOpen('delete') } />
					<CardHeader title={ this.buildTitle() } subheader={ this.buildSubtitle() } />
					<CardContent>{JSON.stringify(this.props.weapon)}</CardContent>
				</Card>

				{/*  Move attachment list to own component */}
				<div className='weapon-attachments'>
					<CardList
						cardType='attachment'
						buildSubtitle={ () => '' }
						items={ weapon.attachments || {} }
						onAdd={ () => this.handleDialogOpen('add') }
						onCardDelete={ (id) => this.handleAttachmentDelete(id) }
					/>
				</div>

				{dialogType === 'add' && (
					<AddAttachmentDialog
						weaponId={ this.props.weaponId }
						weaponName={ this.buildTitle() }
						filterIds={ filterAttachmentIds }
						isOpen={ isDialogOpen }
						onClose={ () => this.handleDialogClose() }
						onSave={ (id) => this.handleSave(id) }
					/>
				)}

				{dialogType === 'delete' && (
					<ConfirmDeleteDialog
						title={ this.buildTitle() }
						isOpen={ isDialogOpen }
						onClose={ () => this.handleDialogClose() }
						onConfirm={ () => this.handleWeaponDelete() }
					/>
				)}
			</div>
		)
	}
}

ModifyWeapon.propTypes = {
	loadoutId: PropTypes.string.isRequired,
	weaponId: PropTypes.string.isRequired,
	weapon: PropTypes.object.isRequired,
	slot: PropTypes.oneOf(['primaries', 'secondaries']).isRequired,
	filterAttachmentIds: PropTypes.array,
	onAttachmentAdded: PropTypes.func,
	onAttachmentDeleted: PropTypes.func
}

ModifyWeapon.defaultProps = {
	filterAttachmentIds: [],
	onAttachmentAdded: (attachment) => {},
	onAttachmentDeleted: (attachmentId) => {}
}

export default ModifyWeapon
