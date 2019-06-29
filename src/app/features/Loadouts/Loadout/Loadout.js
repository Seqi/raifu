import React from 'react'
import { withRouter } from 'react-router-dom'

import { Loading, Error } from 'app/shared/components'
import LoadoutView from 'app/shared/components/Views/Loadout/LoadoutView'
import ReactiveTitle from 'app/shared/components/Text/ReactiveTitle'

import EditLoadoutDialog from './EditLoadoutNameDialog'
import SetShareableDialog from './SetShareableDialog'
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

	componentDidMount() {
		this.loadLoadout()
	}

	componentWillUnmount() {
		this.isUnmounted = true
	}
	
	loadLoadout() {
		database.loadouts
			.getById(this.props.match.params.id)
			.then((loadout) => {
				if (!this.isUnmounted) {
					this.setState({ loadout, error: null, loading: false })
				}
			})
			.catch((err) => this.setState({ error: err.statusText || err.message || err, loading: false }))
	}

	openDialog(id) {
		this.setState({ activeDialog: id })
	}

	closeDialog() {
		this.activeItem = null
		this.setState({ activeDialog: null })
	}

	editLoadout(updatedLoadout) {
		let { loadout } = this.state

		return database.loadouts
			.edit(loadout.id, { ...updatedLoadout })
			.then(() => this.onLoadoutUpdated(updatedLoadout))
			.then(() => this.closeDialog())
	}
	
	onLoadoutUpdated(updatedLoadout) {
		this.setState((prevState) => {
			let newLoadout = {
				...prevState.loadout,
				...updatedLoadout
			}

			return { loadout: newLoadout }
		})
	}

	addWeapon(weapon) {
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
	
	addGear(gear) {
		this.setState((prevState) => {
			let updatedGear = [...prevState.loadout.gear, gear]
	
			let loadout = {
				...prevState.loadout,
				gear: updatedGear
			}
	
			return { loadout }
		})
	}

	deleteGear(gearId) {
		this.setState((prevState) => {
			let gear = prevState.loadout.gear.filter((w) => w.id !== gearId)

			let loadout = {
				...prevState.loadout,
				gear
			}

			return { loadout }
		})
	}

	addAttachments(weaponId, attachments) {
		this.setState((prevState) => {
			let currWeapons = prevState.loadout.weapons

			// Find the weapon to add the attachment to and create a copy
			let editedWeapon = { ...currWeapons.find((w) => w.id === weaponId) }

			// Add the attachment to the weapon
			if (!editedWeapon.attachments) {
				editedWeapon.attachments = []
			}

			editedWeapon.attachments = editedWeapon.attachments.concat(attachments)

			// Rebuild up the state object, ensuring we preserve the order of weapons
			let weaponIndex = currWeapons.findIndex((w) => w.id === weaponId)
			let weapons = currWeapons.slice()
			weapons[weaponIndex] = editedWeapon

			let loadout = {
				...prevState.loadout,
				weapons
			}

			return { loadout }
		})
	}

	deleteAttachment(weaponId, attachmentId) {
		this.setState((prevState) => {
			let currWeapons = prevState.loadout.weapons

			// Find the weapon to delete the attachment on and create a copy
			let editedWeapon = { ...currWeapons.find((w) => w.id === weaponId) }

			// Remove attachment
			editedWeapon.attachments = editedWeapon.attachments.filter((a) => a.id !== attachmentId)

			// Rebuild up the state object, ensuring we preserve the order of weapons
			let weaponIndex = currWeapons.findIndex((w) => w.id === weaponId)
			let weapons = currWeapons.slice()
			weapons[weaponIndex] = editedWeapon

			let loadout = {
				...prevState.loadout,
				weapons
			}

			return { loadout }
		})
	}

	render() {
		let { loading, error, loadout, activeDialog } = this.state

		if (loading) {			
			return <Loading />
		}
		
		if (error) {
			return <Error error={ error } onRetry={ () => this.loadLoadout() } />
		}

		return (
			<React.Fragment>
				<ReactiveTitle>
					{ loadout.name }					
					<i onClick={ () => this.openDialog('edit') } className='fa fa-pen icon-action' />
					<i onClick={ () => this.openDialog('share') } className='fa fa-link icon-action' />
				</ReactiveTitle>

				<LoadoutView 
					loadout={ loadout } 
					canEdit={ true }
					onWeaponAdd={ (weapon) => this.addWeapon(weapon) }
					onWeaponDelete={ (weaponId) => this.deleteWeapon(weaponId) }
					onAttachmentsAdd={ (weaponId, attachments) => this.addAttachments(weaponId, attachments) }
					onAttachmentDelete={ (weaponId, attachmentId) => this.deleteAttachment(weaponId, attachmentId) }
					onGearAdd={ (gear) => this.addGear(gear) }
					onGearDelete={ (gearId) => this.deleteGear(gearId) }
				/>

				<EditLoadoutDialog
					name={ loadout.name }
					isOpen={ activeDialog === 'edit' }
					onSave={ (name) => this.editLoadout(name) }
					onClose={ () => this.closeDialog() }
				/>

				<SetShareableDialog
					loadout={ loadout }
					isOpen={ activeDialog === 'share' }
					onShare={ (isShared) => this.onLoadoutUpdated({...loadout, shared: isShared }) }
					onClose={ () => this.closeDialog() }
				/>
			</React.Fragment>
		)
	}
}


export default withRouter(Loadout)
