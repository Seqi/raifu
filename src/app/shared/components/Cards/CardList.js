import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddCard from './AddCard'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import ConfirmDeleteDialog from './ConfirmDeleteDialog'

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
		let { buildTitle, buildSubtitle, onCardClick } = this.props

		return (
			<Card
				key={ key }
				style={ { animationDelay: this.getAnimationDelay(idx) } }
				className={ `card ${this.props.cardType}-card` }
				onClick={ () => onCardClick(key) }
			>
				<button
					type='button'
					className='avatar-button card-action'
					onClick={ (e) => this.handleDialogOpen(e, key, buildTitle(item)) }
				>
					<i className='fa fa-times' />
				</button>
				<CardHeader title={ buildTitle(item) } subheader={ buildSubtitle(item) } />
				<CardContent>{JSON.stringify(item)}</CardContent>
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
		let { items, onAdd, cardType } = this.props

		return (
			<div className='card-list'>
				{this.renderItems(items)}
				<AddCard
					style={ { animationDelay: this.getAnimationDelay(Object.keys(items || {}).length) } }
					onClick={ onAdd }
					cardType={ cardType }
				/>

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
	onAdd: PropTypes.func.isRequired,
	onCardClick: PropTypes.func,
	onCardDelete: PropTypes.func,
	buildTitle: PropTypes.func,
	buildSubtitle: PropTypes.func,
	cardType: PropTypes.string
}

CardList.defaultProps = {
	items: {},
	cardType: 'weapon',
	buildTitle: (item) => item.title,
	buildSubtitle: (item) => item.brand,
	onCardClick: () => {},
	onCardDelete: () => {}
}

export default CardList
