import React from 'react'
import withRouter from 'react-router/withRouter'

import Button from '@material-ui/core/Button'

function UnauthenticatedUserMenu(props) {	
	return (
		<Button variant='text' style={ {textTransform: 'inherit', fontSize: '1.2rem' } } size='large' onClick={ _ => props.history.push('/login') }>
			Log in
		</Button>
	)
}

export default withRouter(UnauthenticatedUserMenu)