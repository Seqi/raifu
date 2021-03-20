import { FC } from 'react'
import PropTypes from 'prop-types'

import { Box, styled } from '@material-ui/core'

import LoadoutWeaponItem from './LoadoutWeaponItem'
import LoadoutWeaponAttachmentList from './LoadoutWeaponAttachmentList'
import { Weapon, ArmoryItemPropShape } from 'app/shared/models/armory-item'

const LoadoutWeaponContainer = styled(Box)(({ theme }) => ({
	flexDirection: 'row',
	[theme.breakpoints.down('xs')]: {
		flexDirection: 'column',
	},
}))

type LoadoutWeaponProps = {
	weapon: Weapon
}

const LoadoutWeapon: FC<LoadoutWeaponProps> = ({ weapon }) => {
	return (
		<LoadoutWeaponContainer display='flex'>
			<div style={ { flex: '1' } }>
				<LoadoutWeaponItem weapon={ weapon } />
			</div>

			<div style={ { flex: 2 } }>
				<LoadoutWeaponAttachmentList weapon={ weapon } />
			</div>
		</LoadoutWeaponContainer>
	)
}

LoadoutWeapon.propTypes = {
	weapon: PropTypes.shape(ArmoryItemPropShape).isRequired,
}

export default LoadoutWeapon
