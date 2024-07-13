import { FC } from 'react'

import { keyframes, styled } from '@mui/material/styles'

import ScrollingWeaponsImage from './images/scrollingweapons.png'

const slide = keyframes`
	from {
		transform: translate3d(0, 0, 0);
	}
	to {
		transform: translate3d(-2633px, 0, 0);
	}
`

const Outer = styled('div')(({ theme }) => ({
	overflow: 'hidden',
	borderRadius: '4px',
	width: '600px',
	marginLeft: '75px',
	marginRight: '75px',

	[theme.breakpoints.down(376)]: {
		margin: theme.spacing(0, 3),
	},
}))

const Inner = styled('div')(({ theme }) => ({
	width: '3600px',
	background: `url(${ScrollingWeaponsImage}) repeat-x`,
	backgroundSize: 'contain',
	animation: `${slide} 30s linear infinite`,

	height: '260px',
	[theme.breakpoints.down('xl')]: { height: '220px' },
	[theme.breakpoints.down('lg')]: { height: '180px' },
	[theme.breakpoints.down('md')]: { height: '180px' },
	[theme.breakpoints.down('sm')]: { height: '160px' },
}))

const ScrollingWeapons: FC = () => {
	return (
		<Outer>
			<Inner />
		</Outer>
	)
}

export default ScrollingWeapons
