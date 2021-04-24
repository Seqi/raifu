import { FC } from 'react'

import { makeStyles } from '@material-ui/core'

import ScrollingWeaponsImage from './images/scrollingweapons.png'

const useStyles = makeStyles({
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
	},
	inner: {
		width: '3600px',
		height: '260px',
		background: `url(${ScrollingWeaponsImage}) repeat-x`,
		animation: '$slide 30s linear infinite',
	},
})

const ScrollingWeapons: FC = () => {
	const classes = useStyles()

	return (
		<div className={ classes.container }>
			<div className={ classes.inner } />
		</div>
	)
}

export default ScrollingWeapons
