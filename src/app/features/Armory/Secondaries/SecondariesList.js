import React, { Component } from 'react'

import AddSecondaryDialog from './AddSecondaryDialog'

import database from '../../../../firebase/database'
import Loader from '../../../shared/components/Loader'
import CardList from '../../../shared/components/Cards/CardList'

class SecondariesList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			weapons: [],
			loading: true,
			isAddDialogOpen: false,
			error: null
		}
	}

	componentDidMount() {
		database.secondaries
			.get()
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
		database.secondaries
			.add(value)
			.then((ref) => database.secondaries.getById(ref.key))
			.then((newVal) =>
				this.setState((prevState) => ({
					weapons: [...prevState.weapons, newVal]
				}))
			)
			.then(() => this.handleDialogClose())
	}

	render() {
		let { weapons, error, loading } = this.state
		return (
			<div>
				<h2>SECONDARIES</h2>
				{loading ? (
					<Loader />
				) : error ? (
					<div className='error-alert'>Error: {error}</div>
				) : (
					<CardList items={ weapons } onAdd={ () => this.add() } />
				)}

				<AddSecondaryDialog
					isOpen={ this.state.isAddDialogOpen }
					onSave={ (value) => this.save(value) }
					onClose={ () => this.handleDialogClose() }
				/>
			</div>
		)
	}
}

export default SecondariesList
