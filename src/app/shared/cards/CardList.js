import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ConfirmDeleteDialog from 'app/shared/dialogs/ConfirmDeleteDialog'
import StaggeredFadeAnimation from 'app/shared/animations/StaggeredFadeAnimation'
import AddCard from './AddCard'

import './Cards.css'

class CardList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isDialogOpen: false,
			dialogKey: '',
			dialogTitle: ''
		}
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

	render() {
		let { items, canAdd, onAdd, onCardClick, canDelete, cardType } = this.props

		return (
			<div className='card-list'>
				<StaggeredFadeAnimation maxDuration={ 1 }>
					{
						items.map((item) => 
							React.createElement(cardType, {
								key: item.id,
								resource: item,
								canDelete: canDelete,
								onClick: () => onCardClick(item),
								onDelete: (e) => this.handleDialogOpen(e, item.id, item.getTitle()),
							})
						)
					}

					{ canAdd && <AddCard onClick={ onAdd } /> }
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
	cardType: PropTypes.elementType.isRequired,
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
