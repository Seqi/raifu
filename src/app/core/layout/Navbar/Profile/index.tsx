import { FC, useState } from 'react'
import firebase from 'firebase/app'
import PropTypes from 'prop-types'

import { Box, IconButton, Badge, styled } from '@material-ui/core'

import ProfileIcon from './Icon'
import ProfileMenu from './Menu'
import ViewChangeLogDialog from './Updates/ViewChangeLogDialog'

const ProfileName = styled(Box)({})

type AuthenticatedUserProfileProps = {
	user: firebase.User
	small?: boolean
}

const AuthenticatedUserProfile: FC<AuthenticatedUserProfileProps> = ({ user, small }) => {
	let [menuAnchor, setMenuAnchor] = useState<Element | null>(null)
	const [dialogOpen, setDialogOpen] = useState<boolean>(false)
	const [hasUpdates, setHasUpdates] = useState<boolean>(false)

	return (
		<>
			<Box display='flex' alignItems='center'>
				{/* Use half measures because the iconbutton gives us unwanted half-measure padding */}
				{!small && (
					<ProfileName
						fontSize={ small ? '0.8rem' : '1.2rem' }
						marginRight={ 1 }
						textAlign='right'
					>
						{user.displayName || user.email}
					</ProfileName>
				)}

				<IconButton
					size='small'
					onClick={ (e) => setMenuAnchor(e.currentTarget) }
					edge='end'
				>
					<Badge badgeContent={ hasUpdates ? '!' : null } color='primary'>
						<ProfileIcon user={ user } />
					</Badge>
				</IconButton>

				<ProfileMenu
					user={ user }
					anchor={ menuAnchor }
					hasUpdates={ hasUpdates }
					onViewUpdates={ () => setDialogOpen(true) }
					onClose={ () => setMenuAnchor(null) }
				/>
			</Box>

			<ViewChangeLogDialog
				onHasUpdates={ setHasUpdates }
				isOpen={ dialogOpen }
				onClose={ () => setDialogOpen(false) }
			/>
		</>
	)
}

AuthenticatedUserProfile.propTypes = {
	user: PropTypes.any.isRequired,
	small: PropTypes.bool,
}

AuthenticatedUserProfile.defaultProps = {
	small: false,
}

export default AuthenticatedUserProfile
