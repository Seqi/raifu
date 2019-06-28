import React from 'react'
import withRouter from 'react-router/withRouter'

import Button from '@material-ui/core/Button'

function UnauthenticatedUserMenu(props) {	
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
			onClick={ _ => props.history.push('/login') }>
			Log in
		</Button>
	)
}

export default withRouter(UnauthenticatedUserMenu)