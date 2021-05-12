import { FC, useContext, useState } from 'react'
import firebase from 'firebase/app'
import PropTypes from 'prop-types'

import { Badge, Box, ListItemIcon, Menu, MenuItem, styled } from '@material-ui/core'
import { PowerSettingsNew } from '@material-ui/icons'
import Build from '@material-ui/icons/Build'

import { AuthContext } from 'app/core/auth/contexts'
import ProfileIcon from './Icon'
import ViewChangeLogDialog from './Updates/ViewChangeLogDialog'

const MenuContainer = styled(Box)(({ theme }) => ({
	width: '250px',
}))

const MenuHeader = styled(MenuItem)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	position: 'relative',
	marginBottom: theme.spacing(0.5),
	paddingBottom: theme.spacing(2),
	fontSize: '1rem',

	'&::after': {
		content: '""',
		borderBottom: `2px solid ${theme.palette.primary.main}`,
		width: '50%',
		position: 'absolute',
		bottom: 0,
		left: '25%',
	},
}))

const BigMenuItem = styled(MenuItem)(({ theme }) => ({
	padding: theme.spacing(1.5, 2.5),
}))

type ProfileMenuProps = {
	user: firebase.User
	anchor?: Element | null
	onClose: () => any
}

const ProfileMenu: FC<ProfileMenuProps> = ({ user, anchor, onClose }) => {
	let auth = useContext(AuthContext)
	const [dialogOpen, setDialogOpen] = useState<boolean>(false)
	const [hasUpdates, setHasUpdates] = useState<boolean>(false)

	return (
		<>
			<Menu
				id='auth-menu'
				anchorEl={ anchor }
				open={ !!anchor }
				onClose={ onClose }
				anchorOrigin={ {
					vertical: 'top',
					horizontal: 'left',
				} }
				transformOrigin={ {
					vertical: 'top',
					horizontal: 'right',
				} }
			>
				<MenuContainer>
					<MenuHeader>
						<Box display='flex' paddingRight={ 1 }>
							<ProfileIcon user={ user } />
						</Box>
						<span>{user.displayName || user.email}</span>
					</MenuHeader>

					<BigMenuItem>
						<ListItemIcon onClick={ (_) => setDialogOpen(true) }>
							<Badge badgeContent={ hasUpdates ? '!' : null } color='primary'>
								<Build />
							</Badge>
						</ListItemIcon>
						<span>Change log</span>
					</BigMenuItem>

					<BigMenuItem onClick={ auth?.logout }>
						<ListItemIcon>
							<PowerSettingsNew />
						</ListItemIcon>
						<span>Logout</span>
					</BigMenuItem>
				</MenuContainer>
			</Menu>

			<ViewChangeLogDialog
				onHasUpdates={ setHasUpdates }
				isOpen={ dialogOpen }
				onClose={ () => setDialogOpen(false) }
			/>
		</>
	)
}

ProfileMenu.propTypes = {
	user: PropTypes.any.isRequired,
	anchor: PropTypes.any,
	onClose: PropTypes.func.isRequired,
}

ProfileMenu.defaultProps = {
	anchor: null,
}

export default ProfileMenu
