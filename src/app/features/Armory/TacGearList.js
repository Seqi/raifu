import React, { Component } from 'react'

import AddCard from '../../shared/components/AddCard'

class TacGearList extends Component {
	render() {
		return (
			<div>
				<h2>Tactical Gear</h2>
				<div className='card-list'>
					<AddCard />
				</div>
			</div>
		)
	}
}

export default TacGearList
