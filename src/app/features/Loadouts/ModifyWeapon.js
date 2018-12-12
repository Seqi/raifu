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

	handleWeaponDelete() {}

	render() {
		let { isDialogOpen, dialogType } = this.state

		return (
			<div className='weapon-mod'>
				<Card className='card weapon-card'>
					<CardDeleteButton onClick={ () => this.handleDialogOpen('delete') } />
					<CardHeader title={ this.buildTitle() } subheader={ this.buildSubtitle() } />
					<CardContent>{JSON.stringify(this.props.weapon)}</CardContent>
				</Card>

				<ModifyWeaponAttachments { ...this.props } />

				{dialogType === 'delete' && (
					<ConfirmDeleteDialog
						title={ 'dick' }
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
