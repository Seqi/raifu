import React from 'react'
import PropTypes from 'prop-types'
import { Typography, styled, Box } from '@material-ui/core'

let SegmentContainer = styled(Box)(({ theme }) => ({
	flexDirection: 'row',
	'& *': {
		flex: 1
	},
	'&:nth-child(even)': {
		flexDirection: 'row-reverse'
	},
	'&:not(:first-child)': {
		borderTop: `3px solid ${theme.palette.primary.main}`,
	},
	// Column takes precedence, if we're in sm mode, we don't
	// want it setting the even elements to row-reverse
	[theme.breakpoints.down('xs')]: {
		flexDirection: 'column!important'
	},
}))

let SegmentTextContainer = styled(Box)(({ theme }) => ({
	textAlign: 'center',
	'& *': {
		margin: 'auto',
		maxWidth: '75%',
		[theme.breakpoints.down('sm')]: {
			maxWidth: '90%'
		}
	},
}))

let SegmentTitle = styled(Typography)(({ theme }) => ({
	padding: theme.spacing(3),
	[theme.breakpoints.down('md')]: {
		fontSize: '3rem',
		padding: theme.spacing(2)
	},
	[theme.breakpoints.down('sm')]: {
		paddingTop: 0, // Space evenly between title/top border & image/bottom
		fontSize: '2.2rem',
	}
}))

let SegmentSubtitle = styled(Typography)(({ theme }) => ({	
	[theme.breakpoints.down('sm')]: {
		fontSize: '1.05rem',
	}
}))

let SegmentImageContainer = styled(Box)(({ theme }) => ({
	[theme.breakpoints.down('xs')]: {
		paddingTop: theme.spacing(2)
	},
	'& img': {
		display: 'block',
		margin: '0 auto',
		maxWidth: '80%',
		maxHeight: '450px'
	}
}))

function HomePageSegment({ title, text, image }) {
	return (
		<SegmentContainer display='flex' alignItems='center' paddingY={ { xs: 6, sm: 9 } }>
			<SegmentTextContainer>
				<SegmentTitle variant='h2'>{ title }</SegmentTitle> 
				<SegmentSubtitle variant='h5'>{ text }</SegmentSubtitle>
			</SegmentTextContainer>
			
			<SegmentImageContainer>
				<img alt={ title } src={ image } />
			</SegmentImageContainer>
		</SegmentContainer>		
	)
}

HomePageSegment.propTypes = {
	title: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
}

export default HomePageSegment