import './EditLoadout.css'
import React from 'react'
import { withRouter } from 'react-router-dom'

import AddWeaponDialog from './AddWeaponDialog'
import ModifyWeapon from './ModifyWeapon'

import AddCard from '../../shared/components/Cards/AddCard'
import Loader from '../../shared/components/Loader'

import database from '../../../firebase/database'

class EditLoadout extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loadoutId: '',
			loadout: null,
			isAddPrimaryDialogOpen: false,
			isAddSecondaryDialogOpen: false,
			loading: true,
			error: null
		}
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

	openAddPrimaryDialog() {
		this.setState({ isAddPrimaryDialogOpen: true })
	}

	closeAddPrimaryDialog() {
		this.setState({ isAddPrimaryDialogOpen: false })
	}

	onPrimarySelected(primaryId) {
		database.loadouts
			.addPrimary(this.state.loadoutId, primaryId)
			.then(() => this.pushNewWeapon('primaries', primaryId))
			.then(() => this.closeAddPrimaryDialog())
	}

	openAddSecondaryDialog() {
		this.setState({ isAddSecondaryDialogOpen: true })
	}

	closeAddSecondaryDialog() {
		this.setState({ isAddSecondaryDialogOpen: false })
	}

	onSecondarySelected(secondaryId) {
		database.loadouts
			.addSecondary(this.state.loadoutId, secondaryId)
			.then(() => this.pushNewWeapon('secondaries', secondaryId))
			.then(() => this.closeAddSecondaryDialog())
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

	renderWeapons(weapons, slot) {
		if (!weapons) {
			return null
		}

		return Object.keys(weapons)
			.map((key) => (
				<ModifyWeapon
					key={ key }
					loadoutId={ this.props.match.params.id }
					weaponId={ key }
					weapon={ weapons[key] }
					slot={ slot }
					onAttachmentAdded={ (attachment) => this.pushNewAttachment(slot, key, attachment) }
				/>
			))
	}

	render() {
		let { loading, error, loadout, isAddPrimaryDialogOpen, isAddSecondaryDialogOpen } = this.state

		return loading ? (
			<Loader />
		) : error ? (
			<div className='error-alert'>Error: {error}</div>
		) : (
			<React.Fragment>
				<h2>{loadout.name}</h2>
				<div>
					<h3>ADD A PRIMARY</h3>
					<div className='loadout-slot-list'>
						{this.renderWeapons(loadout.primaries, 'primaries')}
						<AddCard onClick={ () => this.openAddPrimaryDialog() } />
					</div>
				</div>

				<div>
					<h3>ADD A SECONDARY</h3>
					<div className='loadout-slot-list'>
						{this.renderWeapons(loadout.secondaries, 'secondaries')}
						<AddCard onClick={ () => this.openAddSecondaryDialog() } />
					</div>
				</div>

				<AddWeaponDialog
					weaponType='primaries'
					filterIds={ loadout.primaries && Object.keys(loadout.primaries) }
					isOpen={ isAddPrimaryDialogOpen }
					onSave={ (value) => this.onPrimarySelected(value) }
					onClose={ () => this.closeAddPrimaryDialog() }
				/>

				<AddWeaponDialog
					weaponType='secondaries'
					filterIds={ loadout.secondaries && Object.keys(loadout.secondaries) }
					isOpen={ isAddSecondaryDialogOpen }
					onSave={ (value) => this.onSecondarySelected(value) }
					onClose={ () => this.closeAddSecondaryDialog() }
				/>
			</React.Fragment>
		)
	}
}

export default withRouter(EditLoadout)
