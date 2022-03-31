import React, { FC } from 'react'
import PropTypes from 'prop-types'

import { Theme, Typography, TypographyProps, useMediaQuery } from '@material-ui/core'
import { Variant } from '@material-ui/core/styles/createTypography'

type ReactiveTitleProps = TypographyProps & {
	mobileVariant?: Variant
}

const ReactiveTitle: FC<ReactiveTitleProps> = ({
	children,
	variant,
	mobileVariant,
	...props
}) => {
	const isMobileMode = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'))

	return (
		<Typography variant={isMobileMode ? mobileVariant : variant} {...props}>
			{children}
		</Typography>
	)
}

ReactiveTitle.propTypes = {
	variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
	mobileVariant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
}

ReactiveTitle.defaultProps = {
	variant: 'h3',
	mobileVariant: 'h4',
}

export default ReactiveTitle
