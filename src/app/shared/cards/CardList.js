import './Cards.css'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ConfirmDeleteDialog from 'app/shared/dialogs/ConfirmDeleteDialog'
import StaggeredFadeAnimation from 'app/shared/animations/StaggeredFadeAnimation'
import { AddCard, ArmoryCard, LoadoutCard } from '.'

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

	handleDialogOpen(e, key, title) {
		e.stopPropagation()
		this.setState({ isDialogOpen: true, dialogKey: key, dialogTitle: title })
	}

	handleDialogClose() {
		this.setState({ isDialogOpen: false, dialogKey: '', dialogTitle: '' })
	}

	handleConfirmDelete() {
		return this.props.onCardDelete(this.state.dialogKey)
			.then(() => this.handleDialogClose())
	}

	renderItems = (items) => {
		let { onCardClick, canDelete, cardType } = this.props

		let renderItem = (item) => {
			let sharedProps = {
				key: item.id,
				canDelete: canDelete,
				onClick: () => onCardClick(item),
				onDelete: (e) => this.handleDialogOpen(e, item.id, item.getTitle()),
			}
	
			if (['weapons', 'attachments', 'gear', 'clothing'].indexOf(cardType) > -1) {
				return <ArmoryCard item={ item } category={ cardType } { ...sharedProps } />
			}

			else if (cardType === 'loadout') {
				return <LoadoutCard loadout={ item } { ...sharedProps }	/>
			}

			throw Error('Unsupported card type')
		}

		return items.map(renderItem)
	}

	render() {
		let { items, canAdd, onAdd, cardType } = this.props

		let mappedCardType

		if (['weapons', 'attachments', 'gear', 'clothing'].indexOf(cardType) > -1) { 
			mappedCardType = 'armory'
		} else {
			mappedCardType = cardType
		}

		return (
			<div className='card-list'>
				<StaggeredFadeAnimation maxDuration={ 1 }>
					{this.renderItems(items)}

					{canAdd && <AddCard onClick={ onAdd } cardType={ mappedCardType } />}
				</StaggeredFadeAnimation>
				

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
	items: PropTypes.array,
	cardType: PropTypes.oneOf(['weapons', 'attachments', 'gear', 'clothing', 'loadout']).isRequired,
	canAdd: PropTypes.bool,
	canDelete: PropTypes.bool,
	onAdd: PropTypes.func,
	onCardClick: PropTypes.func,
	onCardDelete: PropTypes.func
}

CardList.defaultProps = {
	items: [],
	canAdd: true,
	canDelete: true,
	onAdd: () => {},
	onCardClick: () => {},
	onCardDelete: () => {}
}

export default CardList
