import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

import useIsMobileMode from 'app/shared/hooks/useIsMobileMode'

function ReactiveTitle({children, title, variant, mobileVariant}) {
	let isMobileMode = useIsMobileMode()

	return <Typography variant={ isMobileMode ? mobileVariant : variant }>{ children }</Typography>
}

ReactiveTitle.propTypes = {
	title: PropTypes.string.isRequired,
	variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
	mobileVariant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
}

ReactiveTitle.defaultProps = {
	variant: 'h3',
	mobileVariant: 'h4'
}

export default ReactiveTitle