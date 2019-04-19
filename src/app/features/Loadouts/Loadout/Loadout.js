import './Loadout.css'
import React from 'react'
import { withRouter } from 'react-router-dom'

import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import AddWeaponDialog from './AddWeaponDialog'
import AddGearDialog from './AddGearDialog'
import LoadoutWeapon from './LoadoutWeapon'
import EditLoadoutDialog from './EditLoadoutNameDialog'

import AddCard from 'app/shared/components/Cards/AddCard'
import Loader from 'app/shared/components/Loader'
import WeaponCardContent from 'app/shared/components/Images/WeaponCardContent'
import ConfirmDeleteDialog from 'app/shared/components/Cards/ConfirmDeleteDialog'
import CardDeleteButton from 'app/shared/components/Cards/CardDeleteButton'

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
			.then((loadout) => {
				if (!this.isUnmounted) {
					this.setState({ loadout, loading: false })
				}
			})
			.catch((err) => this.setState({ error: err.message, loading: false }))
	}

	componentWillUnmount() {
		this.isUnmounted = true
	}	
	
	buildTitle(item) {
		return item.nickname || `${item.platform} ${item.model}`
	}

	openDialog(id) {
		this.setState({ activeDialog: id })
	}

	closeDialog() {
		this.activeItem = null
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

	onGearSelected(gearId) {
		database.loadouts
			.loadout(this.state.loadout.id)
			.gear.add(gearId)
			.then((gear) => this.pushNewGear(gear))
			.then(() => this.closeDialog())
	}
	
	pushNewGear(gear) {
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
		database.loadouts
			.loadout(this.state.loadout.id).gear
			.delete(gearId)
			.then(() => {
				this.setState((prevState) => {
					let gear = prevState.loadout.gear.filter((w) => w.id !== gearId)
	
					let loadout = {
						...prevState.loadout,
						gear
					}
	
					return { loadout }
				})
			})
			.then(() => this.closeDialog())
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

	renderGear(gear) {
		if (!gear || !gear.length) {
			return null
		}

		let buildTitle = (gear) => gear.nickname || `${gear.platform} ${gear.model}`
		let buildSubtitle = (gear) => gear.brand || ''

		return gear.map((gear) => (
			<Card
				key={ gear.id }
				className={ 'card weapon-card' }
			>
				<CardDeleteButton onClick={ () => {
					this.activeItem = gear
					this.openDialog('deletegear') }
				 } />
				<CardHeader className='card-header' title={ buildTitle(gear) } subheader={ buildSubtitle(gear) } />
				<CardContent className='card-content'> <WeaponCardContent weapon={ gear } /> </CardContent>
			</Card>
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

				<Typography variant='h5'>Gear</Typography>
				<div>
					<div className='loadout-slot-list'>
						{this.renderGear(loadout.gear)}
						<AddCard onClick={ () => this.openDialog('addgear') } />
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

				<AddGearDialog
					filterIds={ loadout.gear && loadout.gear.map((w) => w.id) }
					isOpen={ activeDialog === 'addgear' }
					onSave={ (value) => this.onGearSelected(value) }
					onClose={ () => this.closeDialog() }
				/>

				<ConfirmDeleteDialog
					title={ this.activeItem  ? this.buildTitle(this.activeItem) : '' }
					isOpen={ activeDialog === 'deletegear' }
					onConfirm={ () => this.deleteGear(this.activeItem.id) }
					onClose={ () => this.closeDialog() }
				/>
			</React.Fragment>
		)
	}
}

export default withRouter(Loadout)
