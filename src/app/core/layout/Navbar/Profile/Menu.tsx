import { FC, useContext } from 'react'
import firebase from 'firebase/app'
import PropTypes from 'prop-types'

import { Box, ListItemIcon, Menu, MenuItem, styled } from '@material-ui/core'

import { AuthContext } from 'app/core/auth/contexts'
import { PowerSettingsNew } from '@material-ui/icons'
import ProfileIcon from './Icon'

const MenuContainer = styled(Box)(({ theme }) => ({
	width: '250px',
}))

const MenuHeader = styled(MenuItem)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	position: 'relative',
	marginBottom: theme.spacing(2),
	paddingBottom: theme.spacing(2),

	'&::after': {
		content: '""',
		borderBottom: `2px solid ${theme.palette.primary.main}`,
		width: '50%',
		position: 'absolute',
		bottom: 0,
		left: '25%',
	},
}))

type ProfileMenuProps = {
	user: firebase.User
	anchor?: Element | null
	onClose: () => any
}

const ProfileMenu: FC<ProfileMenuProps> = ({ user, anchor, onClose }) => {
	let auth = useContext(AuthContext)

	return (
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

				<MenuItem onClick={ auth?.logout }>
					<ListItemIcon>
						<PowerSettingsNew />
					</ListItemIcon>
					<span>Logout</span>
				</MenuItem>
			</MenuContainer>
		</Menu>
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
