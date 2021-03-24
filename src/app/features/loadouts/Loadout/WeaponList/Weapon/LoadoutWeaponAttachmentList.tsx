import { useContext, useCallback, FC } from 'react'
import PropTypes from 'prop-types'

import { LoadoutContext } from 'app/features/loadouts'
import LoadoutResourceList from '../../LoadoutResourceList/LoadoutResourceList'
import AddResourceDialog from '../../dialogs/AddResourceDialog'
import AvailableArmoryContext from '../../AvailableArmoryContext'
import { LoadoutWeapon, LoadoutWeaponPropType } from 'app/shared/models/loadout'
import { Attachment } from 'app/shared/models/armory-item'

type LoadoutWeaponAttachmentListProps = {
	weapon: LoadoutWeapon
}

const LoadoutWeaponAttachmentList: FC<LoadoutWeaponAttachmentListProps> = ({
	weapon,
}) => {
	let { addWeaponAttachments, deleteWeaponAttachment } = useContext(LoadoutContext)
	let { attachments: availableAttachments } = useContext(AvailableArmoryContext)

	let addAttachments = useCallback(
		async (attachmentIds: string | string[]) => {
			await addWeaponAttachments(weapon.id, attachmentIds)
		},
		[addWeaponAttachments, weapon]
	)

	let deleteAttachment = useCallback(
		async (attachment: Attachment) => {
			await deleteWeaponAttachment(weapon.id, attachment.id)
		},
		[deleteWeaponAttachment, weapon]
	)

	return (
		<LoadoutResourceList
			resourceType='attachments'
			items={ weapon.attachments || [] }
			canAdd={ (availableAttachments || []).length > 0 }
			addItem={ addAttachments }
			deleteItem={ deleteAttachment }
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
	weapon: PropTypes.shape(LoadoutWeaponPropType).isRequired,
}

export default LoadoutWeaponAttachmentList
