import { FC, useState } from 'react'
import firebase from 'firebase/app'
import PropTypes from 'prop-types'

import { Box, IconButton, styled } from '@material-ui/core'

import ProfileIcon from './Icon'
import ProfileMenu from './Menu'

const ProfileName = styled(Box)({})

type AuthenticatedUserProfileProps = {
	user: firebase.User
	small?: boolean
}

const AuthenticatedUserProfile: FC<AuthenticatedUserProfileProps> = ({ user, small }) => {
	let [menuAnchor, setMenuAnchor] = useState<Element | null>(null)
	return (
		<>
			<Box display='flex' alignItems='center'>
				{/* Use half measures because the iconbutton gives us unwanted half-measure padding */}
				<ProfileName
					fontSize={ small ? '0.8rem' : '1.2rem' }
					marginRight={ 1 }
					textAlign='right'
				>
					{user.displayName || user.email}
				</ProfileName>

				<IconButton
					size='small'
					onClick={ (e) => setMenuAnchor(e.currentTarget) }
					edge='end'
				>
					<ProfileIcon user={ user } />
				</IconButton>

				<ProfileMenu
					user={ user }
					anchor={ menuAnchor }
					onClose={ () => setMenuAnchor(null) }
				/>
			</Box>
		</>
	)
}

AuthenticatedUserProfile.propTypes = {
	user: PropTypes.any.isRequired,
	small: PropTypes.bool,
}

AuthenticatedUserProfile.defaultProps = {
	small: false,
}

export default AuthenticatedUserProfile
