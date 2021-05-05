import React, { useState, useRef, useEffect, useCallback, FC } from 'react'
import { RouteChildrenProps } from 'react-router'

import { loadouts as loadoutService } from 'app/data/api'
import { ErrorOverlay, LoadingOverlay } from 'app/shared/state'
import { ResourceList } from 'app/features/resource'

import EditLoadoutDialog from '../dialogs/EditLoadoutDialog'
import { LoadoutCard, LoadoutCardContainer } from '../cards'
import { Loadout } from '../../models'
import { Box } from '@material-ui/core'

type LoadoutListProps = RouteChildrenProps
type LoadoutListState = {
	loadouts: Loadout[]
	loading: boolean
	error: boolean
}

const defaultState: LoadoutListState = { loadouts: [], loading: true, error: false }

let LoadoutList: FC<LoadoutListProps> = ({ history, location }) => {
	let mounted = useRef<boolean>(true)
	useEffect(() => {
		mounted.current = true

		return () => {
			mounted.current = false
		}
	}, [])

	let [{ loadouts, loading, error }, setLoadout] = useState<LoadoutListState>(
		defaultState
	)

	let loadLoadout = useCallback(() => {
		setLoadout(defaultState)

		loadoutService
			.get()
			.then((result) => {
				if (mounted.current) {
					setLoadout({ loadouts: result, loading: false, error: false })
				}
			})
			.catch((e) => {
				if (mounted.current) {
					setLoadout({ loadouts: [], loading: false, error: true })
				}
			})
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
		<Box paddingTop={ 4 }>
			<ResourceList
				items={ loadouts }
				resource={ loadoutService }
				resourceName='loadout'
				onResourceClick={ viewLoadout }
				renderAddDialog={ (props) => <EditLoadoutDialog action='Add' { ...props } /> }
				ItemTemplate={ LoadoutCard }
				AddButtonTemplate={ LoadoutCardContainer }
				gridItemProps={ {
					xs: 4,
				} }
				gridContainerProps={ {
					spacing: 3,
				} }
			/>
		</Box>
	)
}

export default LoadoutList
