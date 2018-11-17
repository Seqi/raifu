import React, { Component } from 'react'

import AddCard from '../../shared/components/AddCard'

class SecondariesList extends Component {
	add() {}
	render() {
		return (
			<div>
				<h2>Secondaries</h2>
				<div className='card-list'>
					<AddCard onClick={ () => this.add() } />
				</div>
			</div>
		)
	}
}

export default SecondariesList
