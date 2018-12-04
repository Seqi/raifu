import React, { Component } from 'react'

import AddAttachmentDialog from './AddAttachmentDialog'

import database from '../../../../firebase/database'
import Loader from '../../../shared/components/Loader'
import CardList from '../../../shared/components/Cards/CardList'

class AttachmentsList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			attachments: {},
			loading: true,
			isAddDialogOpen: false,
			error: null
		}
	}

	componentDidMount() {
		database.attachments
			.get()
			.then((snap) => {
				this.setState({ attachments: snap.val(), loading: false })
			})
			.catch((err) => this.setState({ error: err.message, loading: false }))
	}

	handleDialogClose() {
		this.setState({ isAddDialogOpen: false })
	}

	add() {
		this.setState({ isAddDialogOpen: true })
	}

	save(value) {
		database.attachments
			.add(value)
			.then((ref) => database.attachments.getById(ref.key))
			.then((snap) => {
				this.setState((prevState) => {
					let attachments = {
						...prevState.attachments,
						[snap.key]: snap.val()
					}
					return { attachments }
				})
			})
			.then(() => this.handleDialogClose())
	}

	render() {
		let { attachments, error, loading } = this.state
		return (
			<div>
				<h2>ATTACHMENTS</h2>
				{loading ? (
					<Loader />
				) : error ? (
					<div className='error-alert'>Error: {error}</div>
				) : (
					<CardList buildSubtitle={ () => '' } cardType="attachment" items={ attachments } onAdd={ () => this.add() } />
				)}

				<AddAttachmentDialog
					isOpen={ this.state.isAddDialogOpen }
					onSave={ (value) => this.save(value) }
					onClose={ () => this.handleDialogClose() }
				/>
			</div>
		)
	}
}

export default AttachmentsList
