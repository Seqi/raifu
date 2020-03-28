import React, { useContext, useState, useCallback } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { Box, styled, Button, IconButton, Badge, Tooltip } from '@material-ui/core'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'

import { UserContext } from 'app/core/auth/contexts'
import UserProfile from './Profile'
import ViewChangeLogDialog from './Updates/ViewChangeLogDialog'

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
	let [dialogOpen, setDialogOpen] = useState(false)
	let [hasUpdates, setHasUpdates] = useState(false)
	let user = useContext(UserContext)
	let history = useHistory()
	let location = useLocation()
	
	let isAuthenticated = !!user
	let isHomePage = location.pathname === '/'

	return (
		<NavbarContainer display='flex'>
			{/* Left side */}
			{ isHomePage && (
				<Button onClick={ () => history.push('/app') } variant='outlined' color='primary'>
					Go to app
				</Button>
			)}

			{/* Right Side */}
			<Box display='flex' marginLeft='auto'>
				<Tooltip title='View change log'>
					<IconButton onClick={ _ => setDialogOpen(true) }>
						<Badge badgeContent={ hasUpdates ? '!' : null } color='primary'>
							<InfoOutlinedIcon />
						</Badge>
					</IconButton>
				</Tooltip>

				<Box marginLeft={ 1.5 }>
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
			</Box>

			<ViewChangeLogDialog 
				onHasUpdates={ setHasUpdates } 
				isOpen={ dialogOpen } 
				onClose={ _ => setDialogOpen(false) } 
			/>
		</NavbarContainer>
	)
}

export default Navbar
