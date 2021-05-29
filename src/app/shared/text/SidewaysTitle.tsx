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
	subtitle?: string
	lowercase?: boolean
	textProps?: TypographyProps
}

const ResourceListTitle = styled(Box)(({ theme }) => ({
	writingMode: 'vertical-rl',
	borderRight: `3px solid ${theme.palette.primary.main}`,
}))

const ResourceListTitleTextContainer = styled(Box)(({ theme }) => ({
	width: '50px',

	[theme.breakpoints.down('sm')]: {
		width: '40px',
	},
	[theme.breakpoints.down('xs')]: {
		width: '30px',
	},
	[theme.breakpoints.down(321)]: {
		width: '20px',
	},
}))

const ResourceListTitleText = styled(Typography)(({ theme }) => ({
	transform: 'rotate(180deg)',
	textAlign: 'right',
	lineHeight: 1.5,
	display: 'inline-block',

	position: 'sticky',
	top: '5%',

	[theme.breakpoints.down('sm')]: {
		fontSize: '2.75rem',
	},
	[theme.breakpoints.down('xs')]: {
		fontSize: '2.1rem',
	},
	[theme.breakpoints.down(321)]: {
		fontSize: '1.6rem',
	},
}))

export const SidewaysTitle: FC<SidewaysTitleProps> = ({
	title,
	lowercase,
	textProps,
	subtitle,
	...props
}) => (
	<ResourceListTitle { ...props }>
		<Slide in={ true } direction='right'>
			<ResourceListTitleTextContainer>
				<ResourceListTitleText
					variant='h3'
					{ ...textProps }
					// You wouldn't believe the amount of faff saved from doing this the lazy way
					style={ {
						...{ textTransform: lowercase ? 'lowercase' : 'initial' },
						...textProps?.style,
					} }
				>
					{title}
				</ResourceListTitleText>
			</ResourceListTitleTextContainer>
		</Slide>
	</ResourceListTitle>
)

SidewaysTitle.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
	lowercase: PropTypes.bool,
	textProps: PropTypes.object,
}

SidewaysTitle.defaultProps = {
	subtitle: undefined,
	lowercase: false,
	textProps: {},
}
