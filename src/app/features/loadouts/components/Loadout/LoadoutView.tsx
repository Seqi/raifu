import { FC } from 'react'
import PropTypes from 'prop-types'

import { LoadoutContextProvider } from './LoadoutContext'
import { AvailableArmoryContextProvider } from './AvailableArmoryContext'
import LoadoutWeaponList from './WeaponList/LoadoutWeaponList'
import LoadoutGearList from './GearList/LoadoutGearList'
import LoadoutClothingList from './ClothingList/LoadoutClothingList'
import LoadoutSeparator from './LoadoutSeparator'
import { Loadout, LoadoutPropType } from '../../models'

type LoadoutViewProps = {
	loadout: Loadout
	editable?: boolean
}

const LoadoutView: FC<LoadoutViewProps> = ({ loadout, editable = false }) => {
	return (
		<LoadoutContextProvider loadout={ loadout } editable={ editable }>
			<AvailableArmoryContextProvider>
				<LoadoutWeaponList />

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
			</AvailableArmoryContextProvider>
		</LoadoutContextProvider>
	)
}

LoadoutView.propTypes = {
	loadout: PropTypes.shape(LoadoutPropType).isRequired,
	editable: PropTypes.bool
}

LoadoutView.defaultProps = {
	editable: false
}

export default LoadoutView
