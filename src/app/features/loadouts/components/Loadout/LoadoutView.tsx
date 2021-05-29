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
	showTitle?: boolean
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

const LoadoutView: FC<LoadoutViewProps> = ({
	loadout,
	showTitle = true,
	editable = false,
}) => {
	return (
		<LoadoutContextProvider loadout={ loadout } editable={ editable }>
			<AvailableArmoryContextProvider>
				<Box width='100%' display='flex'>
					{showTitle && (
						<SidewaysTitle
							title={ loadout!.getTitle() }
							lowercase={ true }
							mr={ { xs: 1, sm: 2 } }
						/>
					)}

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
	showTitle: PropTypes.bool,
}

LoadoutView.defaultProps = {
	editable: false,
	showTitle: true,
}

export default LoadoutView
