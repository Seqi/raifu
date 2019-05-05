import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'

import AddButton from '../Buttons/AddButton'

export default class AddCard extends PureComponent {
	render() {
		let { className,  onClick, cardType, style } = this.props
		return (
			<Card style={ style } className={ `${className} card add-card ${cardType}-card` }>
				<AddButton onClick={ onClick } />
			</Card>
		)
	}
}

AddCard.propTypes = {
	className: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	style: PropTypes.object,
	cardType: PropTypes.string
}

AddCard.defaultProps = {
	className: '',
	style: {},
	cardType: 'weapon'
}
