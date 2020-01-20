import React, { useState, useContext, useCallback } from 'react'
import PropTypes from 'prop-types'

import { LoadoutContext } from 'app/features/loadouts'
import AddResourceDialog from 'app/shared/dialogs/AddResourceDialog'
import AddButton from 'app/shared/buttons/AddButton'
import LoadoutWeaponAttachment from './Attachment/LoadoutWeaponAttachment'
import AvailableArmoryContext from '../../../AvailableArmoryContext'

let LoadoutWeaponAttachmentList = ({ weapon }) => {
	let [dialog, setDialog] = useState(null)
	let { editable, addWeaponAttachments } = useContext(LoadoutContext)
	let { attachments: availableAttachments } = useContext(AvailableArmoryContext)

	let addAttachments = useCallback(async (attachmentIds) => {
		await addWeaponAttachments(weapon.id, attachmentIds)
		setDialog(null)
	}, [addWeaponAttachments, weapon])
	
	return (
		<React.Fragment>
			<div className='loadout-weapon-attachment-list-container'>
				{
					(weapon.attachments || []).map(attachment => (
						<div key={ attachment.id } className='loadout-weapon-attachment-item'>
							<LoadoutWeaponAttachment attachment={ attachment } weaponId={ weapon.id } />
						</div>
					))
				}

				{ editable && (availableAttachments || []).length > 0 && 
					<div className='loadout-weapon-attachment-item'>
						<AddButton onClick={ () => setDialog('add') } />   
					</div> 
				}
			</div>

			{ editable && (availableAttachments || []).length > 0 && <AddResourceDialog
				title={ `Add attachments to ${weapon.getTitle()}` }
				items={ availableAttachments || [] }
				category='attachments'
				allowMultiple={ true }
				isOpen={ dialog === 'add' }
				onClose={ () => setDialog(null) }
				onSave={ addAttachments }
			/> }
		</React.Fragment>
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
