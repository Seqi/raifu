import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'

import AddButton from '../buttons/AddButton'

export default class AddCard extends PureComponent {
	render() {
		let { className, onClick, cardType } = this.props
		return (
			<Card className={ `${className} card add-card ${cardType}-card` }>
				<AddButton onClick={ onClick } />
			</Card>
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
