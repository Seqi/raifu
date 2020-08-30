import React from 'react'
import PropTypes from 'prop-types'

import { LoadoutContextProvider } from './LoadoutContext'
import { AvailableArmoryContextProvider } from './AvailableArmoryContext'
import LoadoutWeaponList from './WeaponList/LoadoutWeaponList'
import LoadoutGearList from './GearList/LoadoutGearList'
import LoadoutClothingList from './ClothingList/LoadoutClothingList'
import LoadoutSeparator from './LoadoutSeparator'

let LoadoutView = ({ loadout, editable }) => {
	return (
		<LoadoutContextProvider loadout={loadout} editable={editable}>
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
	loadout: PropTypes.shape({
		id: PropTypes.string.isRequired,
		getTitle: PropTypes.func.isRequired,
		weapons: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string.isRequired,
				getTitle: PropTypes.func.isRequired,
				attachments: PropTypes.arrayOf(
					PropTypes.shape({
						id: PropTypes.string.isRequired,
						getTitle: PropTypes.func.isRequired,
					})
				),
			})
		),
		gear: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string.isRequired,
				getTitle: PropTypes.func.isRequired,
			})
		),
		clothing: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string.isRequired,
				getTitle: PropTypes.func.isRequired,
			})
		),
	}).isRequired,
	editable: PropTypes.bool,
}

LoadoutView.defaultProps = {
	editable: false,
}

export default LoadoutView
