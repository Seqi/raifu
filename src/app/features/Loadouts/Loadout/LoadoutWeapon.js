import './LoadoutWeapon.css'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import LoadoutWeaponAttachments from './LoadoutWeaponAttachments'
import CardDeleteButton from 'app/shared/components/Cards/CardDeleteButton'
import ConfirmDeleteDialog from 'app/shared/components/Cards/ConfirmDeleteDialog'
import WeaponCardContent from 'app/shared/components/Images/WeaponCardContent'
import database from '../../../../firebase/database'

class LoadoutWeapon extends Component {
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
		let { loadoutId, weaponId, onDelete } = this.props

		database.loadouts
			.loadout(loadoutId)
			.weapons(weaponId)
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
					<CardHeader className='card-header' title={ this.buildTitle() } subheader={ this.buildSubtitle() } />
					<CardContent className='card-content'>
						<WeaponCardContent weapon={ this.props.weapon } />
					</CardContent>
				</Card>

				<LoadoutWeaponAttachments { ...this.props } />

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

LoadoutWeapon.propTypes = {
	// TODO: Move all of this stuff to a React.Context
	loadoutId: PropTypes.string.isRequired,
	weaponId: PropTypes.string.isRequired,
	weapon: PropTypes.object.isRequired,
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
