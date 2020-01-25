import React, { useContext, useCallback } from 'react'
import PropTypes from 'prop-types'

import { LoadoutContext } from 'app/features/loadouts'
import AddResourceDialog from 'app/shared/dialogs/AddResourceDialog'
import LoadoutResourceList from '../../LoadoutResourceList/LoadoutResourceList'
import AvailableArmoryContext from '../../AvailableArmoryContext'

let LoadoutWeaponAttachmentList = ({ weapon }) => {
	let { addWeaponAttachments, deleteWeaponAttachment } = useContext(LoadoutContext)
	let { attachments: availableAttachments } = useContext(AvailableArmoryContext)

	let addAttachments = useCallback(async (attachmentIds) => {
		await addWeaponAttachments(weapon.id, attachmentIds)
	}, [addWeaponAttachments, weapon])
	
	return (
		<LoadoutResourceList
			resourceType='attachments'
			items={ weapon.attachments || [] }
			canAdd={ (availableAttachments || []).length > 0 }
			addItem={ addAttachments }
			deleteItem={ deleteWeaponAttachment }
			renderAddDialog={ (isOpen, onClose, onSave) => (
				<AddResourceDialog 
					title='Add attachments to loadout'
					items={ availableAttachments || [] }
					category='attachments'
					allowMultiple={ true }
					isOpen={ isOpen } 
					onSave={ onSave }
					onClose={ onClose } 
				/>
			) }
		/>
	)
}

LoadoutWeaponAttachmentList.propTypes = {
	weapon: PropTypes.shape({
		id: PropTypes.string.isRequired,
		getTitle: PropTypes.func.isRequired,
		attachments: PropTypes.array
	}).isRequired
}

export default LoadoutWeaponAttachmentList
