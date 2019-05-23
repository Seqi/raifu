import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'

function Error({ error, onRetry }) {
	return (
		<div style={ {
			textAlign: 'center',
			borderRadius: '5px'
		} }>
			<div style={ { paddingBottom: '8px'} }>
				{ error }
			</div>

			{ onRetry && (
				<Button variant='outlined' color='primary' onClick={ onRetry }>Retry</Button>
			)}
		</div>
	)
}

Error.propTypes = {
	error: PropTypes.string,
	onRetry: PropTypes.func
}

Error.defaultProps = {
	error: 'An error occurred',
	onRetry: null
}

export default Error