import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { ArmoryCardContainer } from './resources/ArmoryCard'
import { LoadoutCardContainer } from  './resources/LoadoutCard'

import AddButton from '../buttons/AddButton'

export default class AddCard extends PureComponent {
	render() {
		let { cardType, onClick } = this.props 		
		let AddCardContainer = cardType === 'armory' ? ArmoryCardContainer : LoadoutCardContainer

		return (
			<AddCardContainer>
				<AddButton onClick={ onClick } />
			</AddCardContainer>
		)
	}
}

AddCard.propTypes = {
	className: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	cardType: PropTypes.oneOf(['armory', 'loadout'])
}

AddCard.defaultProps = {
	className: '',
	cardType: 'armory'
}
