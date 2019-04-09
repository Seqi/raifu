import React, { Component } from 'react'

import Typography from '@material-ui/core/Typography'

import Loader from 'app/shared/components/Loader'
import CardList from 'app/shared/components/Cards/CardList'

// A little hacky, but we only use the isAddDialogOpen state in children classes
/* eslint-disable react/no-unused-state */
class CardListBaseComponent extends Component {
	constructor(props) {
		super(props)

		this.state = {
			items: [],
			loading: true,
			isAddDialogOpen: false,
			error: null
		}
	}

	get items() {
		return []
	}

	componentDidMount() {
		this.items
			.get()
			.then((items) => {
				if (!this.isUnmounted) {
					this.setState({ items, loading: false })
				}
			})
			.catch((err) => this.setState({ error: err.message, loading: false }))
	}

	componentWillUnmount() {
		this.isUnmounted = true
	}

	handleAddDialogClose() {
		this.setState({ isAddDialogOpen: false })
	}

	handleAddDialogOpen() {
		this.setState({ isAddDialogOpen: true })
	}

	view(id) {}

	delete(id) {
		this.items
			.delete(id)
			.then(() => this.setState((prevState) => ({ items: prevState.items.filter((item) => item.id !== id) })))
	}

	save(value) {
		this.items
			.add(value)
			.then((item) => this.setState((prevState) => ({ items: prevState.items.concat(item) })))
			.then(() => this.handleAddDialogClose())
	}

	render() {
		let { items, error, loading } = this.state

		return (
			<React.Fragment>
				<Typography variant='h6'>{this.title}</Typography>
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
						onCardClick={ (item) => this.view(item) }
						onCardDelete={ (id) => this.delete(id) }
					/>
				)}
			</React.Fragment>
		)
	}
}

export default CardListBaseComponent
