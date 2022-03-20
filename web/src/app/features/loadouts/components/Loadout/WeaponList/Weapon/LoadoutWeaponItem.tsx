import { useState, useContext, useCallback, FC } from 'react'
import PropTypes from 'prop-types'

import { Box, styled } from '@material-ui/core'

import { ArmoryItemImage } from 'app/features/armory'
import { ConfirmDeleteDialog } from 'app/shared/actions/delete'

import { LoadoutWeapon, LoadoutWeaponPropType } from '../../../../models'
import { LoadoutContext } from '../../LoadoutContext'

const LoadoutWeaponItemImageContainer = styled(Box)(({ theme }) => ({
	flex: 1,

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

const LoadoutWeaponItem: FC<LoadoutWeaponItemProps> = ({ weapon }) => {
	let { deleteWeapon } = useContext(LoadoutContext)
	let [dialog, setDialog] = useState<'delete' | null>(null)

	let deleteNewWeapon = useCallback(() => deleteWeapon(weapon.id), [deleteWeapon, weapon])

	return (
		<>
			<LoadoutWeaponItemImageContainer>
				<ArmoryItemImage resource={weapon} resourceType='weapons' />
			</LoadoutWeaponItemImageContainer>

			<ConfirmDeleteDialog
				isOpen={dialog === 'delete'}
				title={weapon.getTitle()}
				onConfirm={deleteNewWeapon}
				onClose={() => setDialog(null)}
			/>
		</>
	)
}

LoadoutWeaponItem.propTypes = {
	weapon: PropTypes.shape(LoadoutWeaponPropType).isRequired,
}

export default LoadoutWeaponItem
