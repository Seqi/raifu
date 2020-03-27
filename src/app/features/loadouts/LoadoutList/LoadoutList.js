import React, { useState, useRef, useEffect, useCallback } from 'react'

import { loadouts as loadoutService } from 'app/data/api'
import { ErrorOverlay, LoadingOverlay } from 'app/shared/state'
import { ResourceList } from 'app/shared/resources'
import { LoadoutCard } from 'app/shared/cards'

import EditLoadoutDialog from '../dialogs/EditLoadoutDialog'

const defaultState = {loadouts: null, loading: true, error: false}

let LoadoutList = ({ history, location }) => {
	let [{ loadouts, loading, error }, setLoadout] = useState(defaultState)

	let mounted = useRef(true)

	useEffect(() => () => mounted.current = false, [])

	let loadLoadout = useCallback(() => {
		setLoadout(defaultState)
		
		loadoutService.get()
			.then(result => mounted.current && setLoadout({ loadouts: result, loading: false, error: false }))			
			.catch(e => mounted.current && setLoadout({ loadouts: null, loading: false, error: true }))
	}, [])	
	useEffect(() => { loadLoadout() }, [loadLoadout])

	let viewLoadout = useCallback((loadout) => { history.push(`${location.pathname}/${loadout.id}`) }, [history, location])

	if (loading) {
		return <LoadingOverlay />
	}

	if (error) {
		return <ErrorOverlay message='Could not load loadouts.' onRetry={ loadLoadout } />
	}
	
	return (
		<ResourceList
			items={ loadouts }
			resource={ loadoutService }
			resourceName='loadout'
			card={ LoadoutCard }
			onResourceClick={ viewLoadout }
			renderAddDialog={ props => <EditLoadoutDialog action='Add' { ...props } /> }
			fullWidth={ true }
		/>
	)
}

export default LoadoutList
