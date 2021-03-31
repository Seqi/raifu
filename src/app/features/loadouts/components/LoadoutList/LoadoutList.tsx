import React, { useState, useRef, useEffect, useCallback, FC } from 'react'
import { RouteChildrenProps } from 'react-router'

import { loadouts as loadoutService } from 'app/data/api'
import { ErrorOverlay, LoadingOverlay } from 'app/shared/state'
import { ResourceList } from 'app/features/resource'

import EditLoadoutDialog from '../dialogs/EditLoadoutDialog'
import { LoadoutCard, LoadoutCardContainer } from '../cards'
import { Loadout } from '../../models'

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
			cardContainer={ LoadoutCardContainer }
			onResourceClick={ viewLoadout }
			renderAddDialog={ (props) => <EditLoadoutDialog action='Add' { ...props } /> }
			fullWidth={ true }
		/>
	)
}

export default LoadoutList
