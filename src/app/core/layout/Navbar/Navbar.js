import React, { useContext } from 'react'

import { Box, styled } from '@material-ui/core'

import { UserContext } from 'app/core/auth/contexts'
import AuthenticatedUserNavbar from './Authenticated'
import UnauthenticatedUserNavbar from './Unauthenticated'

let NavbarContainer = styled(Box)(({ theme }) => ({
	padding: theme.spacing(5, 7, 0),
		
	[theme.breakpoints.down('sm')]: {			
		padding: theme.spacing(3, 4, 0),
	},

	[theme.breakpoints.down('xs')]: {			
		padding: theme.spacing(2, 1, 0),
	}
}))

let Navbar = () => {
	let user = useContext(UserContext)

	return (
		<NavbarContainer display='flex' alignItems='center'> 
			{ user ? 
				<AuthenticatedUserNavbar user={ user } /> : 
				<UnauthenticatedUserNavbar /> }
		</NavbarContainer>
	)
}

export default Navbar
