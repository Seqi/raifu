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

	save(value) {
		database.primaries
			.add(value)
			.then((ref) => database.primaries.getById(ref.key))
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

	buildTitle(weapon) {
		return weapon.nickname || `${weapon.platform} ${weapon.model}`
	}

	render() {
		let { weapons, error, loading, isAddDialogOpen } = this.state
		return (
			<div>
				<h2>PRIMARIES</h2>
				{loading ? (
					<Loader />
				) : error ? (
					<div className='error-alert'>Error: {error}</div>
				) : (
					<CardList 
						buildTitle={ this.buildTitle }
						items={ weapons }
						onAdd={ () => this.add() }
						onCardDelete={ (id) => this.delete(id)} />
				)}

				<AddPrimaryDialog
					isOpen={ isAddDialogOpen }
					onSave={ (value) => this.save(value) }
					onClose={ () => this.handleDialogClose() }
				/>
			</div>
		)
	}
}

export default PrimariesList
