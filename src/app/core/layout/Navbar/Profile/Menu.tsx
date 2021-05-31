import { FC, useContext } from 'react'
import firebase from 'firebase/app'
import PropTypes from 'prop-types'

import { Badge, Box, ListItemIcon, Menu, MenuItem, styled } from '@material-ui/core'
import { PowerSettingsNew } from '@material-ui/icons'
import Build from '@material-ui/icons/Build'

import { AuthContext } from 'app/core/auth/contexts'
import ProfileIcon from './Icon'

const MenuContainer = styled(Box)(({ theme }) => ({
	width: '250px',

	[theme.breakpoints.down('xs')]: {
		width: '200px',
	},
	[theme.breakpoints.down(321)]: {
		width: '175px',
	},
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

	[theme.breakpoints.down('xs')]: {
		fontSize: '0.8rem',
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1),
	},
}))

const BigMenuItem = styled(MenuItem)(({ theme }) => ({
	padding: theme.spacing(1.5, 2.5),

	[theme.breakpoints.down('xs')]: {
		padding: theme.spacing(1, 2),
		fontSize: '0.9rem',

		// Lazy
		'& > .MuiListItemIcon-root': {
			minWidth: '36px',

			'& .MuiSvgIcon-root': {
				fontSize: '1.2rem',
			},
		},
	},
}))

type ProfileMenuProps = {
	user: firebase.User
	hasUpdates: boolean
	anchor?: Element | null
	onViewUpdates: () => any
	onClose: () => any
}

const ProfileMenu: FC<ProfileMenuProps> = ({
	user,
	hasUpdates,
	anchor,
	onViewUpdates,
	onClose,
}) => {
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

				<BigMenuItem onClick={ onViewUpdates }>
					<ListItemIcon>
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
	)
}

ProfileMenu.propTypes = {
	user: PropTypes.any.isRequired,
	hasUpdates: PropTypes.bool.isRequired,
	anchor: PropTypes.any,
	onViewUpdates: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
}

ProfileMenu.defaultProps = {
	anchor: null,
}

export default ProfileMenu
