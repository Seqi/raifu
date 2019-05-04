import './Loadout.css'
import React from 'react'
import { withRouter } from 'react-router-dom'

import Typography from '@material-ui/core/Typography'

import EditLoadoutDialog from './EditLoadoutNameDialog'
import LoadoutGearList from './GearList/LoadoutGearList'
import LoadoutWeaponList from './WeaponList/LoadoutWeaponList'

import Loader from 'app/shared/components/Loader'

import LoadoutContext from './LoadoutContext'

import database from '../../../../firebase/database'
import { withTheme } from '@material-ui/core'

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

	openDialog(id) {
		this.setState({ activeDialog: id })
	}

	closeDialog() {
		this.activeItem = null
		this.setState({ activeDialog: null })
	}

	editLoadoutName(name) {
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

	addAttachment(weaponId, attachment) {
		this.setState((prevState) => {
			let currWeapons = prevState.loadout.weapons

			// Find the weapon to add the attachment to and create a copy
			let editedWeapon = { ...currWeapons.find((w) => w.id === weaponId) }

			// Add the attachment to the weapon
			if (!editedWeapon.attachments) {
				editedWeapon.attachments = []
			}

			editedWeapon.attachments.push(attachment)

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
			return <Loader />
		}
		
		if (error) {
			return <div className='error-alert'>Error: {error}</div>
		}

		return (
			<React.Fragment>
				<span>
					<Typography variant='h3' style={ {
						borderBottom: `3px solid ${this.props.theme.palette.primary.main}`
					} } >
						{loadout.name}					
						<i onClick={ () => this.openDialog('editloadout') } className='fa fa-pen icon-action' />
					</Typography>
				</span>

				<LoadoutContext.Provider value={ loadout }>
					<div className='loadout-slot-list'>
						<LoadoutWeaponList
							loadoutId={ loadout.id }
							weapons={ loadout.weapons }
							onAdd={ weapon => this.addWeapon(weapon) } 
							onDelete={ id => this.deleteWeapon(id) } 
							onAttachmentAdd={ (weaponId, attachment) => this.addAttachment(weaponId, attachment) }
							onAttachmentDelete={ (weaponId, attachmentId) => this.deleteAttachment(weaponId, attachmentId) }
						/>
					</div>

					<Typography variant='h5'>Gear</Typography>
					<div className='loadout-slot-list'>
						<LoadoutGearList 
							loadoutId={ loadout.id } 
							gear={ loadout.gear }
							onAdd={ gear => this.addGear(gear) } 
							onDelete={ id => this.deleteGear(id) } 
						/>
					</div>
				</LoadoutContext.Provider>

				<EditLoadoutDialog
					name={ loadout.name }
					isOpen={ activeDialog === 'editloadout' }
					onSave={ (name) => this.editLoadoutName(name) }
					onClose={ () => this.closeDialog() }
				/>
			</React.Fragment>
		)
	}
}


export default withTheme()(withRouter(Loadout))
