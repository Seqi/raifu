import React, { Component } from 'react'

import AddCard from '../../shared/components/AddCard'

class SecondariesList extends Component {
	render() {
		return (
			<div>
				<h2>Secondaries</h2>
				<div className='card-list'>
					<AddCard />
				</div>
			</div>
		)
	}
}

export default SecondariesList
