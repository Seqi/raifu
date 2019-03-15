import './Cards.css'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import AddCard from 'app/shared/components/Cards/AddCard'
import ConfirmDeleteDialog from 'app/shared/components/Cards/ConfirmDeleteDialog'
import CardDeleteButton from 'app/shared/components/Cards/CardDeleteButton'

class CardList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isDialogOpen: false,
			dialogKey: '',
			dialogTitle: ''
		}
	}

	componentDidMount() {
		// Ensure we don't delay the animations once the component loaded
		this.loaded = true
	}

	renderItems(items) {
		return Object.keys(items || {})
			.map((key, idx) => {
				return this.renderItem(key, items[key], idx)
			})
	}

	renderItem = (key, item, idx) => {
		let { buildTitle, buildSubtitle, buildCardContent, onCardClick, canDelete } = this.props

		return (
			<Card
				key={ key }
				style={ { animationDelay: this.getAnimationDelay(idx) } }
				className={ `card ${this.props.cardType}-card` }
				onClick={ () => onCardClick(key) }
			>
				{canDelete && <CardDeleteButton onClick={ (e) => this.handleDialogOpen(e, key, buildTitle(item)) } />}
				<CardHeader className='card-header' title={ buildTitle(item) } subheader={ buildSubtitle(item) } />
				<CardContent className='card-content'> {buildCardContent(item)} </CardContent>
			</Card>
		)
	}

	getAnimationDelay = (idx) => {
		return this.loaded ? '0s' : `${0.2 * idx}s`
	}

	handleDialogOpen(e, key, title) {
		e.stopPropagation()
		this.setState({ isDialogOpen: true, dialogKey: key, dialogTitle: title })
	}

	handleDialogClose() {
		this.setState({ isDialogOpen: false, dialogKey: '', dialogTitle: '' })
	}

	handleConfirmDelete() {
		this.props.onCardDelete(this.state.dialogKey)
		this.handleDialogClose()
	}

	render() {
		let { items, canAdd, onAdd, cardType } = this.props

		return (
			<div className='card-list'>
				{this.renderItems(items)}

				{canAdd && (
					<AddCard
						style={ { animationDelay: this.getAnimationDelay(Object.keys(items || {}).length) } }
						onClick={ onAdd }
						cardType={ cardType }
					/>
				)}

				{this.state.isDialogOpen && (
					<ConfirmDeleteDialog
						title={ this.state.dialogTitle }
						isOpen={ this.state.isDialogOpen }
						onClose={ () => this.handleDialogClose() }
						onConfirm={ () => this.handleConfirmDelete() }
					/>
				)}
			</div>
		)
	}
}

CardList.propTypes = {
	items: PropTypes.object,
	cardType: PropTypes.string,
	buildTitle: PropTypes.func,
	buildSubtitle: PropTypes.func,
	buildCardContent: PropTypes.func,
	canAdd: PropTypes.bool,
	canDelete: PropTypes.bool,
	onAdd: PropTypes.func,
	onCardClick: PropTypes.func,
	onCardDelete: PropTypes.func
}

CardList.defaultProps = {
	items: {},
	cardType: 'weapon',
	buildTitle: (item) => item.title,
	buildSubtitle: (item) => item.brand,
	buildCardContent: (item) => {},
	canAdd: true,
	canDelete: true,
	onAdd: () => {},
	onCardClick: () => {},
	onCardDelete: () => {}
}

export default CardList
