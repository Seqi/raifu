import React from 'react'
import PropTypes from 'prop-types'

import { Button, withTheme } from '@material-ui/core'

function Error({ error, onRetry, fillBackground, theme, style }) {
	return (
		<div style={ {
			textAlign: 'center',
			borderRadius: '5px',
			backgroundColor: fillBackground ? theme.palette.primary.main : 'inherit',
			
			// Being outside of the realm of our app element, we have to manually reapply here
			// for it to work in dialogs :((
			fontFamily: theme.typography.fontFamily,
			fontSize: '1.2rem',
			color: theme.palette.text.primary,
			...style
		} }>
			<div style={ { paddingBottom: onRetry ? '8px' : '0' } }>
				An error occurred: { error ? `(${error})` : '' }
			</div>

			{ onRetry && (
				<Button variant='outlined' color='primary' onClick={ onRetry }>Retry</Button>
			)}
		</div>
	)
}

Error.propTypes = {
	error: PropTypes.string,
	onRetry: PropTypes.func,
	fillBackground: PropTypes.bool,
	style: PropTypes.object
}

Error.defaultProps = {
	error: '',
	onRetry: null,
	fillBackground: false,
	style: {}
}

export default withTheme(Error)