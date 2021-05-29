import { FC } from 'react'
import PropTypes from 'prop-types'

import { Box, Slide, styled } from '@material-ui/core'

import LoadoutWeaponItem from './LoadoutWeaponItem'
import LoadoutWeaponAttachmentList from './LoadoutWeaponAttachmentList'
import { LoadoutWeapon, LoadoutWeaponPropType } from '../../../../models'
import ReactiveTitle from 'app/shared/text/ReactiveTitle'

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
		<Box>
			<ReactiveTitle variant='h4' mobileVariant='h5' align='center'>
				{weapon.getTitle()}
			</ReactiveTitle>

			<LoadoutWeaponContainer display='flex'>
				<Slide in={ true } direction='right'>
					<Box display='flex' flexDirection='column' flex={ 3 } position='relative'>
						<LoadoutWeaponItem weapon={ weapon } />
					</Box>
				</Slide>

				<Slide in={ true } timeout={ 400 } direction='right'>
					<Box flex={ 5 }>
						<LoadoutWeaponAttachmentList weapon={ weapon } />
					</Box>
				</Slide>
			</LoadoutWeaponContainer>
		</Box>
	)
}

LoadoutWeaponView.propTypes = {
	weapon: PropTypes.shape(LoadoutWeaponPropType).isRequired,
}

export default LoadoutWeaponView
