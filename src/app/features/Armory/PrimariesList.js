import React, { Component } from 'react'

import AddCard from '../../shared/components/AddCard'

import database from '../../../firebase/database'
import { Card, CardContent, CardHeader } from '@material-ui/core'

class PrimariesList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			weapons: [],
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

	add() {}

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
								<CardHeader title={ weapon.name } />
								<CardContent>{JSON.stringify(weapon)}</CardContent>
							</Card>
						))}
						<AddCard onClick={ () => this.add() } />
					</div>
				)}
			</div>
		)
	}
}

export default PrimariesList
