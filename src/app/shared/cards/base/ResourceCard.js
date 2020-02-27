import React from 'react'
import { Card, CardHeader, CardContent, styled, withStyles } from '@material-ui/core'

const ResourceCard = styled(Card)({
	display: 'flex',
	flexDirection: 'column',
	position: 'relative',
		
	transition: 'transform ease-in 0.15s',
})

// Use withStyles here as its easier to override the style rules for the inner elements
const ResourceCardHeader = withStyles(theme => ({
	root: {
		paddingBottom: 0,
		[theme.breakpoints.down('xs')]: {
			paddingLeft: '16px',
			paddingRight: '16px',
		},
	},
	content: {
		borderBottom: `2px solid ${theme.palette.primary.main}`,
		paddingBottom: '5px',
	},
	title: {
		fontSize: '1.1rem',
		fontWeight: 700,
	},
	subheader: {
		fontSize: '0.8rem',
		[theme.breakpoints.down('xs')]: {
			fontSize: '0.6rem',
		}
	}
}))(({ resource, ...props }) => <CardHeader title={ resource.getTitle() } subheader={ resource.getSubtitle() } { ...props } />)

const ResourceCardContent = styled(CardContent)({
	flex: 1,
	overflow: 'auto',
	padding: '4px!important', // Mui has a :last-child to put extra padding on, don't want it!
})

export { ResourceCard, ResourceCardHeader, ResourceCardContent }