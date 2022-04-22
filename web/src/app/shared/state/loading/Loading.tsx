import { FC, useEffect, useState } from 'react'

import { Box, Fade, Typography, styled } from '@material-ui/core'

// Keyframes doesn't seem to work with styled components?
// falling back to css file for now...
import './Loading.css'

const REASSURANCE_TIME: number = 3000
const REASSURANCE_MESSAGE: string = "Hold tight! This won't take a second."

const LoadingContainer = styled(Box)(({ theme }) => ({
	'& i': {
		color: theme.palette.background.paper,
		fontSize: '10rem',

		[theme.breakpoints.down('xs')]: {
			fontSize: '7rem',
		},
	},
}))

const Loading: FC = () => {
	let [showReassurance, setShowReassurance] = useState<boolean>(false)

	useEffect(() => {
		let timeout = setTimeout(() => setShowReassurance(true), REASSURANCE_TIME)
		return () => clearTimeout(timeout)
	}, [])

	return (
		<LoadingContainer data-testid='loading-spinner' textAlign='center'>
			<i className='fa fa-crosshairs load-icon' />

			<Fade in={showReassurance} timeout={1500}>
				<Typography variant='h6'>{REASSURANCE_MESSAGE}</Typography>
			</Fade>
		</LoadingContainer>
	)
}

export default Loading
