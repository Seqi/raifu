import { FC, ReactNode } from 'react'
import PropTypes from 'prop-types'

import {
	Box,
	BoxProps,
	styled,
	Typography,
	Slide,
	TypographyProps,
} from '@material-ui/core'

type SidewaysTitleProps = Omit<BoxProps, 'title'> & {
	title: ReactNode
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

const ResourceListTitleTextContainer = styled(Box)({
	position: 'sticky',
	top: '5%',
	display: 'inline-block',
})

const ResourceListTitleText = styled(Typography)(({ theme }) => ({
	transform: 'rotate(180deg)',
	textAlign: 'right',
	lineHeight: 1.5,
	display: 'inline-block',

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
	lineHeight: 1.5,
	display: 'inline-block',

	paddingTop: '8px',
	paddingRight: '12px',

	fontSize: '1.75rem',

	[theme.breakpoints.down('sm')]: {
		fontSize: '1.3rem',
	},
	[theme.breakpoints.down('xs')]: {
		fontSize: '1.1em',
	},
	[theme.breakpoints.down(321)]: {
		fontSize: '1rem',
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
				{/* Subtitle goes first cos of the rotational stuff */}
				{!!subtitle && (
					<ResourceListSubTitleText
						variant='h5'
						{ ...textProps }
						// You wouldn't believe the amount of faff saved from doing this the lazy way
						style={ {
							...{ textTransform: lowercase ? 'lowercase' : 'initial' },
							...textProps?.style,
						} }
						color='textSecondary'
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
			</ResourceListTitleTextContainer>
		</Slide>
	</ResourceListTitle>
)

SidewaysTitle.propTypes = {
	title: PropTypes.node.isRequired,
	subtitle: PropTypes.string,
	lowercase: PropTypes.bool,
	textProps: PropTypes.object,
}

SidewaysTitle.defaultProps = {
	subtitle: undefined,
	lowercase: false,
	textProps: {},
}
