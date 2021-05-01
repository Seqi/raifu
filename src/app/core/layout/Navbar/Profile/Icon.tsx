import { FC } from 'react'
import firebase from 'firebase/app'
import PropTypes from 'prop-types'

import { Avatar, IconButton } from '@material-ui/core'
import { Person } from '@material-ui/icons'

type ProfileIconsProps = {
	user: firebase.User
	onClick: (e: Element) => any
	small?: boolean
}

const ProfileIcon: FC<ProfileIconsProps> = ({ user, onClick }) => {
	return (
		<IconButton size='small' onClick={ (e) => onClick(e.currentTarget) } edge='end'>
			{user.photoURL ? (
				<Avatar alt={ user.displayName || user.email || 'avatar' } src={ user.photoURL } />
			) : (
				<Person />
			)}
		</IconButton>
	)
}

ProfileIcon.propTypes = {
	// Temp cos lazy
	user: PropTypes.any.isRequired,
	onClick: PropTypes.func.isRequired,
}

export default ProfileIcon
