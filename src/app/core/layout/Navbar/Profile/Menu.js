import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { Menu, MenuItem } from '@material-ui/core'

import { AuthContext } from 'app/core/auth/contexts'

const ProfileMenu = ({ anchor, onClose }) => {
	let auth = useContext(AuthContext)

	return (
		<Menu
			id='auth-menu'
			anchorEl={anchor}
			open={!!anchor}
			onClose={onClose}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
		>
			<MenuItem onClick={auth.logout}>Logout</MenuItem>
		</Menu>
	)
}

ProfileMenu.propTypes = {
	anchor: PropTypes.any,
	onClose: PropTypes.func.isRequired,
}

ProfileMenu.defaultProps = {
	anchor: null,
}

export default ProfileMenu
