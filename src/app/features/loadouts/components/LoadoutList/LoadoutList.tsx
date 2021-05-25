import React, { useState, useRef, useEffect, useCallback, FC } from 'react'
import { RouteChildrenProps } from 'react-router'
import { Box, Theme, useMediaQuery } from '@material-ui/core'

import { loadouts as loadoutService } from 'app/data/api'
import { ErrorOverlay, LoadingOverlay } from 'app/shared/state'
import { ResourceList } from 'app/features/resource'

import EditLoadoutDialog from '../dialogs/EditLoadoutDialog'
import { LoadoutCard, LoadoutCardContainer } from '../cards'
import { Loadout } from '../../models'
import { SidewaysTitle } from 'app/shared/text/SidewaysTitle'

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

	const xs = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'))

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
		<Box display='flex'>
			<SidewaysTitle title='loadouts' lowercase={ true } marginRight={ 2 } />

			<ResourceList
				items={ loadouts }
				resource={ loadoutService }
				resourceName='loadout'
				onResourceClick={ viewLoadout }
				renderAddDialog={ (props) => <EditLoadoutDialog action='Add' { ...props } /> }
				ItemTemplate={ LoadoutCard }
				AddButtonTemplate={ LoadoutCardContainer }
				gridItemProps={ { xs: 12, md: 6, lg: 4 } }
				gridContainerProps={ { spacing: xs ? 2 : 3 } }
			/>
		</Box>
	)
}

export default LoadoutList
