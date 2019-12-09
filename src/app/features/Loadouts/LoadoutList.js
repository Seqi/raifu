import React, { useCallback } from 'react'

import AddLoadoutDialog from './AddLoadoutDialog'
import { ResourceList } from 'app/shared/components/Lists'
import database from '../../../firebase/database'

let LoadoutList = ({ history, location }) => {
	let viewLoadout = useCallback((loadout) => history.push(`${location.pathname}/${loadout.id}`), [history, location])
	
	return (
		<ResourceList
			title=''
			resource={ database.loadouts }
			resourceType='loadout'
			onResourceClick={ viewLoadout }
			renderAddDialog={ (isOpen, onClose, onSave) => (
				<AddLoadoutDialog isOpen={ isOpen } onClose={ onClose } onSave={ onSave } />
			) } 
		/>
	)
}

export default LoadoutList
