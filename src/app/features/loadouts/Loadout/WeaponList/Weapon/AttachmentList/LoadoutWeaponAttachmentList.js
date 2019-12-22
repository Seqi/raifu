import React, { useState, useContext, useCallback } from 'react'
import PropTypes from 'prop-types'

import { LoadoutContext } from 'app/features/loadouts'
import AddArmoryItemDialog from 'app/shared/dialogs/AddArmoryItemDialog'
import AddButton from 'app/shared/buttons/AddButton'
import LoadoutWeaponAttachment from './Attachment/LoadoutWeaponAttachment'
import database from '../../../../../../../firebase/database'

let LoadoutWeaponAttachmentList = ({ weapon }) => {
	let [dialog, setDialog] = useState(null)
	let { loadout, editable, addWeaponAttachments } = useContext(LoadoutContext)

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

				{ editable && 
					<div className='loadout-weapon-attachment-item'>
						<AddButton onClick={ () => setDialog('add') } />   
					</div> 
				}
			</div>

			{ editable && <AddArmoryItemDialog
				title={ `Add attachments to ${weapon.getTitle()}` }
				category='attachments'
				allowMultiple={ true }
				itemLoadFunc={ database.attachments.get }
				filterIds={ loadout.weapons
					.flatMap(w => w.attachments || [])
					.map(a => a.id) 
				}
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
