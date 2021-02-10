import React from 'react'
import PropTypes from 'prop-types'

import { Button, useTheme } from '@material-ui/core'

function ErrorTextAlert({ error, onRetry, fillBackground }) {
	let theme = useTheme()

	return (
		<div
			style={ {
				textAlign: 'center',
				borderRadius: '5px',
				backgroundColor: fillBackground ? theme.palette.primary.main : 'inherit',

				// Being outside of the realm of our app element, we have to manually reapply here
				// for it to work in dialogs :((
				fontFamily: theme.typography.fontFamily,
				fontSize: '1.2rem',
				color: theme.palette.text.primary,
				padding: '8px 0',
				marginBottom: '8px'
			} }
		>
			<div style={ { paddingBottom: onRetry ? '8px' : '0' } }>{error || 'An error occurred.'}</div>

			{onRetry && (
				<Button variant='outlined' color='primary' onClick={ onRetry }>
					Retry
				</Button>
			)}
		</div>
	)
}

ErrorTextAlert.propTypes = {
	error: PropTypes.string,
	onRetry: PropTypes.func,
	fillBackground: PropTypes.bool
}

ErrorTextAlert.defaultProps = {
	error: '',
	onRetry: null,
	fillBackground: false
}

export default ErrorTextAlert
