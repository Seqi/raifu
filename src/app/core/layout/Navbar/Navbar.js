import './Navbar.css'
import React, { useContext } from 'react'

import UserContext from 'app/core/auth/UserContext'
import AuthenticatedUserMenu from './AuthenticatedUserMenu'
import UnauthenticatedUserMenu from './UnauthenticatedUserMenu'

let Navbar = () => {
	let user = useContext(UserContext)

	return (
		<div className='navbar'>
			{ user ? 
				<AuthenticatedUserMenu user={ user } /> : 
				<UnauthenticatedUserMenu /> }
		</div>
	)
}

export default Navbar
