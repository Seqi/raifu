import './Loadout.css'
import React from 'react'
import { withRouter } from 'react-router-dom'

import AddWeaponDialog from './AddWeaponDialog'
import LoadoutWeapon from './LoadoutWeapon'

import AddCard from 'app/shared/components/Cards/AddCard'
import Loader from 'app/shared/components/Loader'

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
		let attachmentIds = Object.values(this.state.loadout.weapons)
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

	onPrimarySelected(weaponId) {
		database.loadouts
			.loadout(this.state.loadoutId)
			.weapons(weaponId)
			.add()
			.then(() => this.pushNewWeapon(weaponId))
			.then(() => this.closeDialog())
	}

	pushNewWeapon(id) {
		return database.weapons.getById(id)
			.then((snap) =>
				this.setState((prevState) => {
				// Add the new weapon onto the primaries
					let weapons = {
						...prevState.loadout.weapons,
						[snap.key]: snap.val()
					}

					let loadout = {
						...prevState.loadout,
						weapons: weapons
					}

					return { loadout }
				})
			)
	}

	deleteWeapon(weaponId) {
		this.setState((prevState) => {
			let weapons = prevState.loadout.weapons

			delete weapons[weaponId]

			return prevState
		})
	}

	pushNewAttachment(weaponId, attachmentId) {
		database.attachments.getById(attachmentId)
			.then((snap) => {
				this.setState((prevState) => {
					let editedWeapon = prevState.loadout.weapons[weaponId]

					if (!editedWeapon.attachments) {
						editedWeapon.attachments = {}
					}

					editedWeapon.attachments[attachmentId] = snap.val()

					return prevState
				})
			})
	}

	deleteAttachment(weaponId, attachmentId) {
		this.setState((prevState) => {
			let editedWeapon = prevState.loadout.weapons[weaponId]

			delete editedWeapon.attachments[attachmentId]

			return prevState
		})
	}

	renderWeapons(weapons) {
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
					filterAttachmentIds={ this.usedAttachmentIds }
					onDelete={ () => this.deleteWeapon(key) }
					onAttachmentAdded={ (attachment) => this.pushNewAttachment(key, attachment) }
					onAttachmentDeleted={ (attachment) => this.deleteAttachment(key, attachment) }
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
					<div className='loadout-slot-list'>
						{this.renderWeapons(loadout.weapons)}
						<AddCard onClick={ () => this.openDialog('addweapon') } />
					</div>
				</div>

				<EditLoadoutDialog
					name={ loadout.name }
					isOpen={ activeDialog === 'editloadout' }
					onSave={ (name) => this.onEditLoadoutName(name) }
					onClose={ () => this.closeDialog() }
				/>

				<AddWeaponDialog
					filterIds={ loadout.weapons && Object.keys(loadout.weapons) }
					isOpen={ activeDialog === 'addweapon' }
					onSave={ (value) => this.onPrimarySelected(value) }
					onClose={ () => this.closeDialog() }
				/>
			</React.Fragment>
		)
	}
}

export default withRouter(Loadout)
