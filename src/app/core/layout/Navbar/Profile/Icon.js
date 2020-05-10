import React from 'react'
import PropTypes from 'prop-types'

import { Avatar, IconButton } from '@material-ui/core'

const ProfileIcon = ({ user, ...props }) => (
	<IconButton {...props}>
		{user.photoURL ? (
			<Avatar alt={user.displayName || user.email} src={user.photoURL} />
		) : (
			<i className='fa fa-user' />
		)}
	</IconButton>
)

ProfileIcon.propTypes = {
	user: PropTypes.shape({
		email: PropTypes.string,
		displayName: PropTypes.string,
		photoURL: PropTypes.string,
	}).isRequired,
}

export default ProfileIcon
