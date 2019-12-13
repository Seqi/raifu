import React, { useState, useContext, useCallback } from 'react'
import PropTypes from 'prop-types'

import AddArmoryItemDialog from '../../../AddArmoryItemDialog/AddArmoryItemDialog'
import LoadoutWeaponAttachment from './Attachment/LoadoutWeaponAttachment'

import AddButton from 'app/shared/components/Buttons/AddButton'
import LoadoutContext from 'app/features/Loadouts/Loadout/LoadoutContext'
import database from '../../../../../../../../firebase/database'

let LoadoutWeaponAttachmentList = ({ weapon, canEdit }) => {
	let [dialog, setDialog] = useState(null)
	let { loadout, addWeaponAttachments } = useContext(LoadoutContext)

	let addAttachments = useCallback((attachmentIds) => {
		let addToDbPromises = attachmentIds.map(attachmentId => {
			return database.loadouts
				.loadout(loadout.id)
				.weapons
				.weapon(weapon.id)
				.attachments
				.add(attachmentId)				
		})

		return Promise.all(addToDbPromises)
			.then(attachments => addWeaponAttachments(weapon.id, attachments))
			.then(() => setDialog(null))
	}, [addWeaponAttachments, loadout, weapon])
	
	return (
		<React.Fragment>
			<div className='loadout-weapon-attachment-list-container'>
				{
					(weapon.attachments || []).map(attachment => (
						<div key={ attachment.id } className='loadout-weapon-attachment-item'>
							<LoadoutWeaponAttachment attachment={ attachment } weaponId={ weapon.id } canEdit={ canEdit } />
						</div>
					))
				}

				{ canEdit && 
					<div className='loadout-weapon-attachment-item'>
						<AddButton onClick={ () => setDialog('add') } />   
					</div> 
				}
			</div>

			{ canEdit && <AddArmoryItemDialog
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
	}).isRequired,
	canEdit: PropTypes.bool
}

LoadoutWeaponAttachmentList.defaultProps = {
	canEdit: false
}

export default LoadoutWeaponAttachmentList
