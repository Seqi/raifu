import React from 'react'
import PropTypes from 'prop-types'

import { Typography, useMediaQuery } from '@material-ui/core'

function ReactiveTitle({ children, variant, mobileVariant, style }) {
	let isMobileMode = useMediaQuery((theme) => theme.breakpoints.down('xs'))

	return (
		<Typography style={ style } variant={ isMobileMode ? mobileVariant : variant }>
			{children}
		</Typography>
	)
}

ReactiveTitle.propTypes = {
	variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
	mobileVariant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
	style: PropTypes.object
}

ReactiveTitle.defaultProps = {
	variant: 'h3',
	mobileVariant: 'h4',
	style: {}
}

export default ReactiveTitle
