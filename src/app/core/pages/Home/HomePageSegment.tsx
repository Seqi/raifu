/* eslint-disable react/prop-types */
// Disabled as pain to get working with union tpyes
import React, { FC } from 'react'
import { Typography, styled, Box } from '@material-ui/core'

const Container = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	position: 'relative',

	// Create the cute little line separators
	'&::before': {
		content: '""',
		width: '40%',
		position: 'absolute',
		top: 0,
		left: '30%',
		borderTop: `3px solid ${theme.palette.primary.main}`,
	},

	'& > *': {
		flex: 1,
		maxWidth: '100%',
		[theme.breakpoints.up('md')]: {
			maxWidth: '50%',
		},
	},
}))

const TextContanier = styled(Box)(({ theme }) => ({
	textAlign: 'center',
	'& *': {
		margin: 'auto',
		maxWidth: '75%',
		[theme.breakpoints.down('sm')]: {
			maxWidth: '90%',
		},
	},
}))

const Title = styled(Typography)(({ theme }) => ({
	paddingLeft: theme.spacing(3),
	paddingRight: theme.spacing(3),

	[theme.breakpoints.down('md')]: {
		fontSize: '3rem',
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
	},
	[theme.breakpoints.down('sm')]: {
		paddingLeft: 0,
		paddingRight: 0,
		fontSize: '2.1rem',
	},
}))

const Subtitle = styled(Typography)(({ theme }) => ({
	color: theme.palette.text.secondary,
	maxWidth: '40ch',
	paddingTop: theme.spacing(6),

	[theme.breakpoints.down('lg')]: {
		paddingTop: theme.spacing(5),
	},

	[theme.breakpoints.down('md')]: {
		fontSize: '1.1rem',
		paddingTop: theme.spacing(3),
	},

	[theme.breakpoints.down('sm')]: {
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1),
		fontSize: '1rem',
	},
}))

const ImageContainer = styled(Box)({
	display: 'flex',
	alignItems: 'center',
})

const ImageBox = styled(Box)(({ theme }) => ({
	height: '100%',
	margin: '0 auto',
	'& img': {
		display: 'block',
		height: '100%',

		// Kinda hacky but who cares it works
		[theme.breakpoints.down('sm')]: {
			height: '300px',
		},
	},
}))

export type HomePageSegmentDefaultDetails = {
	title: string
	text: string
	image: string
}

export type HomePageSegmentDetails = {
	title: string
	text: string
	ImageComponent: React.ComponentType<any>
}

export type HomePageSegmentItem = HomePageSegmentDefaultDetails | HomePageSegmentDetails

export type HomePageSegmentProps = {
	segment: HomePageSegmentItem
}

const isComponentSegment = (
	segment: HomePageSegmentItem
): segment is HomePageSegmentDetails => {
	return 'ImageComponent' in segment && !!segment.ImageComponent
}

export const HomePageSegment: FC<HomePageSegmentProps> = ({ segment }) => {
	const { title, text } = segment

	return (
		<React.Fragment>
			<Container
				flexDirection={ { xs: 'column-reverse', md: 'row' } }
				paddingY={ { xs: 10, md: 12, xl: 16 } }
			>
				<TextContanier pt={ { xs: 6, sm: 6, md: 0 } }>
					<Title variant='h3'>{title}</Title>
					<Subtitle variant='subtitle1'>{text}</Subtitle>
				</TextContanier>

				<ImageContainer height={ { sm: '300px', md: '300px', lg: '400px', xl: '500px' } }>
					{isComponentSegment(segment) ? (
						<segment.ImageComponent />
					) : (
						<ImageBox>
							<img alt={ title } src={ segment.image } />
						</ImageBox>
					)}
				</ImageContainer>
			</Container>
		</React.Fragment>
	)
}

export default HomePageSegment
