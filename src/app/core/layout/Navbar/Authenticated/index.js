import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Button, Box } from '@material-ui/core'

import { UserContext } from 'app/core/auth/contexts'
import AuthenticatedUserProfile from './Profile'

let isHomePage = () => {
	return window.location.pathname.indexOf('app') === -1
}

let AuthenticatedUserNavbar = () => {
	let user = useContext(UserContext)	
	let history = useHistory()
	
	return (
		<React.Fragment>
			{ isHomePage() && (
				<Button onClick={ () => history.push('/app') } variant='outlined' color='primary'>
					Go to app
				</Button>
			)}

			<Box marginLeft='auto'>
				<AuthenticatedUserProfile user={ user } />
			</Box>
		</React.Fragment>
	)	
}

AuthenticatedUserNavbar.propTypes = {
	user: PropTypes.shape({
		displayName: PropTypes.string,
		email: PropTypes.string,
		photoURL: PropTypes.string
	}).isRequired
}

export default AuthenticatedUserNavbar
