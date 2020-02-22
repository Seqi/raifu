import React, { useContext }  from 'react'
import PropTypes from 'prop-types'

import { Menu, MenuItem } from '@material-ui/core'

import { AuthContext } from 'app/core/auth/contexts'

const AuthenticatedUserMenu = ({ anchor, onClose }) => {
	let auth = useContext(AuthContext)

	return (
		<Menu
			id='auth-menu'
			anchorEl={ anchor }
			open={ !!anchor }
			onClose={ onClose }
			anchorOrigin={ {
				vertical: 'top',
				horizontal: 'right'
			} }
			transformOrigin={ {
				vertical: 'top',
				horizontal: 'right'
			} }
		>
			<MenuItem onClick={ auth.logout }>
				Logout
			</MenuItem>
		</Menu>
	)
}

AuthenticatedUserMenu.propTypes = {
	anchor: PropTypes.element,
	onClose: PropTypes.func.isRequired,
}

AuthenticatedUserMenu.defaultProps = {
	anchor: null
}

export default AuthenticatedUserMenu