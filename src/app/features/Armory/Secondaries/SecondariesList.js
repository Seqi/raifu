import React, { Component } from 'react'

import AddSecondaryDialog from './AddSecondaryDialog'

import database from '../../../../firebase/database'
import Loader from '../../../shared/components/Loader'
import CardList from '../../../shared/components/Cards/CardList'

class SecondariesList extends Component {
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
		database.secondaries
			.get()
			.then((snap) => {
				this.setState({ weapons: snap.val(), loading: false })
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
			let weaponsCopy = { ...prevState.weapons }

			delete weaponsCopy[id]

			return { weapons: weaponsCopy }
		})
	}

	buildTitle(weapon) {
		return weapon.nickname || `${weapon.platform} ${weapon.model}`
	}

	save(value) {
		database.secondaries
			.add(value)
			.then((ref) => database.secondaries.getById(ref.key))
			.then((snap) => {
				this.setState((prevState) => {
					let weapons = {
						...prevState.weapons,
						[snap.key]: snap.val()
					}
					return { weapons }
				})
			})
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
					<CardList buildTitle={ this.buildTitle } items={ weapons } onAdd={ () => this.add() } onCardDelete={ (id) => this.delete(id) } />
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
