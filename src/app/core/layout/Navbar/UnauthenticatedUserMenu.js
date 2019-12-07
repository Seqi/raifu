import React from 'react'
import { useHistory } from 'react-router-dom'

import Button from '@material-ui/core/Button'

function UnauthenticatedUserMenu() {	
	let history = useHistory()

	return (
		<Button
			style={ {
				textTransform: 'inherit',
				fontSize: '1.2rem',
				marginLeft: 'auto' 
			} } 
			variant='outlined'
			color='primary'
			size='large' 
			onClick={ _ => history.push('/login') }>
			Log in
		</Button>
	)
}

export default UnauthenticatedUserMenu