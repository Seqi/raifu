import './Cards.css'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { styles } from '@material-ui/core'

import StaggeredFadeAnimation from 'app/shared/animations/StaggeredFadeAnimation'
import { AddCard, ArmoryCard, LoadoutCard } from '.'

class CardList extends Component {
	renderItems = (items, mappedCardType) => {
		let { onCardClick, onCardDelete, cardType } = this.props

		let renderItem = (item) => {
			let sharedProps = {
				key: item.id,
				onClick: () => onCardClick(item),
				onDelete: (e) => onCardDelete(item.id),
			}
	
			if (mappedCardType === 'armory') {
				return <ArmoryCard item={ item } category={ cardType } { ...sharedProps } />
			}

			else if (mappedCardType === 'loadout') {
				return <LoadoutCard loadout={ item } { ...sharedProps }	/>
			}

			throw Error('Unsupported card type')
		}

		return items.map(renderItem)
	}

	render() {
		let { items, onAdd, cardType } = this.props

		let mappedCardType

		if (['weapons', 'attachments', 'gear', 'clothing'].indexOf(cardType) > -1) { 
			mappedCardType = 'armory'
		} else {
			mappedCardType = cardType
		}

		return (
			<div className='card-list'>
				<StaggeredFadeAnimation maxDuration={ 1 }>
					{this.renderItems(items, mappedCardType)}

					<AddCard onClick={ onAdd } cardType={ mappedCardType } />
				</StaggeredFadeAnimation>
			</div>
		)
	}
}

CardList.propTypes = {
	items: PropTypes.array,
	cardType: PropTypes.oneOf(['weapons', 'attachments', 'gear', 'clothing', 'loadout']).isRequired,
	onAdd: PropTypes.func,
	onCardClick: PropTypes.func,
	onCardDelete: PropTypes.func
}

CardList.defaultProps = {
	items: [],
	onAdd: () => {},
	onCardClick: () => {},
	onCardDelete: () => {}
}

export default CardList
