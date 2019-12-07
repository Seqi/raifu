import React, { useContext, useState, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Menu, MenuItem, Avatar, Button } from '@material-ui/core'

import './AuthenticatedUserMenu.css'
import { AuthContext, UserContext } from 'app/core/auth/contexts'

let isHomePage = () => {
	return window.location.pathname.indexOf('app') === -1
}

let AuthenticatedUserMenu = ({ history }) => {
	let auth = useContext(AuthContext)
	let user = useContext(UserContext)
	let [anchor, setAnchor] = useState(null)

	let logout = useCallback(() => 	auth.logout()
		.then(() => history.push('/login')), [auth, history])

	let isOpen = !!anchor 
	return (
		<React.Fragment>
			{ isHomePage() && (
				<div style={ {flex: 1} }>
					<Button onClick={ () => history.push('/app') } variant='outlined' color='primary'>Go to app</Button>
				</div>
			)}

			<div className='user-profile'>
				<span className='user-name'>{user.displayName || user.email}</span>
				
				<button type='button' className='avatar-button' onClick={ evt => setAnchor(evt.currentTarget) }>
					{user.photoURL ? (
						<Avatar
							alt={ user.displayName || user.email }
							src={ user.photoURL }
							aria-owns={ isOpen ? 'auth-menu' : undefined }
							aria-haspopup='true'
						/>
					) : (
						<i className='avatar-icon fa fa-user' />
					)}
				</button>

				<Menu
					id='auth-menu'
					anchorEl={ anchor }
					open={ isOpen }
					onClose={ () => setAnchor(null) }
					anchorOrigin={ {
						vertical: 'top',
						horizontal: 'right'
					} }
					transformOrigin={ {
						vertical: 'top',
						horizontal: 'right'
					} }
				>
					<MenuItem onClick={ logout }>Logout</MenuItem>
				</Menu>
			</div>
		</React.Fragment>
	)	
}

AuthenticatedUserMenu.propTypes = {
	user: PropTypes.shape({
		displayName: PropTypes.string,
		email: PropTypes.string,
		photoURL: PropTypes.string
	}).isRequired
}

export default withRouter(AuthenticatedUserMenu)
