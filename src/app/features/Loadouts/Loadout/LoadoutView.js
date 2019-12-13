import React from 'react'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'

import LoadoutGearList from './GearList/LoadoutGearList'
import LoadoutWeaponList from './WeaponList/LoadoutWeaponList'
import LoadoutSeparator from './LoadoutSeparator'
import LoadoutContextProvider from './LoadoutContextProvider'
import './Loadout.css'

let LoadoutView = ({ loadout, canEdit }) => {		
	return (
		<LoadoutContextProvider loadout={ loadout }>
			<LoadoutWeaponList canEdit={ canEdit } />

			<LoadoutSeparator>
				<Typography variant='h4'>Gear</Typography>
				<LoadoutGearList canEdit={ canEdit } />
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
	canEdit: PropTypes.bool
}

LoadoutView.defaultProps = {
	canEdit: false
}

export default LoadoutView
