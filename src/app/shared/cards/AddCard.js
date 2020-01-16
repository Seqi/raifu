import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'

import LoadoutCard from './entities/LoadoutCard'
import AddButton from '../buttons/AddButton'

export default class AddCard extends PureComponent {
	render() {
		let { onClick, cardType, style } = this.props

		let addCardtype = cardType === LoadoutCard ? 'loadout-card' : 'armory-card'
		return (
			<Card style={ style } className={ addCardtype }>
				<AddButton onClick={ onClick } />
			</Card>
		)
	}
}

AddCard.propTypes = {
	onClick: PropTypes.func.isRequired,
	style: PropTypes.object,
	cardType: PropTypes.elementType.isRequired
}

AddCard.defaultProps = {
	style: {},
}
