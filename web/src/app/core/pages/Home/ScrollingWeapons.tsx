import { FC } from 'react'

import { Box, makeStyles } from '@material-ui/core'

import ScrollingWeaponsImage from './images/scrollingweapons.png'

const useStyles = makeStyles((theme) => ({
	'@keyframes slide': {
		'0%': {
			transform: 'translate3d(0, 0, 0)',
		},
		'100%': {
			transform: 'translate3d(-2633px, 0, 0)',
		},
	},
	container: {
		overflow: 'hidden',
		borderRadius: '4px',
		width: '600px',
		marginLeft: '75px',
		marginRight: '75px',
		[theme.breakpoints.down(376)]: {
			margin: theme.spacing(0, 3),
		},
	},
	inner: {
		width: '3600px',
		background: `url(${ScrollingWeaponsImage}) repeat-x`,
		backgroundSize: 'contain',
		animation: '$slide 30s linear infinite',

		height: '260px',
		[theme.breakpoints.down('lg')]: { height: '220px' },
		[theme.breakpoints.down('md')]: { height: '180px' },
		[theme.breakpoints.down('sm')]: { height: '180px' },
		[theme.breakpoints.down('xs')]: { height: '160px' },
	},
}))

const ScrollingWeapons: FC = () => {
	const classes = useStyles()

	return (
		<div className={ classes.container }>
			<Box className={ classes.inner } />
		</div>
	)
}

export default ScrollingWeapons
