import './Loadout.css'
import React from 'react'
import { withRouter } from 'react-router-dom'

import Typography from '@material-ui/core/Typography'

import AddWeaponDialog from './AddWeaponDialog'
import LoadoutWeapon from './LoadoutWeapon'
import EditLoadoutDialog from './EditLoadoutNameDialog'

import AddCard from 'app/shared/components/Cards/AddCard'
import Loader from 'app/shared/components/Loader'

import database from '../../../../firebase/database'

class Loadout extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loadout: null,
			activeDialog: null,
			loading: true,
			error: null
		}
	}

	get usedAttachmentIds() {
		return this.state.loadout.weapons
			.flatMap((weapon) => weapon.attachments || [])
			.map((attachment) => attachment.id)
	}

	componentDidMount() {
		database.loadouts
			.getById(this.props.match.params.id)
			.then((loadout) => this.setState({ loadout, loading: false }))
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
		let { loadout } = this.state

		database.loadouts
			.edit({ id: loadout.id, name })
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

	onWeaponSelected(weaponId) {
		database.loadouts
			.loadout(this.state.loadout.id)
			.weapons.add(weaponId)
			.then((weapon) => this.pushNewWeapon(weapon))
			.then(() => this.closeDialog())
	}

	pushNewWeapon(weapon) {
		this.setState((prevState) => {
			let weapons = [...prevState.loadout.weapons, weapon]

			let loadout = {
				...prevState.loadout,
				weapons: weapons
			}

			return { loadout }
		})
	}

	deleteWeapon(weaponId) {
		this.setState((prevState) => {
			let weapons = prevState.loadout.weapons.filter((w) => w.id !== weaponId)

			let loadout = {
				...prevState.loadout,
				weapons
			}

			return { loadout }
		})
	}

	pushNewAttachment(weaponId, attachment) {
		this.setState((prevState) => {
			// Find the weapon to add the attachment to and create a copy
			let editedWeapon = { ...prevState.loadout.weapons.find((w) => w.id === weaponId) }

			// Add the attachment to the weapon
			if (!editedWeapon.attachments) {
				editedWeapon.attachments = []
			}

			editedWeapon.attachments.push(attachment)

			// Rebuild up the state object
			let weapons = [...prevState.loadout.weapons.filter((w) => w.id !== weaponId), editedWeapon]

			let loadout = {
				...prevState.loadout,
				weapons
			}

			return { loadout }
		})
	}

	deleteAttachment(weaponId, attachmentId) {
		this.setState((prevState) => {
			// Find the weapon to add the attachment to and create a copy
			let editedWeapon = { ...prevState.loadout.weapons.find((w) => w.id === weaponId) }

			// Remove attachment
			editedWeapon.attachments = editedWeapon.attachments.filter((a) => a.id !== attachmentId)

			// Rebuild up the state object
			let weapons = [...prevState.loadout.weapons.filter((w) => w.id !== weaponId), editedWeapon]

			let loadout = {
				...prevState.loadout,
				weapons
			}

			return { loadout }
		})
	}

	renderWeapons(weapons) {
		if (!weapons || !weapons.length) {
			return null
		}

		return weapons.map((weapon) => (
			<LoadoutWeapon
				key={ weapon.id }
				loadoutId={ this.props.match.params.id }
				weapon={ weapon }
				filterAttachmentIds={ this.usedAttachmentIds }
				onDelete={ () => this.deleteWeapon(weapon.id) }
				onAttachmentAdded={ (attachment) => this.pushNewAttachment(weapon.id, attachment) }
				onAttachmentDeleted={ (attachment) => this.deleteAttachment(weapon.id, attachment) }
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
				<Typography variant='h5'>
					{loadout.name}
					<i onClick={ () => this.openDialog('editloadout') } className='fa fa-pen icon-action' />
				</Typography>

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
					filterIds={ loadout.weapons && loadout.weapons.map((w) => w.id) }
					isOpen={ activeDialog === 'addweapon' }
					onSave={ (value) => this.onWeaponSelected(value) }
					onClose={ () => this.closeDialog() }
				/>
			</React.Fragment>
		)
	}
}

export default withRouter(Loadout)
