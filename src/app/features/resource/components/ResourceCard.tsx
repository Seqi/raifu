import {
	Card,
	CardHeader,
	CardContent,
	styled,
	withStyles,
	CardHeaderProps,
} from '@material-ui/core'

import { Resource } from '../models/resource'

// ##################
//     Base Card
// ##################
export const ResourceCard = styled(Card)({
	display: 'flex',
	flexDirection: 'column',
	position: 'relative',

	transition: 'transform ease-in 0.15s',
})

// ##################
//     Card Header
// ##################
// Override the default CardHeaderProps to take in a resource
export type ResourceCardHeaderProps<ResourceItem extends Resource> = Omit<
	CardHeaderProps,
	'resource'
> & {
	resource: ResourceItem
}

// Create the component that defaults the title and subtitle to use resource
export const ResourceCardHeaderBase = <ResourceItem extends Resource>({
	resource,
	title = resource.getTitle(),
	subheader = resource.getSubtitle(),
	...props
}: ResourceCardHeaderProps<ResourceItem>) => (
		<CardHeader title={ resource.getTitle() } subheader={ resource.getSubtitle() } { ...props } />
	)

export const ResourceCardHeader = withStyles((theme) => ({
	root: {
		paddingBottom: 0,
		[theme.breakpoints.down('xs')]: {
			paddingLeft: theme.spacing(1),
			paddingRight: theme.spacing(1),
			paddingTop: theme.spacing(1),
		},
	},
	content: {
		borderBottom: `2px solid ${theme.palette.primary.main}`,
		paddingBottom: '5px',
	},
	title: {
		fontSize: '1.1rem',
		fontWeight: 700,

		[theme.breakpoints.down('xs')]: {
			fontSize: '0.8rem',
			marginRight: '10px',
		},
	},
	subheader: {
		fontSize: '0.8rem',
		[theme.breakpoints.down('xs')]: {
			fontSize: '0.6rem',
		},
	},
}))(ResourceCardHeaderBase)

// ##################
//     Card Content
// ##################
export const ResourceCardContent = styled(CardContent)({
	flex: 1,
	overflow: 'hidden',
	padding: '4px!important', // Mui has a :last-child to put extra padding on, don't want it!
})
