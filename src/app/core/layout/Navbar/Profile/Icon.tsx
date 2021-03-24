import { FC } from 'react'
import firebase from 'firebase/app'
import PropTypes from 'prop-types'

import { Avatar, IconButton } from '@material-ui/core'

type ProfileIconsProps = {
	user: firebase.User
	onClick: (e: Element) => any
}

const ProfileIcon: FC<ProfileIconsProps> = ({ user, onClick }) => (
	<IconButton onClick={ (e) => onClick(e.currentTarget) }>
		{user.photoURL ? (
			<Avatar alt={ user.displayName || user.email || 'avatar' } src={ user.photoURL } />
		) : (
			<i className='fa fa-user' />
		)}
	</IconButton>
)

ProfileIcon.propTypes = {
	// Temp cos lazy
	user: PropTypes.any.isRequired,
	onClick: PropTypes.func.isRequired,
}

export default ProfileIcon
