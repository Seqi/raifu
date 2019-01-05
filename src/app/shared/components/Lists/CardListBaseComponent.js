import React, { Component } from 'react'

import Loader from '../Loader'
import CardList from '../Cards/CardList'

// A little hacky, but we only use the isAddDialogOpen state in children classes
/* eslint-disable react/no-unused-state */
class CardListBaseComponent extends Component {
	constructor(props) {
		super(props)

		this.state = {
			items: {},
			loading: true,
			isAddDialogOpen: false,
			error: null
		}
	}

	get items() {
		return {}
	}

	componentDidMount() {
		this.items
			.get()
			.then((snap) => {
				this.setState({ items: snap.val(), loading: false })
			})
			.catch((err) => this.setState({ error: err.message, loading: false }))
	}

	handleAddDialogClose() {
		this.setState({ isAddDialogOpen: false })
	}

	handleAddDialogOpen() {
		this.setState({ isAddDialogOpen: true })
	}

	view(id) {}

	delete(id) {
		this.items.delete(id)
			.then(() => {
				this.setState((prevState) => {
					let itemsCopy = { ...prevState.items }

					delete itemsCopy[id]

					return { items: itemsCopy }
				})
			})
	}

	save(value) {
		this.items
			.add(value)
			.then((ref) => this.items.getById(ref.key))
			.then((snap) => {
				this.setState((prevState) => {
					let items = {
						...prevState.items,
						[snap.key]: snap.val()
					}
					return { items }
				})
			})
			.then(() => this.handleAddDialogClose())
	}

	render() {
		let { items, error, loading } = this.state

		return (
			<React.Fragment>
				<h2>{this.title}</h2>
				{loading ? (
					<Loader />
				) : error ? (
					<div className='error-alert'>Error: {error}</div>
				) : (
					<CardList
						items={ items }
						cardType={ this.cardType }
						buildTitle={ this.buildCardTitle }
						buildSubtitle={ this.buildCardSubtitle }
						buildCardContent={ this.buildCardContent }
						onAdd={ () => this.handleAddDialogOpen() }
						onCardClick={ (id) => this.view(id) }
						onCardDelete={ (id) => this.delete(id) }
					/>
				)}
			</React.Fragment>
		)
	}
}

export default CardListBaseComponent
