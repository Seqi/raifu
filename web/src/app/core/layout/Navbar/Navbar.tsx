import { FC, useContext } from 'react'
import PropTypes from 'prop-types'

import { Box, styled, BoxProps, useMediaQuery, Theme } from '@material-ui/core'

import { UserContext } from 'app/core/auth/contexts'

import { Logo, LogoProps } from '../Logo'
import UserProfile from './Profile'

const NavbarContainer = styled(Box)(({ theme }) => ({
	[theme.breakpoints.down(376)]: {
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1),
	},
}))

type NavbarProps = BoxProps & {
	showLogo?: boolean
	logoProps?: LogoProps
}

const Navbar: FC<NavbarProps> = ({ showLogo, logoProps, ...props }) => {
	const user = useContext(UserContext)
	const small = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'))

	return (
		<NavbarContainer
			paddingY={{ xs: 3, md: 4, lg: 5 }}
			display='flex'
			alignItems='center'
			{...props}
		>
			{/* Left side */}
			{showLogo && (
				<Logo
					display='flex'
					alignItems='center'
					width='25%'
					minWidth='100px'
					maxWidth='250px'
					subtitle={false}
					{...logoProps}
				/>
			)}

			{/* Right Side */}
			<Box display='flex' marginLeft='auto' paddingLeft={2}>
				{user && (
					<Box marginLeft={{ xs: 1, sm: 3 }} marginY='auto'>
						<UserProfile user={user} small={small} />
					</Box>
				)}
			</Box>
		</NavbarContainer>
	)
}

Navbar.propTypes = {
	showLogo: PropTypes.bool,
	logoProps: PropTypes.object,
}

Navbar.defaultProps = {
	showLogo: true,
	logoProps: {},
}

export default Navbar
