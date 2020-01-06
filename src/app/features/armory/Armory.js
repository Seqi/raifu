import React from 'react'

import { ResourceList } from 'app/shared/resources'
import { AddWeaponDialog, AddAttachmentDialog, AddGearDialog, AddClothingDialog } from './dialogs'
import database from '../../../firebase/database'

let Armory = () => {
	return (
		<React.Fragment>
			<section>
				<div className='section-container'>
					<ResourceList
						resource={ database.weapons }
						resourceType='weapons'
						renderAddDialog={ (isOpen, onClose, onSave) => (
							<AddWeaponDialog isOpen={ isOpen } onClose={ onClose } onSave={ onSave } />
						) } 
					/>
				</div>
			</section>

			<section>
				<div className='section-container'>
					<ResourceList
						resource={ database.attachments }
						resourceType='attachments'
						renderAddDialog={ (isOpen, onClose, onSave) => (
							<AddAttachmentDialog isOpen={ isOpen } onClose={ onClose } onSave={ onSave } />
						) } 
					/>
				</div>
			</section>

			<section>
				<div className='section-container'>
					<ResourceList
						resource={ database.gear }
						resourceType='gear'
						renderAddDialog={ (isOpen, onClose, onSave) => (
							<AddGearDialog isOpen={ isOpen } onClose={ onClose } onSave={ onSave } />
						) } 
					/>
				</div>
			</section>

			<section>
				<div className='section-container'>
					<ResourceList
						resource={ database.clothing }
						resourceType='clothing'
						renderAddDialog={ (isOpen, onClose, onSave) => (
							<AddClothingDialog isOpen={ isOpen } onClose={ onClose } onSave={ onSave } />
						) } 
					/>
				</div>
			</section>
		</React.Fragment>
	)
}

export default Armory
