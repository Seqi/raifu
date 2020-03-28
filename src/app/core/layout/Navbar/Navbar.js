import React, { useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { Box, styled, Button } from '@material-ui/core'

import { UserContext } from 'app/core/auth/contexts'
import UserProfile from './Profile'

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
	let history = useHistory()
	let location = useLocation()
	
	let isAuthenticated = !!user
	let isHomePage = location.pathname === '/'

	return (
		<NavbarContainer display='flex' alignItems='center'>
			{/* Left side */}
			{ isHomePage && (
				<Button onClick={ () => history.push('/app') } variant='outlined' color='primary'>
					Go to app
				</Button>
			)}

			{/* Right Side */}
			<Box marginLeft='auto'>
				{ isAuthenticated ? 
					<UserProfile user={ user } /> :
					<Button
						variant='outlined'
						color='primary'
						size='large' 
						onClick={ _ => history.push('/login') }
					>
						Log in
					</Button>
				}
			</Box>
		</NavbarContainer>
	)
}

export default Navbar
