import React, { useState, useRef, useEffect, useCallback } from 'react'

import { Error, LoadingOverlay } from 'app/shared'
import { ResourceList } from 'app/shared/resources'
import AddLoadoutDialog from './AddLoadoutDialog'
import database from '../../../../firebase/database'

let LoadoutList = ({ history, location }) => {
	let [{ loadouts, loading, error }, setLoadout] = useState({loadouts: null, loading: true, error: false})

	let mounted = useRef(true)

	useEffect(() => {
		database.loadouts.get()
			.then(result => mounted.current && setLoadout({ loadouts: result, loading: false, error: false }))			
			.catch(e => mounted.current && setLoadout({ loadouts: null, loading: false, error: true }))

		return () => mounted.current = false
	}, [])

	let viewLoadout = useCallback((loadout) => history.push(`${location.pathname}/${loadout.id}`), [history, location])

	if (loading) {
		return <LoadingOverlay />
	}

	if (error) {
		return <Error error='Could not load armory' />
	}
	
	return (
		<ResourceList
			items={ loadouts }
			showTitle={ false }
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
