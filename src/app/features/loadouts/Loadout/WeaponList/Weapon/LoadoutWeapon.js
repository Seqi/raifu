import React from 'react'
import PropTypes from 'prop-types'

import { Box, styled } from '@material-ui/core'

import LoadoutWeaponItem from './LoadoutWeaponItem'
import LoadoutWeaponAttachmentList from './LoadoutWeaponAttachmentList'

const LoadoutWeaponContainer = styled(Box)(({ theme }) => ({
	flexDirection: 'row',
	[theme.breakpoints.down('xs')]: {
		flexDirection: 'column',
	},
}))

let LoadoutWeapon = ({ weapon }) => {
	return (
		<LoadoutWeaponContainer display='flex'>
			<div style={{ flex: '1' }}>
				<LoadoutWeaponItem weapon={weapon} />
			</div>

			<div style={{ flex: 2 }}>
				<LoadoutWeaponAttachmentList weapon={weapon} />
			</div>
		</LoadoutWeaponContainer>
	)
}

LoadoutWeapon.propTypes = {
	weapon: PropTypes.object.isRequired,
}

export default LoadoutWeapon
