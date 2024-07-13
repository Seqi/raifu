import { FC } from 'react'
import firebase from 'firebase/app'
import PropTypes from 'prop-types'

import { Avatar } from '@mui/material'
import { Person } from '@mui/icons-material'

type ProfileIconsProps = {
	user: firebase.User
}

const ProfileIcon: FC<ProfileIconsProps> = ({ user }) => {
	return user.photoURL ? (
		<Avatar alt={user.displayName || user.email || 'avatar'} src={user.photoURL} />
	) : (
		<Person />
	)
}

ProfileIcon.propTypes = {
	// Temp cos lazy
	user: PropTypes.any.isRequired,
}

export default ProfileIcon
