import React, { useState, useContext, useCallback } from 'react'
import PropTypes from 'prop-types'

import { Box, Typography, styled } from '@material-ui/core'

import ResourceImage from 'app/shared/images/ResourceImage'
import { DeleteButton, ConfirmDeleteDialog } from 'app/shared/actions/delete'

import { LoadoutContext } from 'app/features/loadouts'

const LoadoutWeaponItemTitle = styled(Typography)(({ theme }) => ({
	position: 'absolute',
	zIndex: 1,

	[theme.breakpoints.down('xs')]: {
		position: 'initial'
	}
}))

const LoadoutWeaponItemImageContainer = styled(Box)(({ theme }) => ({
	height: '100%',
	'& img': {
		maxHeight: '700px',

		[theme.breakpoints.down('xs')]: {
			maxHeight: '300px'
		}
	},

	[theme.breakpoints.down('xs')]: {
		position: 'initial'
	}
}))

let LoadoutWeaponItem = ({ weapon }) => {
	let { editable, deleteWeapon } = useContext(LoadoutContext)
	let [dialog, setDialog] = useState()

	let deleteNewWeapon = useCallback(() => deleteWeapon(weapon.id), [deleteWeapon, weapon])

	return (
		<React.Fragment>
			<LoadoutWeaponItemTitle variant='h4'>
				{weapon.getTitle()}

				{editable && <DeleteButton dialogTitle={ weapon.getTitle() } onClick={ () => setDialog('delete') } />}
			</LoadoutWeaponItemTitle>

			<LoadoutWeaponItemImageContainer>
				<ResourceImage resource={ weapon } resourceType='weapons' />
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
	weapon: PropTypes.shape({
		id: PropTypes.string.isRequired,
		getTitle: PropTypes.func.isRequired
	}).isRequired
}

export default LoadoutWeaponItem
