import { FC, useState } from 'react'
import firebase from 'firebase/app'
import PropTypes from 'prop-types'

import { Box, styled } from '@material-ui/core'

import ProfileIcon from './Icon'
import ProfileMenu from './Menu'

const ProfileName = styled(Box)({
	fontSize: '1.2rem',
})

type AuthenticatedUserProfileProps = {
	user: firebase.User
}

const AuthenticatedUserProfile: FC<AuthenticatedUserProfileProps> = ({ user }) => {
	let [menuAnchor, setMenuAnchor] = useState<Element | null>(null)

	return (
		<Box display='flex' alignItems='center'>
			{/* Use half measures because the iconbutton gives us unwanted half-measure padding */}
			<ProfileName marginRight={ { xs: 0.5, sm: 1.5 } }>
				{user.displayName || user.email}
			</ProfileName>

			<ProfileIcon user={ user } onClick={ (tgt) => setMenuAnchor(tgt) } />

			<ProfileMenu anchor={ menuAnchor } onClose={ () => setMenuAnchor(null) } />
		</Box>
	)
}

AuthenticatedUserProfile.propTypes = {
	user: PropTypes.any.isRequired,
}

export default AuthenticatedUserProfile
