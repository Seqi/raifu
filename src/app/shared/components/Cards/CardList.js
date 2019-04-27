import './Cards.css'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AddCard from 'app/shared/components/Cards/AddCard'
import { WeaponCard, AttachmentCard, LoadoutCard } from './Entities'
import ConfirmDeleteDialog from 'app/shared/components/Cards/ConfirmDeleteDialog'

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
		this.props.onCardDelete(this.state.dialogKey)
		this.handleDialogClose()
	}

	getAnimationDelay = (index, count) => {
		let maxAnimationLength = 1
		let standardInterval = 0.2

		// If no count is supplied, assume the index number is the last item
		count = count || index

		if (this.loaded) {
			return '0s'
		}

		let interval = count * standardInterval > maxAnimationLength ? 
			maxAnimationLength / count : 
			standardInterval

		return `${interval * index}s`
	}

	renderItems = (items) => {
		let { onCardClick, canDelete, cardType } = this.props

		let renderItem = (item, idx) => {
			let sharedProps = {
				key: item.id,
				canDelete: canDelete,
				onClick: () => onCardClick(item),
				onDelete: (e) => this.handleDialogOpen(e, item.id, item.getTitle()),
				style: { animationDelay: this.getAnimationDelay(idx, items.length) }
			}
	
			if (cardType === 'weapon') {
				return <WeaponCard weapon={ item } { ...sharedProps } />
			}

			else if (cardType === 'attachment') {
				return <AttachmentCard attachment={ item } { ...sharedProps } />
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
	items: PropTypes.array,
	cardType: PropTypes.string,
	canAdd: PropTypes.bool,
	canDelete: PropTypes.bool,
	onAdd: PropTypes.func,
	onCardClick: PropTypes.func,
	onCardDelete: PropTypes.func
}

CardList.defaultProps = {
	items: [],
	cardType: 'weapon',
	canAdd: true,
	canDelete: true,
	onAdd: () => {},
	onCardClick: () => {},
	onCardDelete: () => {}
}

export default CardList
