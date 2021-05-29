import { FC } from 'react'
import PropTypes from 'prop-types'

import { LoadoutView } from 'app/features/loadouts'
import { EventUser, EventUserPropShape } from '../../../models'
import { Box, useTheme, Typography } from '@material-ui/core'

type EventMyLoadoutProps = {
	user: EventUser
}

const EventMyLoadout: FC<EventMyLoadoutProps> = ({ user }) => {
	const theme = useTheme()

	if (!user.loadout) {
		return (
			<Box width='100%' style={ { textAlign: 'center' } }>
				<Box paddingBottom='24px' marginX='auto'>
					<i
						style={ {
							fontSize: '5rem',
							color: theme.palette.text.hint,
						} }
						className='fas fa-crosshairs'
					/>
				</Box>

				<Typography color='textSecondary'>No loadout added.</Typography>
			</Box>
		)
	}

	return <LoadoutView showTitle={ false } loadout={ user.loadout } editable={ false } />
}

export default EventMyLoadout

EventMyLoadout.propTypes = {
	user: PropTypes.shape(EventUserPropShape).isRequired,
}
