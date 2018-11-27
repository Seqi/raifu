import React, { Component } from 'react'

import CardList from '../../shared/components/Cards/CardList'
import AddLoadoutDialog from './AddLoadoutDialog'

import database from '../../../firebase/database'
import Loader from '../../shared/components/Loader'
import Loadout from './Loadout'

class Loadouts extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loadouts: [],
			loading: true,
			isDialogOpen: false,
			error: null
		}
	}

	componentDidMount() {
		database.loadouts
			.get()
			.then((loadouts) => this.setState({ loadouts, loading: false }))
			.catch((err) => this.setState({ error: err.message, loading: false }))
	}

	handleDialogClose() {
		this.setState({ isDialogOpen: false })
	}

	add() {
		this.setState({ isDialogOpen: true })
	}

	save(value) {
		database.loadouts
			.add(value)
			.then((ref) => database.loadouts.getById(ref.key))
			.then((newVal) =>
				this.setState((prevState) => ({
					loadouts: [...prevState.loadouts, newVal]
				}))
			)
			.then(() => this.handleDialogClose())
	}

	renderLoadouts(loadouts) {
		return loadouts.map((loadout, idx) => <Loadout loadout={ loadout } key={ idx } />)
	}

	render() {
		let { loadouts, error, loading } = this.state
		return loading ? (
			<Loader />
		) : error ? (
			<div className='error-alert'>Error: {error}</div>
		) : (
			<div>
				<CardList buildTitle={ (item) => item.name } items={ loadouts } onAdd={ () => this.add() } cardType="loadout" />

				<AddLoadoutDialog
					isOpen={ this.state.isDialogOpen }
					onSave={ (value) => this.save(value) }
					onClose={ () => this.handleDialogClose() }
				/>
			</div>
		)
	}
}

export default Loadouts
