import React, { Component } from 'react'

import AddCard from '../../shared/components/Cards/AddCard'

class TacGearList extends Component {
	add() {}

	render() {
		return (
			<div>
				<h2>Tactical Gear</h2>
				<div className='card-list'>
					<AddCard onClick={ () => this.add() } />
				</div>
			</div>
		)
	}
}

export default TacGearList
