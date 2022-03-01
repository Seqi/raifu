import { FC } from 'react'
import PropTypes from 'prop-types'

import { Box, BoxProps, styled } from '@material-ui/core'

const RatioedContainerOuter = styled(Box)(({ ratio }: any) => ({
	position: 'relative',
	'&:before': {
		display: 'block',
		content: '""',
		width: '100%',
		paddingTop: `calc(${ratio} * 100%)`,
	},

	// Lazy here, only using it in one place
}))

const RatioedContainer = styled(Box)({
	position: 'absolute',
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
})

export type RatioedBoxProps = BoxProps & {
	ratio: number
}

export const RatioedBox: FC<RatioedBoxProps> = ({ ratio, children, ...boxProps }) => (
	<RatioedContainerOuter ratio={ ratio } { ...boxProps }>
		<RatioedContainer>{children}</RatioedContainer>
	</RatioedContainerOuter>
)

RatioedBox.propTypes = {
	ratio: PropTypes.number.isRequired,
}
