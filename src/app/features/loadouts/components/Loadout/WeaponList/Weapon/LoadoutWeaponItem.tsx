import React, { useState, useContext, useCallback, FC } from 'react'
import PropTypes from 'prop-types'

import { Box, Typography, styled } from '@material-ui/core'

import { ArmoryItemImage } from 'app/features/armory'
import { DeleteButton, ConfirmDeleteDialog } from 'app/shared/actions/delete'

import { LoadoutWeapon, LoadoutWeaponPropType } from '../../../../models'
import LoadoutContext from '../../LoadoutContext'

const LoadoutWeaponItemTitle = styled(Typography)(({ theme }) => ({
	position: 'absolute',
	left: '3%',
	zIndex: 1,

	[theme.breakpoints.down('xs')]: {
		position: 'initial',
	},
}))

const LoadoutWeaponItemImageContainer = styled(Box)(({ theme }) => ({
	height: '100%',
	'& img': {
		maxHeight: '700px',

		[theme.breakpoints.down('xs')]: {
			maxHeight: '300px',
		},
	},

	[theme.breakpoints.down('xs')]: {
		position: 'initial',
	},
}))

type LoadoutWeaponItemProps = {
	weapon: LoadoutWeapon
}

let LoadoutWeaponItem: FC<LoadoutWeaponItemProps> = ({ weapon }) => {
	let { editable, deleteWeapon } = useContext(LoadoutContext)
	let [dialog, setDialog] = useState<'delete' | null>(null)

	let deleteNewWeapon = useCallback(() => deleteWeapon(weapon.id), [deleteWeapon, weapon])

	return (
		<React.Fragment>
			<LoadoutWeaponItemTitle variant='h4'>
				{weapon.getTitle()}

				{editable && <DeleteButton onClick={ () => setDialog('delete') } />}
			</LoadoutWeaponItemTitle>

			<LoadoutWeaponItemImageContainer>
				<ArmoryItemImage resource={ weapon } resourceType='weapons' />
			</LoadoutWeaponItemImageContainer>

			<ConfirmDeleteDialog
				isOpen={ dialog === 'delete' }
				title={ weapon.getTitle() }
				onConfirm={ deleteNewWeapon }
				onClose={ () => setDialog(null) }
			/>
		</React.Fragment>
	)
}

LoadoutWeaponItem.propTypes = {
	weapon: PropTypes.shape(LoadoutWeaponPropType).isRequired,
}

export default LoadoutWeaponItem
