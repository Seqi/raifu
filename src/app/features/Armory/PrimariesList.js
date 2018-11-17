import React, { Component } from 'react'

import AddCard from '../../shared/components/AddCard'
import AddPrimaryDialog from './AddPrimaryDialog'

import database from '../../../firebase/database'
import { Card, CardContent, CardHeader } from '@material-ui/core'

class PrimariesList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			weapons: [],
			isAddDialogOpen: false,
			error: null
		}
	}

	componentDidMount() {
		database.primaries
			.get()
			.then((weapons) => {
				this.setState({ weapons })
			})
			.catch((err) => this.setState({ error: err.message }))
	}

	add() {
		this.setState({ isAddDialogOpen: true })
	}

	handleDialogClose() {
		this.setState({ isAddDialogOpen: false })
	}

	save(value) {
		database.primaries
			.add(value)
			.then((ref) => database.primaries.getById(ref.key))
			.then((newVal) =>
				this.setState((prevState) => {
					prevState.weapons.push(newVal)
					return { weapons: prevState.weapons }
				})
			)
			.then(() => this.handleDialogClose())
	}

	render() {
		let { weapons, error } = this.state
		return (
			<div>
				<h2>Primaries</h2>
				{error ? (
					<div className='error-alert'>Error: {error}</div>
				) : (
					<div className='card-list'>
						{weapons.map((weapon, idx) => (
							<Card className='card' key={ idx }>
								<CardHeader title={ weapon.title } />
								<CardContent>{JSON.stringify(weapon)}</CardContent>
							</Card>
						))}
						<AddCard onClick={ () => this.add() } />
					</div>
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
