import './ModifyWeapon.css'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import CardList from '../../shared/components/Cards/CardList'
import AddAttachmentDialog from './AddAttachmentDialog'

import database from '../../../firebase/database'

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

	filterAttachments() {}

	render() {
		let { weapon, filterAttachmentIds } = this.props
		let { isDialogOpen } = this.state

		return (
			<div className='weapon-mod'>
				<Card className='card weapon-card'>
					<CardHeader title={ this.buildTitle() } subheader={ this.buildSubtitle() } />
					<CardContent>{JSON.stringify(this.props.weapon)}</CardContent>
				</Card>

				<div className='weapon-attachments'>
					<CardList
						cardType='attachment'
						buildSubtitle={ () => '' }
						items={ weapon.attachments || {} }
						onAdd={ () => this.handleDialogOpen() }
					/>
				</div>

				<AddAttachmentDialog
					weaponId={ this.props.weaponId }
					weaponName={ this.buildTitle() }
					filterIds={ filterAttachmentIds }
					isOpen={ isDialogOpen }
					onClose={ () => this.handleDialogClose() }
					onSave={ (id) => this.handleSave(id) }
				/>
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
	onAttachmentAdded: PropTypes.func
}

ModifyWeapon.defaultProps = {
	filterAttachmentIds: [],
	onAttachmentAdded: (attachment) => {}
}

export default ModifyWeapon
