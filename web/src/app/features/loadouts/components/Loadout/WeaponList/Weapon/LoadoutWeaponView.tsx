import { FC } from 'react'
import PropTypes from 'prop-types'

import { Box, Slide, styled } from '@material-ui/core'

import { LoadoutWeapon, LoadoutWeaponPropType } from '../../../../models'
import { LoadoutWeaponTitle } from '../../LoadoutItemTitle'
import LoadoutWeaponItem from './LoadoutWeaponItem'
import LoadoutWeaponAttachmentList from './LoadoutWeaponAttachmentList'

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
			<Slide in={true} direction='right'>
				<Box display='flex' flexDirection='column' flex={3} position='relative'>
					<LoadoutWeaponTitle variant='h4' align='center'>
						{weapon.getTitle()}
					</LoadoutWeaponTitle>
					<LoadoutWeaponItem weapon={weapon} />
				</Box>
			</Slide>

			<Slide in={true} timeout={400} direction='right'>
				<Box flex={5}>
					<LoadoutWeaponAttachmentList weapon={weapon} />
				</Box>
			</Slide>
		</LoadoutWeaponContainer>
	)
}

LoadoutWeaponView.propTypes = {
	weapon: PropTypes.shape(LoadoutWeaponPropType).isRequired,
}

export default LoadoutWeaponView
