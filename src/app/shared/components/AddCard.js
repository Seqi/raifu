import './AddCard.css'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import { withTheme } from '@material-ui/core'

class AddCard extends PureComponent {
	render() {
		let { theme } = this.props
		return (
			<div>
				<div className='add-card'>
					<Card>
						<button type='button' className='add-card-btn'>
							<i style={ { color: theme.palette.primary.main } } className='fa fa-plus' />
						</button>
					</Card>
				</div>
			</div>
		)
	}
}

AddCard.propTypes = {
	onAdd: PropTypes.func.isRequired
}

export default withTheme()(AddCard)
