/* eslint-disable react/prop-types */
import {
	Card,
	CardHeader,
	CardContent,
	styled,
	withStyles,
	CardHeaderProps,
} from '@material-ui/core'
import { FC } from 'react'

import { Resource } from '../../models/resource'

export const ResourceCard = styled(Card)({
	display: 'flex',
	flexDirection: 'column',
	position: 'relative',

	transition: 'transform ease-in 0.15s',
})

export type ResourceCardHeaderProps = Omit<CardHeaderProps, 'resource'> & {
	resource: Resource
}

export const ResourceCardHeaderComponent: FC<ResourceCardHeaderProps> = ({
	resource,
	...props
}) => (
	<CardHeader title={ resource.getTitle() } subheader={ resource.getSubtitle() } { ...props } />
)

// Use withStyles here as its easier to override the style rules for the inner elements
export const ResourceCardHeader = withStyles((theme) => ({
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
		},
	},
}))(ResourceCardHeaderComponent)

export const ResourceCardContent = styled(CardContent)({
	flex: 1,
	overflow: 'hidden',
	padding: '4px!important', // Mui has a :last-child to put extra padding on, don't want it!
})
