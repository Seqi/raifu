import './AddCard.css'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import { withTheme } from '@material-ui/core'

class AddCard extends PureComponent {
	render() {
		let { theme, onClick } = this.props
		return (
			<Card style={ this.props.style } className='card add-card'>
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
	onClick: PropTypes.func.isRequired,
	style: PropTypes.object
}

AddCard.defaultProps = {
	style: {}
}

export default withTheme()(AddCard)