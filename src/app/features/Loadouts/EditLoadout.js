import React from 'react'
import { withRouter } from 'react-router-dom'

import AddWeaponDialog from './AddWeaponDialog'

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
		database.loadouts.addPrimary(this.state.loadoutId, primaryId)
		this.closeAddPrimaryDialog()
	}

	openAddSecondaryDialog() {
		this.setState({ isAddSecondaryDialogOpen: true })
	}

	closeAddSecondaryDialog() {
		this.setState({ isAddSecondaryDialogOpen: false })
	}

	onSecondarySelected(secondaryId) {
		database.loadouts.addSecondary(this.state.loadoutId, secondaryId)
		this.closeAddSecondaryDialog()
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
					<AddCard onClick={ () => this.openAddPrimaryDialog() } />
				</div>

				<div>
					<h3>ADD A SECONDARY</h3>
					<AddCard onClick={ () => this.openAddSecondaryDialog() } />
				</div>

				<AddWeaponDialog
					weaponType='primaries'
					filterIds={ Object.keys(loadout.primaries) }
					isOpen={ isAddPrimaryDialogOpen }
					onSave={ (value) => this.onPrimarySelected(value) }
					onClose={ () => this.closeAddPrimaryDialog() }
				/>

				<AddWeaponDialog
					weaponType='secondaries'
					filterIds={ Object.keys(loadout.secondaries) }
					isOpen={ isAddSecondaryDialogOpen }
					onSave={ (value) => this.onSecondarySelected(value) }
					onClose={ () => this.closeAddSecondaryDialog() }
				/>
			</React.Fragment>
		)
	}
}

export default withRouter(EditLoadout)
