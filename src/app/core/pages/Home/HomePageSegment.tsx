import React, { FC } from 'react'
import PropTypes from 'prop-types'
import { Typography, styled, Box } from '@material-ui/core'

const Container = styled(Box)(({ theme }) => ({
	flexDirection: 'row',
	position: 'relative',
	'& *': {
		flex: 1,
	},
	'&::before': {
		content: '""',
		width: '40%',
		position: 'absolute',
		top: 0,
		left: '30%',
		borderTop: `3px solid ${theme.palette.primary.main}`,
	},
	// Column takes precedence, if we're in sm mode, we don't
	// want it setting the even elements to row-reverse
	[theme.breakpoints.down('xs')]: {
		// TODO: Check this works
		'&&': {
			flexDirection: 'column',
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
	padding: theme.spacing(3),
	[theme.breakpoints.down('md')]: {
		fontSize: '3rem',
		padding: theme.spacing(2),
	},
	[theme.breakpoints.down('sm')]: {
		paddingTop: 0, // Space evenly between title/top border & image/bottom
		fontSize: '2.2rem',
	},
}))

const Subtitle = styled(Typography)(({ theme }) => ({
	color: theme.palette.text.secondary,
	paddingTop: theme.spacing(4),
	maxWidth: '40ch',
	[theme.breakpoints.down('sm')]: {
		fontSize: '1.05rem',
	},
}))

const ImageContainer = styled(Box)(({ theme }) => ({
	[theme.breakpoints.down('xs')]: {
		paddingTop: theme.spacing(2),
	},
	'& .img-wrapper': {
		height: '100%',
	},
	'& img': {
		display: 'block',
		height: '100%',
		margin: 'auto',
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
	ImageComponent: React.FC
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
				display='flex'
				alignItems='center'
				paddingY={ { xs: 6, sm: 8, md: 12, lg: 16 } }
			>
				<TextContanier maxWidth='50%'>
					<Title variant='h3'>{title}</Title>
					<Subtitle variant='subtitle1'>{text}</Subtitle>
				</TextContanier>

				<ImageContainer maxWidth='50%' display='flex' alignItems='center' height='500px'>
					{isComponentSegment(segment) ? (
						<segment.ImageComponent />
					) : (
						<div className='img-wrapper'>
							<img alt={ title } src={ segment.image } />
						</div>
					)}
				</ImageContainer>
			</Container>
		</React.Fragment>
	)
}

HomePageSegment.propTypes = {
	segment: PropTypes.shape({
		title: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
	}).isRequired,
}

export default HomePageSegment
