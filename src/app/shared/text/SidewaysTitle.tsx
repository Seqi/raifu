import { FC } from 'react'
import PropTypes from 'prop-types'

import {
	Box,
	BoxProps,
	styled,
	Typography,
	Slide,
	TypographyProps,
} from '@material-ui/core'

type SidewaysTitleProps = BoxProps & {
	title: string
	lowercase?: boolean
	textProps?: TypographyProps
}

const ResourceListTitle = styled(Box)(({ theme }) => ({
	writingMode: 'vertical-rl',
	borderRight: `3px solid ${theme.palette.primary.main}`,
}))

const ResourceListTitleText = styled(Typography)({
	transform: 'rotate(180deg)',
	textAlign: 'right',
	lineHeight: 1.5,
	display: 'inline-block',
})

export const SidewaysTitle: FC<SidewaysTitleProps> = ({
	title,
	lowercase,
	textProps,
	...props
}) => (
	<ResourceListTitle { ...props }>
		<Slide in={ true } direction='right'>
			<Box width='50px'>
				<ResourceListTitleText
					// You wouldn't believe the amount of faff saved from doing this the lazy way
					style={ { textTransform: lowercase ? 'lowercase' : 'initial' } }
					variant='h3'
					{ ...textProps }
				>
					{title}
				</ResourceListTitleText>
			</Box>
		</Slide>
	</ResourceListTitle>
)

SidewaysTitle.propTypes = {
	title: PropTypes.string.isRequired,
	lowercase: PropTypes.bool,
	textProps: PropTypes.object,
}

SidewaysTitle.defaultProps = {
	lowercase: false,
	textProps: {},
}
