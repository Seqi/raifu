import React, { Component } from 'react'

import AddCard from '../../shared/components/AddCard'

class AttachmentsList extends Component {
	add() {}
	render() {
		return (
			<div>
				<h2>Attachments</h2>
				<div className='card-list'>
					<AddCard onClick={ () => this.add() } />
				</div>
			</div>
		)
	}
}

export default AttachmentsList
