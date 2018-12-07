import React, { Component } from 'react'

import AddGearDialog from './AddGearDialog'

import database from '../../../../firebase/database'
import Loader from '../../../shared/components/Loader'
import CardList from '../../../shared/components/Cards/CardList'

class GearList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			gear: {},
			loading: true,
			isAddDialogOpen: false,
			error: null
		}
	}

	componentDidMount() {
		database.gear
			.get()
			.then((snap) => {
				this.setState({ gear: snap.val(), loading: false })
			})
			.catch((err) => this.setState({ error: err.message, loading: false }))
	}

	handleDialogClose() {
		this.setState({ isAddDialogOpen: false })
	}

	add() {
		this.setState({ isAddDialogOpen: true })
	}

	delete(id) {
		this.setState(prevState => {
			let gearCopy = { ...prevState.gear }

			delete gearCopy[id]

			return { gear: gearCopy }
		})
	}

	save(value) {
		database.gear
			.add(value)
			.then((ref) => database.gear.getById(ref.key))
			.then((snap) => {
				this.setState((prevState) => {
					let gear = {
						...prevState.gear,
						[snap.key]: snap.val()
					}
					return { gear }
				})
			})
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
					<CardList items={ gear } onAdd={ () => this.add() } onCardDelete={ (id) => this.delete(id)} />
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
