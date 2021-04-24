import { FC } from 'react'
import { Box, BoxProps, Button, styled, Typography } from '@material-ui/core'

import CallToActionImage from './images/2guns-accent.png'

const Title = styled(Typography)({})

const Subtitle = styled(Typography)(({ theme }) => ({
	color: theme.palette.text.secondary,
	maxWidth: '30ch',
	marginLeft: 'auto',
}))

const InfoContainer = styled(Box)({
	'& > *': {
		padding: '18px 0px',
	},
})

const ActionButtonRow = styled(Box)(({ theme }) => ({
	'& > :not(:last-child)': {
		marginRight: theme.spacing(2),
	},
}))

const ActionButton = styled(Button)({
	padding: '9px 27px',
})

const CallToAction: FC<BoxProps> = (props) => {
	return (
		<Box display='flex' { ...props }>
			{/* Image */}
			<Box margin='auto' maxWidth='50%' flex={ 1 }>
				<Box>
					<img alt='Call to action' style={ { width: '100%' } } src={ CallToActionImage } />
				</Box>
			</Box>

			{/* Text */}
			<Box marginY='auto' maxWidth='50%' flex={ 1 }>
				<InfoContainer textAlign='right' marginX='auto' width='65%'>
					<Title variant='h2'>We take toy guns seriously.</Title>

					<Subtitle variant='subtitle1'>
						Website for weirdos who spend like $1000 on little plastic pellet spitters and
						then spend their weekend pretending to be a cool army man secret agent.
					</Subtitle>

					<ActionButtonRow>
						<ActionButton color='primary' variant='outlined' size='large'>
							Sign Up
						</ActionButton>

						<ActionButton color='primary' variant='outlined' size='large'>
							Log In
						</ActionButton>
					</ActionButtonRow>
				</InfoContainer>
			</Box>
		</Box>
	)
}

export default CallToAction
