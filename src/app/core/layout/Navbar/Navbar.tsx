import { FC, useContext, useState } from 'react'

import { Box, styled, IconButton, Badge, Tooltip, BoxProps } from '@material-ui/core'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'

import { UserContext } from 'app/core/auth/contexts'
import Logo from '../Logo'
import UserProfile from './Profile'
import ViewChangeLogDialog from './Updates/ViewChangeLogDialog'

const NavbarContainer = styled(Box)(({ theme }) => ({
	[theme.breakpoints.down(370)]: {
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1),
	},
}))

const Navbar: FC<BoxProps> = (props) => {
	const [dialogOpen, setDialogOpen] = useState<boolean>(false)
	const [hasUpdates, setHasUpdates] = useState<boolean>(false)
	const user = useContext(UserContext)

	return (
		<NavbarContainer
			paddingX={ { xs: 4, sm: 0, xl: 7 } }
			paddingY={ { xs: 3, md: 4, lg: 5 } }
			display='flex'
			alignItems='center'
			{ ...props }
		>
			{/* Left side */}
			<Logo width='25%' minWidth='100px' maxWidth='250px' subtitle={ false } />

			{/* Right Side */}
			<Box display='flex' marginLeft='auto'>
				<Tooltip title='View change log'>
					<IconButton onClick={ (_) => setDialogOpen(true) } edge={ user ? false : 'end' }>
						<Badge badgeContent={ hasUpdates ? '!' : null } color='primary'>
							<InfoOutlinedIcon />
						</Badge>
					</IconButton>
				</Tooltip>

				{user && <UserProfile user={ user } />}
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
