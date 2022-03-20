import { FC } from 'react'
import PropTypes from 'prop-types'

import firebase from 'firebase/app'
import { Avatar } from '@material-ui/core'
import { Person } from '@material-ui/icons'

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
