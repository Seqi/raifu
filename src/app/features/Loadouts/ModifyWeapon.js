import './ModifyWeapon.css'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import database from '../../../firebase/database'
import CardDeleteButton from '../../shared/components/Cards/CardDeleteButton'
import ConfirmDeleteDialog from '../../shared/components/Cards/ConfirmDeleteDialog'
import ModifyWeaponAttachments from './ModifyWeaponAttachments'

class ModifyWeapon extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isDialogOpen: false
		}
	}

	buildTitle() {
		let { weapon } = this.props
		return weapon.nickname || `${weapon.platform} ${weapon.model}`
	}

	buildSubtitle() {
		return this.props.weapon.brand
	}

	handleDialogOpen() {
		this.setState({ isDialogOpen: true })
	}

	handleDialogClose() {
		this.setState({ isDialogOpen: false })
	}

	handleDelete() {
		let { loadoutId, slot, weaponId, onDelete } = this.props

		database.loadouts
			.loadout(loadoutId)
			// eslint-disable-next-line no-unexpected-multiline
			[slot](weaponId)
			.delete()
			.then(() => this.handleDialogClose())
			.then(() => onDelete())
	}

	render() {
		let { isDialogOpen } = this.state

		return (
			<div className='weapon-mod'>
				<Card className='card weapon-card'>
					<CardDeleteButton onClick={ () => this.handleDialogOpen() } />
					<CardHeader title={ this.buildTitle() } subheader={ this.buildSubtitle() } />
					<CardContent>{JSON.stringify(this.props.weapon)}</CardContent>
				</Card>

				<ModifyWeaponAttachments { ...this.props } />

				<ConfirmDeleteDialog
					title={ this.buildTitle() }
					isOpen={ isDialogOpen }
					onClose={ () => this.handleDialogClose() }
					onConfirm={ () => this.handleDelete() }
				/>
			</div>
		)
	}
}

ModifyWeapon.propTypes = {
	// TODO: Move all of this stuff to a React.Context
	loadoutId: PropTypes.string.isRequired,
	weaponId: PropTypes.string.isRequired,
	weapon: PropTypes.object.isRequired,
	slot: PropTypes.oneOf(['primaries', 'secondaries']).isRequired,
	filterAttachmentIds: PropTypes.array,
	onDelete: PropTypes.func,
	onAttachmentAdded: PropTypes.func,
	onAttachmentDeleted: PropTypes.func
}

ModifyWeapon.defaultProps = {
	filterAttachmentIds: [],
	onDelete: () => {},
	onAttachmentAdded: (attachment) => {},
	onAttachmentDeleted: (attachmentId) => {}
}

export default ModifyWeapon
