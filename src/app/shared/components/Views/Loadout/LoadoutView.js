import React from 'react'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'

import LoadoutGearList from './GearList/LoadoutGearList'
import LoadoutWeaponList from './WeaponList/LoadoutWeaponList'
import LoadoutSeparator from './LoadoutSeparator'
import './Loadout.css'

let LoadoutView = ({ canEdit }) => {		
	return (
		<div>
			<LoadoutWeaponList canEdit={ canEdit } />

			<LoadoutSeparator>
				<Typography variant='h4'>Gear</Typography>
				<LoadoutGearList canEdit={ canEdit } />
			</LoadoutSeparator>
		</div>
	)
}

LoadoutView.propTypes = {		
	canEdit: PropTypes.bool
}

LoadoutView.defaultProps = {
	canEdit: false
}

export default LoadoutView
