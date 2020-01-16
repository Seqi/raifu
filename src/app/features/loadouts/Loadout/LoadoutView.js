import React from 'react'
import PropTypes from 'prop-types'

import ReactiveTitle from 'app/shared/text/ReactiveTitle'
import LoadoutWeaponList from './WeaponList/LoadoutWeaponList'
import LoadoutGearList from './GearList/LoadoutGearList'
import LoadoutClothingList from './ClothingList/LoadoutClothingList'
import LoadoutSeparator from './LoadoutSeparator'
import { LoadoutContextProvider } from './LoadoutContext'

let LoadoutView = ({ loadout, editable }) => {		
	return (
		<LoadoutContextProvider loadout={ loadout } editable={ editable }>
			<LoadoutWeaponList />

			<LoadoutSeparator>
				<ReactiveTitle variant='h4' mobileVariant='h5'>Gear</ReactiveTitle>
				<LoadoutGearList />
			</LoadoutSeparator>

			<LoadoutSeparator>
				<ReactiveTitle variant='h4' mobileVariant='h5'>Clothing</ReactiveTitle>
				<LoadoutClothingList />
			</LoadoutSeparator>
		</LoadoutContextProvider>
	)
}

LoadoutView.propTypes = {
	loadout: PropTypes.shape({
		id: PropTypes.string.isRequired,
		getTitle: PropTypes.func.isRequired,
		weapons: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			getTitle: PropTypes.func.isRequired,
			attachments: PropTypes.arrayOf(PropTypes.shape({
				id: PropTypes.string.isRequired,
				getTitle: PropTypes.func.isRequired,
			}))
		})),		
		gear: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			getTitle: PropTypes.func.isRequired,
		})),
		clothing: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			getTitle: PropTypes.func.isRequired,
		})),
	}).isRequired,
	editable: PropTypes.bool
}

LoadoutView.defaultProps = {
	editable: false
}

export default LoadoutView
