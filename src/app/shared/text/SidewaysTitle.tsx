import { FC } from 'react'
import PropTypes from 'prop-types'

import { Variant } from '@material-ui/core/styles/createTypography'

import { Box, BoxProps, styled, Typography, Slide } from '@material-ui/core'

type SidewaysTitleProps = BoxProps & {
	title: string
	variant?: Variant
}

const ResourceListTitle = styled(Box)(({ theme }) => ({
	writingMode: 'vertical-rl',
	borderRight: `3px solid ${theme.palette.primary.main}`,
	marginRight: theme.spacing(2),
}))

const ResourceListTitleText = styled(Typography)({
	transform: 'rotate(180deg)',
	textAlign: 'right',
	lineHeight: 1.5,
})

export const SidewaysTitle: FC<SidewaysTitleProps> = ({
	title,
	variant = 'h3',
	...props
}) => (
	<ResourceListTitle { ...props }>
		<Slide in={ true } direction='right'>
			<Box width='50px'>
				<ResourceListTitleText variant={ variant }>{title}</ResourceListTitleText>
			</Box>
		</Slide>
	</ResourceListTitle>
)

SidewaysTitle.propTypes = {
	title: PropTypes.string.isRequired,
	variant: PropTypes.any,
}

SidewaysTitle.defaultProps = {
	variant: 'h3',
}
