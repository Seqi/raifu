import React from 'react'
import { useHistory } from 'react-router-dom'

import { Box, Button } from '@material-ui/core'

function UnauthenticatedUserNavbar() {	
	let history = useHistory()
	
	return (
		<Box ml='auto'>
			<Button
				variant='outlined'
				color='primary'
				size='large' 
				onClick={ _ => history.push('/login') }>
			Log in
			</Button>	
		</Box>		
	)
}

export default UnauthenticatedUserNavbar