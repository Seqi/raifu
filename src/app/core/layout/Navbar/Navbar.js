import React, { useContext } from 'react'

import { Box, styled } from '@material-ui/core'

import { UserContext } from 'app/core/auth/contexts'
import AuthenticatedUserMenu from './AuthenticatedUserMenu'
import UnauthenticatedUserMenu from './UnauthenticatedUserMenu'

let NavbarContainer = styled(Box)(({ theme }) => ({
	padding: theme.spacing(5, 7, 0),
		
	[theme.breakpoints.down('sm')]: {			
		padding: theme.spacing(2, 1, 0),
	}
}))

let Navbar = () => {
	let user = useContext(UserContext)

	return (
		<NavbarContainer display='flex' alignItems='center'> 
			{ user ? 
				<AuthenticatedUserMenu user={ user } /> : 
				<UnauthenticatedUserMenu /> }
		</NavbarContainer>
	)
}

export default Navbar
