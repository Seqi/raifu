import React, { FC } from 'react'
import PropTypes from 'prop-types'

import { Theme, Typography, useMediaQuery } from '@material-ui/core'
import { Variant } from '@material-ui/core/styles/createTypography'

type ReactiveTitleProps = {
	variant?: Variant
	mobileVariant?: Variant
	style?: React.CSSProperties
}

const ReactiveTitle: FC<ReactiveTitleProps> = ({
	children,
	variant,
	mobileVariant,
	style,
}) => {
	let isMobileMode = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'))

	return (
		<Typography style={ style } variant={ isMobileMode ? mobileVariant : variant }>
			{children}
		</Typography>
	)
}

ReactiveTitle.propTypes = {
	variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
	mobileVariant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
	style: PropTypes.object,
}

ReactiveTitle.defaultProps = {
	variant: 'h3',
	mobileVariant: 'h4',
	style: {},
}

export default ReactiveTitle
