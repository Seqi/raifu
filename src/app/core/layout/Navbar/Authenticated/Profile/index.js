import React, { useState }  from 'react'
import PropTypes from 'prop-types'

import { Box, styled } from '@material-ui/core'

import AuthenticatedUserIcon from './Icon'
import AuthenticatedUserMenu from './Menu'

let ProfileDisplayName = styled(Box)({
	fontSize: '1.2rem'
})

const AuthenticatedUserProfile = ({ user }) => {
	let [menuAnchor, setMenuAnchor] = useState(null)

	return (
		<Box display='flex' alignItems='center'>
			{/* Use half measures because the iconbutton gives us unwanted half-measure padding */}
			<ProfileDisplayName marginRight={ { xs: 0.5, sm: 1.5 } }>{ user.displayName || user.email }</ProfileDisplayName>
			<AuthenticatedUserIcon user={ user } onClick={ evt => setMenuAnchor(evt.currentTarget) } />
			
			<AuthenticatedUserMenu anchor={ menuAnchor } onClose={ _ => setMenuAnchor(null) } />			
		</Box>
	)
}

AuthenticatedUserProfile.propTypes = {
	user: PropTypes.shape({		
		email: PropTypes.string,
		displayName: PropTypes.string,
		photoURL: PropTypes.string,
	}).isRequired,
}

export default AuthenticatedUserProfile