import React, { useContext } from 'react'

import { Box, makeStyles } from '@material-ui/core'

import { UserContext } from 'app/core/auth/contexts'
import AuthenticatedUserMenu from './AuthenticatedUserMenu'
import UnauthenticatedUserMenu from './UnauthenticatedUserMenu'

let useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(5, 7, 0),
		
		[theme.breakpoints.down('sm')]: {			
			padding: theme.spacing(2, 1, 0),
		}
	}
}))

let Navbar = () => {
	let user = useContext(UserContext)
	let classes = useStyles()

	return (
		<Box display='flex' alignItems='center' className={ classes.root }> 
			{ user ? 
				<AuthenticatedUserMenu user={ user } /> : 
				<UnauthenticatedUserMenu /> }
		</Box>
	)
}

export default Navbar
