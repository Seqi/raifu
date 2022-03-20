import { FC, useContext } from 'react'
import { useNavigate } from 'react-router'

import {
	Box,
	BoxProps,
	Button,
	styled,
	Theme,
	Typography,
	useMediaQuery,
} from '@material-ui/core'

import { UserContext } from 'app/core/auth/contexts'

import CallToActionImage from './images/2guns-accent.png'

const Title = styled(Typography)(({ theme }) => ({
	marginLeft: 'auto',
	maxWidth: '12ch',
	[theme.breakpoints.down('md')]: {
		fontSize: '3.25rem',
	},
	[theme.breakpoints.down('sm')]: {
		fontSize: '3rem',
		maxWidth: '8ch',
	},
	[theme.breakpoints.down('xs')]: {
		maxWidth: '12ch',
	},
	[theme.breakpoints.down(376)]: {
		fontSize: '2.5rem',
	},
}))

const Subtitle = styled(Typography)(({ theme }) => ({
	color: theme.palette.text.secondary,
	maxWidth: '30ch',
	marginLeft: 'auto',

	[theme.breakpoints.down('md')]: {
		fontSize: '1.1rem',
	},
	[theme.breakpoints.down('sm')]: {
		fontSize: '1rem',
	},
	[theme.breakpoints.down(376)]: {
		fontSize: '0.9rem',
	},
}))

const InfoContainer = styled(Box)(({ theme }) => ({
	'& > *': {
		padding: theme.spacing(2, 0),
	},

	[theme.breakpoints.down('xs')]: {
		paddingRight: theme.spacing(3),
	},
	[theme.breakpoints.down(376)]: {
		paddingRight: theme.spacing(1),
	},
}))

const ActionButtonRow = styled(Box)(({ theme }) => ({
	'& > :not(:last-child)': {
		marginRight: theme.spacing(2),
	},
}))

const ActionButton = styled(Button)({
	padding: '9px 27px',
})

const CallToAction: FC<BoxProps> = (props) => {
	const xs = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'))
	const largeScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

	const navigate = useNavigate()
	const user = useContext(UserContext)

	return (
		<Box display='flex' {...props}>
			{/* Image, don't show on phones and small screens */}
			{!xs && (
				<Box margin='auto' maxWidth='50%' flex={1}>
					<Box>
						<img alt='Call to action' style={{ width: '100%' }} src={CallToActionImage} />
					</Box>
				</Box>
			)}

			{/* Text */}
			<Box marginY='auto' maxWidth={xs ? 'initial' : '50%'} flex={1}>
				<InfoContainer textAlign='right' marginX='auto'>
					<Title variant='h2'>We take toy guns seriously.</Title>

					<Subtitle variant='subtitle1'>
						Website for people who spend thousands on little plastic pellet spitters and
						then spend their weekend pretending to be a cool army man secret agent.
					</Subtitle>

					<ActionButtonRow>
						{user ? (
							<ActionButton
								color='primary'
								variant='outlined'
								size={largeScreen ? 'large' : 'small'}
								onClick={(_) => navigate('/app')}
							>
								Go to app
							</ActionButton>
						) : (
							<>
								<ActionButton
									color='primary'
									variant='outlined'
									size={largeScreen ? 'large' : 'small'}
									onClick={(_) => navigate('/login/signup')}
								>
									Sign Up
								</ActionButton>

								<ActionButton
									color='primary'
									variant='outlined'
									size={largeScreen ? 'large' : 'small'}
									onClick={(_) => navigate('/login')}
								>
									Log In
								</ActionButton>
							</>
						)}
					</ActionButtonRow>
				</InfoContainer>
			</Box>
		</Box>
	)
}

export default CallToAction
