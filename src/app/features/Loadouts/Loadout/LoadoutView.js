import React from 'react'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'

import LoadoutGearList from './GearList/LoadoutGearList'
import LoadoutWeaponList from './WeaponList/LoadoutWeaponList'
import LoadoutSeparator from './LoadoutSeparator'
import LoadoutContextProvider from './LoadoutContextProvider'
import './Loadout.css'

let LoadoutView = ({ loadout, editable }) => {		
	return (
		<LoadoutContextProvider loadout={ loadout } editable={ editable }>
			<LoadoutWeaponList />

			<LoadoutSeparator>
				<Typography variant='h4'>Gear</Typography>
				<LoadoutGearList />
			</LoadoutSeparator>
		</LoadoutContextProvider>
	)
}

LoadoutView.propTypes = {
	loadout: PropTypes.shape({
		id: PropTypes.string.isRequired,
		getTitle: PropTypes.func.isRequired,
		gear: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			getTitle: PropTypes.func.isRequired,
		})),
		weapons: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			getTitle: PropTypes.func.isRequired,
			attachments: PropTypes.arrayOf(PropTypes.shape({
				id: PropTypes.string.isRequired,
				getTitle: PropTypes.func.isRequired,
			}))
		}))
	}).isRequired,
	editable: PropTypes.bool
}

LoadoutView.defaultProps = {
	editable: false
}

export default LoadoutView
