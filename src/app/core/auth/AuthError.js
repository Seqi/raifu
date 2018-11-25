import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withTheme } from '@material-ui/core'

class AuthError extends PureComponent {
	render() {
		return (
			<div style={ { color: this.props.theme.palette.primary.main, textAlign: 'center' } } className='auth-error'>
				{this.props.message}
			</div>
		)
	}
}

AuthError.propTypes = {
	message: PropTypes.string.isRequired
}

export default withTheme()(AuthError)
