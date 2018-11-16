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
				console.log('got', weapons[0])
				this.setState({ weapons: weapons || [] })
			})
			.catch((err) => this.setState({ error: err.message }))
	}

	render() {
		let { weapons, error } = this.state
		return (
			<div>
				<h2>Primaries</h2>
				{error && <div>Error: {error}</div>}
				<div className='card-list'>
					{weapons.map((weapon, idx) => (
						<Card className='card' key={ idx }>
							<CardHeader title={ weapon.name }>{JSON.stringify(weapon)}</CardHeader>
							<CardContent />
						</Card>
					))}
					<AddCard />
				</div>
			</div>
		)
	}
}

export default PrimariesList
