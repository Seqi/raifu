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

	marginLeft: '-16px', // Container padding = 40px

	[theme.breakpoints.down('md')]: {
		marginLeft: '-20px', // Container padding = 24px
	},
	[theme.breakpoints.down('xs')]: {
		marginLeft: '-14px', // Container padding = 16px
	},
}))

const ResourceListTitleText = styled(Typography)(({ theme, hasSubtitle }: any) => ({
	transform: 'rotate(180deg)',
	textAlign: 'right',
	lineHeight: 1.2,
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

const ResourceListSubTitleText = styled(Typography)(({ theme }) => ({
	transform: 'rotate(180deg)',
	textAlign: 'right',
	lineHeight: 1.3,
	display: 'block',

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
			<div>
				{/* Subtitle goes first cos of the rotational stuff */}
				{!!subtitle && (
					<ResourceListSubTitleText
						variant='h4'
						{ ...textProps }
						// You wouldn't believe the amount of faff saved from doing this the lazy way
						style={ {
							...{ textTransform: lowercase ? 'lowercase' : 'initial' },
							...textProps?.style,
						} }
					>
						{subtitle}
					</ResourceListSubTitleText>
				)}

				<ResourceListTitleText
					variant='h3'
					{ ...textProps }
					style={ {
						...{ textTransform: lowercase ? 'lowercase' : 'initial' },
						...textProps?.style,
					} }
				>
					{title}
				</ResourceListTitleText>
			</div>
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
