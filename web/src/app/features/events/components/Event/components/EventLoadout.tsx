import { FC } from 'react'
import PropTypes from 'prop-types'

import { Box, Typography, styled } from '@mui/material'

import { LoadoutView } from 'app/features/loadouts'
import { EventUser, EventUserPropShape } from '../../../models'

const EmptyLoadoutIcon = styled('i')(({ theme }) => ({
	fontSize: '5rem',
	color: theme.palette.text.disabled,
	marginBottom: theme.spacing(3),

	[theme.breakpoints.down('sm')]: {
		fontSize: '3rem',
		marginBottom: theme.spacing(1),
	},
	[theme.breakpoints.down(361)]: {
		fontSize: '2rem',
		marginBottom: theme.spacing(0.5),
	},
}))

type EventMyLoadoutProps = {
	user: EventUser
}

const EventMyLoadout: FC<EventMyLoadoutProps> = ({ user }) => {
	if (!user.loadout) {
		return (
			<Box width='100%' style={{ textAlign: 'center' }}>
				<Box paddingBottom={{ xs: 2, md: 3 }} marginX='auto'>
					<EmptyLoadoutIcon className='fas fa-crosshairs' />
				</Box>

				<Typography color='textSecondary'>No loadout added.</Typography>
			</Box>
		)
	}

	return <LoadoutView showTitle={false} loadout={user.loadout} editable={false} />
}

export default EventMyLoadout

EventMyLoadout.propTypes = {
	user: PropTypes.shape(EventUserPropShape).isRequired,
}
