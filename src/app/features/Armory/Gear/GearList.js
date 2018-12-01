import React, { Component } from 'react'

import AddGearDialog from './AddGearDialog'

import database from '../../../../firebase/database'
import Loader from '../../../shared/components/Loader'
import CardList from '../../../shared/components/Cards/CardList'

class GearList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			gear: [],
			loading: true,
			isAddDialogOpen: false,
			error: null
		}
	}

	componentDidMount() {
		database.gear
			.get()
			.then((snap) => Object.values(snap.val() || {}))
			.then((gear) => {
				this.setState({ gear, loading: false })
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
		database.gear
			.add(value)
			.then((ref) => database.gear.getById(ref.key))
			.then((snap) => snap.val())
			.then((newVal) =>
				this.setState((prevState) => ({
					gear: [...prevState.gear, newVal]
				}))
			)
			.then(() => this.handleDialogClose())
	}

	render() {
		let { gear, error, loading } = this.state
		return (
			<div>
				<h2>GEAR</h2>
				{loading ? (
					<Loader />
				) : error ? (
					<div className='error-alert'>Error: {error}</div>
				) : (
					<CardList items={ gear } onAdd={ () => this.add() } />
				)}

				<AddGearDialog
					isOpen={ this.state.isAddDialogOpen }
					onSave={ (value) => this.save(value) }
					onClose={ () => this.handleDialogClose() }
				/>
			</div>
		)
	}
}

export default GearList
