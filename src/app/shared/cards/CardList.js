import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Grid, Fade } from '@material-ui/core'

import StaggeredAnimation from 'app/shared/animations/StaggeredAnimation'

import { AddCard, ArmoryCard, LoadoutCard } from '.'

class CardList extends Component {
	renderItem = (item, mappedCardType) => {
		let { onCardClick, onCardDelete, cardType } = this.props
		let sharedProps = {
			key: item.id,
			canDelete: true,
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

	render() {
		let { items, onAdd, cardType, fullWidth } = this.props

		let mappedCardType

		if (['weapons', 'attachments', 'gear', 'clothing'].indexOf(cardType) > -1) { 
			mappedCardType = 'armory'
		} else {
			mappedCardType = cardType
		}

		return (
			<Grid container={ true } spacing={ 2 }>
				<StaggeredAnimation maxDuration={ 1 }>

					{ items.map(item => (
						<Fade key={ item.id } in={ true } timeout={ 1000 }>
							<Grid item={ true } xs={ fullWidth ? 12 : 6 } sm={ fullWidth ? 12 : 'auto' }>
								{ this.renderItem(item, mappedCardType) }
							</Grid>
						</Fade>
					))}
					
					<Fade key='add' in={ true } timeout={ 1000 }>
						<Grid item={ true } xs={ fullWidth ? 12 : 6 } sm={ fullWidth ? 12 : 'auto' }>
							<AddCard onClick={ onAdd } cardType={ mappedCardType } />
						</Grid>
					</Fade>
				</StaggeredAnimation>
			</Grid>
		)
	}
}

CardList.propTypes = {
	items: PropTypes.array,
	cardType: PropTypes.oneOf(['weapons', 'attachments', 'gear', 'clothing', 'loadout']).isRequired,
	onAdd: PropTypes.func,
	onCardClick: PropTypes.func,
	onCardDelete: PropTypes.func,
	fullWidth: PropTypes.bool,
}

CardList.defaultProps = {
	items: [],
	onAdd: () => {},
	onCardClick: () => {},
	onCardDelete: () => {},
	fullWidth: false,
}

export default CardList
