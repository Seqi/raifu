import React, { Component } from 'react'

import AddPrimaryDialog from './AddPrimaryDialog'

import database from '../../../../firebase/database'
import Loader from '../../../shared/components/Loader'
import CardList from '../../../shared/components/Cards/CardList'

class PrimariesList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			weapons: {},
			loading: true,
			isAddDialogOpen: false,
			error: null
		}
	}

	componentDidMount() {
		database.primaries
			.get()
			.then((snap) => Object.values(snap.val() || {}))
			.then((weapons) => {
				this.setState({ weapons, loading: false })
			})
			.catch((err) => this.setState({ error: err.message, loading: false }))
	}

	handleDialogClose() {
		this.setState({ isAddDialogOpen: false })
	}

	add() {
		this.setState({ isAddDialogOpen: true })
	}

	save(value) {
		database.primaries
			.add(value)
			.then((ref) => database.primaries.getById(ref.key))
			.then((snap) => snap.val())
			.then((newVal) =>
				this.setState((prevState) => ({
					weapons: [...prevState.weapons, newVal]
				}))
			)
			.then(() => this.handleDialogClose())
	}

	buildTitle(weapon) {
		return weapon.nickname || `${weapon.platform} ${weapon.model}`
	}

	render() {
		let { weapons, error, loading } = this.state
		return (
			<div>
				<h2>PRIMARIES</h2>
				{loading ? (
					<Loader />
				) : error ? (
					<div className='error-alert'>Error: {error}</div>
				) : (
					<CardList buildTitle={ this.buildTitle } items={ weapons } onAdd={ () => this.add() } />
				)}

				<AddPrimaryDialog
					isOpen={ this.state.isAddDialogOpen }
					onSave={ (value) => this.save(value) }
					onClose={ () => this.handleDialogClose() }
				/>
			</div>
		)
	}
}

export default PrimariesList
