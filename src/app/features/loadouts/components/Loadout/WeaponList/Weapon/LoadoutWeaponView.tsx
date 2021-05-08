import { FC } from 'react'
import PropTypes from 'prop-types'

import { Box, styled } from '@material-ui/core'

import LoadoutWeaponItem from './LoadoutWeaponItem'
import LoadoutWeaponAttachmentList from './LoadoutWeaponAttachmentList'
import { LoadoutWeapon, LoadoutWeaponPropType } from '../../../../models'

const LoadoutWeaponContainer = styled(Box)(({ theme }) => ({
	flexDirection: 'row',
	[theme.breakpoints.down('xs')]: {
		flexDirection: 'column',
	},
}))

type LoadoutWeaponProps = {
	weapon: LoadoutWeapon
}

const LoadoutWeaponView: FC<LoadoutWeaponProps> = ({ weapon }) => {
	return (
		<LoadoutWeaponContainer display='flex'>
			<div style={ { flex: '3', position: 'relative' } }>
				<LoadoutWeaponItem weapon={ weapon } />
			</div>

			<div style={ { flex: 5 } }>
				<LoadoutWeaponAttachmentList weapon={ weapon } />
			</div>
		</LoadoutWeaponContainer>
	)
}

LoadoutWeaponView.propTypes = {
	weapon: PropTypes.shape(LoadoutWeaponPropType).isRequired,
}

export default LoadoutWeaponView
