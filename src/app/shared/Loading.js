import React, { useEffect, useState } from 'react'

import { Box, Fade, Typography, styled } from '@material-ui/core'

// Keyframes doesn't seem to work with styled components?
// falling back to css file for now...
import './Loading.css'

const REASSURANCE_TIME = 50
const REASSURANCE_MESSAGE = 'Hold tight! This won\'t take a second.'

const LoadingContainer = styled(Box)(({ theme }) => ({
	'& i': {
		color: theme.palette.background.paper,
		fontSize: '10rem',

		[theme.breakpoints.down('xs')]: {
			fontSize: '7rem',
		},
	}
}))

export default function Loading() {
	let [showReassurance, setShowReassurance] = useState(false)

	useEffect(() => {
		let timeout = setTimeout(() => setShowReassurance(true), REASSURANCE_TIME)
		return () => clearTimeout(timeout)			
	}, [])

	return (
		<LoadingContainer textAlign='center'>
			<i className='fa fa-crosshairs load-icon'/>

			<Fade in={ showReassurance } timeout={ 1500 }>
				<Typography variant='h6'>{ REASSURANCE_MESSAGE }</Typography>
			</Fade>
		</LoadingContainer>
	)
}
