import './AddCard.css'

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import { withTheme } from '@material-ui/core'

class AddCard extends PureComponent {
	render() {
		let { className, theme, onClick, cardType, style } = this.props
		return (
			<Card style={ style } className={ `${className} card add-card ${cardType}-card` }>
				<div className='add-card-btn-wrapper'>
					<button onClick={ onClick } type='button' className='add-card-btn'>
						<i style={ { color: theme.palette.primary.main } } className='fa fa-plus' />
					</button>
				</div>
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

export default withTheme()(AddCard)
