import './Loadout.css'
import React from 'react'
import { withRouter } from 'react-router-dom'

import AddWeaponDialog from './AddWeaponDialog'
import LoadoutWeapon from './LoadoutWeapon'

import AddCard from '../../../shared/components/Cards/AddCard'
import Loader from '../../../shared/components/Loader'

import database from '../../../../firebase/database'
import EditLoadoutDialog from './EditLoadoutNameDialog'

class Loadout extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loadoutId: '',
			loadout: null,
			activeDialog: null,
			loading: true,
			error: null
		}
	}

	get usedAttachmentIds() {
		let { primaries, secondaries } = this.state.loadout

		let weapons = { ...primaries, ...secondaries }

		let attachmentIds = Object.values(weapons)
			.flatMap((weapon) => weapon.attachments)
			.flatMap((attachments) => Object.keys(attachments || {}))

		return attachmentIds
	}

	componentDidMount() {
		database.loadouts
			.getById(this.props.match.params.id)
			.then((snap) => this.setState({ loadoutId: snap.key, loadout: snap.val(), loading: false }))
			.catch((err) => this.setState({ error: err.message, loading: false }))
	}

	componentWillUnmount() {
		// Clean up the url when navigating away
		this.props.history.push('../')
	}

	openDialog(id) {
		this.setState({ activeDialog: id })
	}

	closeDialog() {
		this.setState({ activeDialog: null })
	}

	onEditLoadoutName(name) {
		database.loadouts
			.loadout(this.state.loadoutId)
			.update({ name })
			.then(() => {
				this.setState((prevState) => {
					let newLoadout = {
						...prevState.loadout,
						name
					}

					return { loadout: newLoadout }
				})
			})
			.then(() => this.closeDialog())
	}

	onPrimarySelected(primaryId) {
		database.loadouts
			.loadout(this.state.loadoutId)
			.primaries(primaryId)
			.add()
			.then(() => this.pushNewWeapon('primaries', primaryId))
			.then(() => this.closeDialog())
	}

	onSecondarySelected(secondaryId) {
		database.loadouts
			.loadout(this.state.loadoutId)
			.secondaries(secondaryId)
			.add()
			.then(() => this.pushNewWeapon('secondaries', secondaryId))
			.then(() => this.closeDialog())
	}

	pushNewWeapon(slot, id) {
		return database[slot].getById(id)
			.then((snap) =>
				this.setState((prevState) => {
				// Add the new weapon onto the primaries
					let weapons = {
						...prevState.loadout[slot],
						[snap.key]: snap.val()
					}

					let loadout = {
						...prevState.loadout,
						[slot]: weapons
					}

					return { loadout }
				})
			)
	}

	deleteWeapon(slot, weaponId) {
		this.setState((prevState) => {
			let slotWeapons = prevState.loadout[slot]

			delete slotWeapons[weaponId]

			return prevState
		})
	}

	pushNewAttachment(slot, weaponId, attachmentId) {
		database.attachments.getById(attachmentId)
			.then((snap) => {
				this.setState((prevState) => {
					let editedWeapon = prevState.loadout[slot][weaponId]

					if (!editedWeapon.attachments) {
						editedWeapon.attachments = {}
					}

					editedWeapon.attachments[attachmentId] = snap.val()

					return prevState
				})
			})
	}

	deleteAttachment(slot, weaponId, attachmentId) {
		this.setState((prevState) => {
			let editedWeapon = prevState.loadout[slot][weaponId]

			delete editedWeapon.attachments[attachmentId]

			return prevState
		})
	}

	renderWeapons(weapons, slot) {
		if (!weapons) {
			return null
		}

		return Object.keys(weapons)
			.map((key) => (
				<LoadoutWeapon
					key={ key }
					loadoutId={ this.props.match.params.id }
					weaponId={ key }
					weapon={ weapons[key] }
					slot={ slot }
					filterAttachmentIds={ this.usedAttachmentIds }
					onDelete={ () => this.deleteWeapon(slot, key) }
					onAttachmentAdded={ (attachment) => this.pushNewAttachment(slot, key, attachment) }
					onAttachmentDeleted={ (attachment) => this.deleteAttachment(slot, key, attachment) }
				/>
			))
	}

	render() {
		let { loading, error, loadout, activeDialog } = this.state

		return loading ? (
			<Loader />
		) : error ? (
			<div className='error-alert'>Error: {error}</div>
		) : (
			<React.Fragment>
				<h2 className='icon-header'>
					{loadout.name}
					<i onClick={ () => this.openDialog('editloadout') } className='fa fa-pen' />
				</h2>
				<div>
					<h3>ADD A PRIMARY</h3>
					<div className='loadout-slot-list'>
						{this.renderWeapons(loadout.primaries, 'primaries')}
						<AddCard onClick={ () => this.openDialog('addprimary') } />
					</div>
				</div>

				<div>
					<h3>ADD A SECONDARY</h3>
					<div className='loadout-slot-list'>
						{this.renderWeapons(loadout.secondaries, 'secondaries')}
						<AddCard onClick={ () => this.openDialog('addsecondary') } />
					</div>
				</div>

				<EditLoadoutDialog
					name={ loadout.name }
					isOpen={ activeDialog === 'editloadout' }
					onSave={ (name) => this.onEditLoadoutName(name) }
					onClose={ () => this.closeDialog() }
				/>

				<AddWeaponDialog
					weaponType='primaries'
					filterIds={ loadout.primaries && Object.keys(loadout.primaries) }
					isOpen={ activeDialog === 'addprimary' }
					onSave={ (value) => this.onPrimarySelected(value) }
					onClose={ () => this.closeDialog() }
				/>

				<AddWeaponDialog
					weaponType='secondaries'
					filterIds={ loadout.secondaries && Object.keys(loadout.secondaries) }
					isOpen={ activeDialog === 'addsecondary' }
					onSave={ (value) => this.onSecondarySelected(value) }
					onClose={ () => this.closeDialog() }
				/>
			</React.Fragment>
		)
	}
}

export default withRouter(Loadout)
