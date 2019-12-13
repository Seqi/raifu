import React, { useState, useCallback, useContext } from 'react'
import PropTypes from 'prop-types'

import ConfirmDeleteDialog from 'app/shared/components/Cards/ConfirmDeleteDialog'
import LoadoutItem from 'app/shared/components/Display/LoadoutItem'
import LoadoutContext from 'app/features/Loadouts/Loadout/LoadoutContext'

import database from '../../../../../../../../firebase/database'

export default function LoadoutWeaponAttachment ({ weaponId, attachment, canEdit }) {	
	let [ isDialogOpen, setIsDialogOpen ] = useState(false)
	let { loadout, deleteWeaponAttachment } = useContext(LoadoutContext)

	let deleteAttachment = useCallback(async () => {
		await database.loadouts
			.loadout(loadout.id)
			.weapons
			.weapon(weaponId)
			.attachments
			.delete(attachment.id)

		return deleteWeaponAttachment(weaponId, attachment.id)
	}, [loadout, weaponId, attachment, deleteWeaponAttachment])

	return (
		<React.Fragment>
			<LoadoutItem
				key={ attachment.id } 
				item={ attachment } 
				category={ 'attachments' }
				canDelete={ canEdit }
				onDelete={ () => setIsDialogOpen(true) }
				textStyle={ {bottom: '-10px'} }
			/>	
					
			{ canEdit && <ConfirmDeleteDialog 
				isOpen={ isDialogOpen }
				title={ attachment.getTitle() }
				onConfirm={ deleteAttachment }
				onClose={ () => setIsDialogOpen(false) }
			/> }
		</React.Fragment>
	)
}

LoadoutWeaponAttachment.propTypes = {
	weaponId: PropTypes.string.isRequired,
	attachment: PropTypes.shape({
		id: PropTypes.string.isRequired,
		getTitle: PropTypes.func.isRequired,
	}).isRequired,
	canEdit: PropTypes.bool
}

LoadoutWeaponAttachment.defaultProps = {
	canEdit: false
}
