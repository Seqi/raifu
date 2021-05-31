import { FC } from 'react'
import PropTypes from 'prop-types'

import { Box, Slide, styled, Typography } from '@material-ui/core'

import LoadoutWeaponItem from './LoadoutWeaponItem'
import LoadoutWeaponAttachmentList from './LoadoutWeaponAttachmentList'
import { LoadoutWeapon, LoadoutWeaponPropType } from '../../../../models'

const LoadoutWeaponContainer = styled(Box)(({ theme }) => ({
	flexDirection: 'row',
	[theme.breakpoints.down('xs')]: {
		flexDirection: 'column',
	},
}))

const LoadoutWeaponTitle = styled(Typography)(({ theme }) => ({
	fontSize: '2rem',
	marginBottom: theme.spacing(2),

	[theme.breakpoints.down('md')]: {
		fontSize: '1.8rem',
	},
	[theme.breakpoints.down('sm')]: {
		fontSize: '1.5rem',
	},
}))

type LoadoutWeaponProps = {
	weapon: LoadoutWeapon
}

const LoadoutWeaponView: FC<LoadoutWeaponProps> = ({ weapon }) => {
	return (
		<LoadoutWeaponContainer display='flex'>
			<Slide in={ true } direction='right'>
				<Box display='flex' flexDirection='column' flex={ 3 } position='relative'>
					<LoadoutWeaponTitle variant='h4' align='center'>
						{weapon.getTitle()}
					</LoadoutWeaponTitle>
					<LoadoutWeaponItem weapon={ weapon } />
				</Box>
			</Slide>

			<Slide in={ true } timeout={ 400 } direction='right'>
				<Box flex={ 5 }>
					<LoadoutWeaponAttachmentList weapon={ weapon } />
				</Box>
			</Slide>
		</LoadoutWeaponContainer>
	)
}

LoadoutWeaponView.propTypes = {
	weapon: PropTypes.shape(LoadoutWeaponPropType).isRequired,
}

export default LoadoutWeaponView
