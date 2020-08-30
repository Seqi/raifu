import React from 'react'
import PropTypes from 'prop-types'

import { Button, useTheme } from '@material-ui/core'
import AppOverlay from '../../utils/AppOverlay'

function ErrorOverlay({ icon, message, onRetry }) {
	let theme = useTheme()

	return (
		<AppOverlay>
			<div style={{ textAlign: 'center' }}>
				<div style={{ paddingBottom: '24px' }}>
					<i
						style={{
							fontSize: '10rem',
							color: theme.palette.background.paper,
						}}
						className={icon}
					/>
				</div>

				<div style={{ paddingBottom: onRetry ? '8px' : '0' }}>{message || 'An error occurred.'}</div>

				{onRetry && (
					<Button variant='outlined' color='primary' onClick={onRetry}>
						Retry
					</Button>
				)}
			</div>
		</AppOverlay>
	)
}

ErrorOverlay.propTypes = {
	icon: PropTypes.string,
	message: PropTypes.string,
	onRetry: PropTypes.func,
}

ErrorOverlay.defaultProps = {
	icon: 'far fa-dizzy',
	message: '',
	onRetry: null,
}

export default ErrorOverlay
