import React, { Component } from 'react'

import { ResourceList } from 'app/shared/components/lists'
import { AddWeaponDialog, AddAttachmentDialog, AddGearDialog } from './dialogs'
import database from '../../../firebase/database'

class Armory extends Component {
	render() {
		return (
			<React.Fragment>
				<section>
					<div className='section-container'>
						<ResourceList
							title='Weapons'
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
							title='Attachments'
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
							title='Gear'
							resource={ database.gear }
							resourceType='gear'
							renderAddDialog={ (isOpen, onClose, onSave) => (
								<AddGearDialog isOpen={ isOpen } onClose={ onClose } onSave={ onSave } />
							) } 
						/>
					</div>
				</section>
			</React.Fragment>
		)
	}
}

export default Armory
