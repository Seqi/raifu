import React from 'react'
import PropTypes from 'prop-types'

import { withTheme } from '@material-ui/core'

import './LoadoutWeaponContainer.css'

function LoadoutWeaponContainer(props) {
	let borderStyle = `1px solid ${props.theme.palette.primary.main}`

	return (
		<div className='loadout-weapon-container' style={ {					
			marginTop: '24px',
			marginBottom: '24px',
			borderTop: borderStyle,
			borderBottom: props.showBottom && borderStyle
		} }>
			{ props.children }
		</div>
	)
}		

LoadoutWeaponContainer.propTypes = {
	showBottom: PropTypes.bool
}

LoadoutWeaponContainer.defaultProps = {
	showBottom: false
}

export default withTheme()(LoadoutWeaponContainer)