import { FC } from 'react'
import PropTypes from 'prop-types'

import { Box, styled } from '@material-ui/core'

import LoadoutWeaponItem from './LoadoutWeaponItem'
import LoadoutWeaponAttachmentList from './LoadoutWeaponAttachmentList'
import {
	LoadoutWeapon as LoadoutWeaponType,
	LoadoutWeaponPropType,
} from 'app/shared/models/loadout'

const LoadoutWeaponContainer = styled(Box)(({ theme }) => ({
	flexDirection: 'row',
	[theme.breakpoints.down('xs')]: {
		flexDirection: 'column',
	},
}))

type LoadoutWeaponProps = {
	weapon: LoadoutWeaponType
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
	weapon: PropTypes.shape(LoadoutWeaponPropType).isRequired,
}

export default LoadoutWeapon
