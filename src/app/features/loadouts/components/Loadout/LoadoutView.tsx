import { FC } from 'react'
import PropTypes from 'prop-types'

import { LoadoutContextProvider } from './LoadoutContext'
import { AvailableArmoryContextProvider } from './AvailableArmoryContext'
import LoadoutWeaponList from './WeaponList/LoadoutWeaponList'
import LoadoutGearList from './GearList/LoadoutGearList'
import LoadoutClothingList from './ClothingList/LoadoutClothingList'
import LoadoutSeparator from './LoadoutSeparator'
import { Loadout, LoadoutPropType } from '../../models'
import { Box, styled } from '@material-ui/core'
import { SidewaysTitle } from 'app/shared/text/SidewaysTitle'

type LoadoutViewProps = {
	loadout: Loadout
	editable?: boolean
}

const LoadoutContainer = styled(Box)(({ theme }) => ({
	'& > :first-child': {
		paddingBottom: theme.spacing(8),
	},
	'& > :not(:first-child)': {
		position: 'relative',
		padding: theme.spacing(8, 0),

		'&::before': {
			content: '""',
			width: '30%',
			position: 'absolute',
			top: 0,
			left: '35%',
			borderTop: `2px solid ${theme.palette.primary.main}`,
		},
	},
}))

const LoadoutView: FC<LoadoutViewProps> = ({ loadout, editable = false }) => {
	return (
		<LoadoutContextProvider loadout={ loadout } editable={ editable }>
			<AvailableArmoryContextProvider>
				<Box display='flex'>
					<SidewaysTitle
						title={ loadout!.getTitle() }
						marginRight={ 2 }
						lowercase={ true }
						textProps={ { style: { position: 'sticky', top: '10%' } } }
					/>

					<Box flex='1'>
						<LoadoutContainer>
							<LoadoutWeaponList />
						</LoadoutContainer>

						{(loadout.gear.length > 0 || editable) && (
							<LoadoutSeparator>
								<LoadoutGearList />
							</LoadoutSeparator>
						)}

						{(loadout.clothing.length > 0 || editable) && (
							<LoadoutSeparator>
								<LoadoutClothingList />
							</LoadoutSeparator>
						)}
					</Box>
				</Box>
			</AvailableArmoryContextProvider>
		</LoadoutContextProvider>
	)
}

LoadoutView.propTypes = {
	loadout: PropTypes.shape(LoadoutPropType).isRequired,
	editable: PropTypes.bool,
}

LoadoutView.defaultProps = {
	editable: false,
}

export default LoadoutView
