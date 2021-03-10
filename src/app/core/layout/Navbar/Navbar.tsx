import { FC, useContext, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { Box, styled, Button, IconButton, Badge, Tooltip } from '@material-ui/core'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'

import { UserContext } from 'app/core/auth/contexts'
import UserProfile from './Profile'
import ViewChangeLogDialog from './Updates/ViewChangeLogDialog'

const NavbarContainer = styled(Box)(({ theme }) => ({
	padding: theme.spacing(5, 7, 0),

	[theme.breakpoints.down('sm')]: {
		padding: theme.spacing(3, 4, 0),
	},

	[theme.breakpoints.down('xs')]: {
		padding: theme.spacing(2, 1, 0),
	},
}))

const Navbar: FC = () => {
	const [dialogOpen, setDialogOpen] = useState<boolean>(false)
	const [hasUpdates, setHasUpdates] = useState<boolean>(false)
	const user = useContext(UserContext)
	const history = useHistory()
	const location = useLocation()

	const isAuthenticated = user != null
	const isHomePage = location.pathname === '/'

	return (
		<NavbarContainer display='flex' alignItems='center'>
			{/* Left side */}
			{isHomePage && isAuthenticated && (
				<Button onClick={ () => history.push('/app') } variant='outlined' color='primary'>
					Go to app
				</Button>
			)}

			{/* Right Side */}
			<Box display='flex' marginLeft='auto'>
				<Tooltip title='View change log'>
					<IconButton onClick={ (_) => setDialogOpen(true) }>
						<Badge badgeContent={ hasUpdates ? '!' : null } color='primary'>
							<InfoOutlinedIcon />
						</Badge>
					</IconButton>
				</Tooltip>

				<Box marginLeft={ 1.5 }>
					{user != null ? (
						<UserProfile user={ user } />
					) : (
						<Button
							variant='outlined'
							color='primary'
							size='large'
							onClick={ (_) => history.push('/login') }
						>
							Log in
						</Button>
					)}
				</Box>
			</Box>

			<ViewChangeLogDialog
				onHasUpdates={ setHasUpdates }
				isOpen={ dialogOpen }
				onClose={ () => setDialogOpen(false) }
			/>
		</NavbarContainer>
	)
}

export default Navbar
