import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import AddLoadoutDialog from './AddLoadoutDialog'
import Loader from '../../shared/components/Loader'
import CardList from '../../shared/components/Cards/CardList'

import database from '../../../firebase/database'

class LoadoutList extends Component {
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
			.then((snap) => {
				// Place the key onto each object
				let val = snap.val() || {}

				return Object.keys(val)
					.map((key) => {
						return { id: key, ...val[key] }
					})
			})
			.then((loadouts) => this.setState({ loadouts, loading: false }))
			.catch((err) => this.setState({ error: err.message, loading: false }))
	}

	handleDialogClose() {
		this.setState({ isDialogOpen: false })
	}

	add() {
		this.setState({ isDialogOpen: true })
	}

	view(loadout) {
		this.props.history.push(loadout.id)
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

	render() {
		let { loadouts, error, loading } = this.state
		return loading ? (
			<Loader />
		) : error ? (
			<div className='error-alert'>Error: {error}</div>
		) : (
			<React.Fragment>
				<CardList
					buildTitle={ (item) => item.name }
					items={ loadouts }
					cardType='loadout'
					onAdd={ () => this.add() }
					onCardClick={ (loadout) => this.view(loadout) }
				/>

				<AddLoadoutDialog
					isOpen={ this.state.isDialogOpen }
					onSave={ (value) => this.save(value) }
					onClose={ () => this.handleDialogClose() }
				/>
			</React.Fragment>
		)
	}
}

export default withRouter(LoadoutList)
