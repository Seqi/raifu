import React, { useState, useRef, useEffect, useCallback, FC } from 'react'

import { loadouts as loadoutService } from 'app/data/api'
import { ErrorOverlay, LoadingOverlay } from 'app/shared/state'
import { ResourceListContainer as ResourceList } from 'app/shared/resources'
import { LoadoutCard } from 'app/shared/cards'

import EditLoadoutDialog from '../dialogs/EditLoadoutDialog'
import { RouteChildrenProps } from 'react-router'
import { Loadout } from 'app/shared/models/loadout'

type LoadoutListProps = RouteChildrenProps
type LoadoutListState = {
	loadouts: Loadout[]
	loading: boolean
	error: boolean
}

const defaultState: LoadoutListState = { loadouts: [], loading: true, error: false }

let LoadoutList: FC<LoadoutListProps> = ({ history, location }) => {
	let [{ loadouts, loading, error }, setLoadout] = useState<LoadoutListState>(
		defaultState
	)

	let mounted = useRef<boolean>(true)

	useEffect(() => {
		return () => {
			mounted.current = false
		}
	}, [])

	let loadLoadout = useCallback(() => {
		setLoadout(defaultState)

		loadoutService
			.get()
			.then(
				(result) =>
					mounted.current &&
					setLoadout({ loadouts: result, loading: false, error: false })
			)
			.catch(
				(e) =>
					mounted.current && setLoadout({ loadouts: [], loading: false, error: true })
			)
	}, [])

	useEffect(() => {
		loadLoadout()
	}, [loadLoadout])

	let viewLoadout = useCallback(
		(loadout) => {
			history.push(`${location.pathname}/${loadout.id}`)
		},
		[history, location]
	)

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
			renderAddDialog={ (props) => <EditLoadoutDialog action='Add' { ...props } /> }
			fullWidth={ true }
		/>
	)
}

export default LoadoutList
