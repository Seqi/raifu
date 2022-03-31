import { useState, useRef, useEffect, useCallback, FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Box, Theme, useMediaQuery } from '@material-ui/core'

import { loadouts as loadoutService } from 'app/data/api'
import { ErrorOverlay, LoadingOverlay } from 'app/shared/state'
import { ResourceList } from 'app/features/resource'
import { SidewaysTitle } from 'app/shared/text/SidewaysTitle'

import EditLoadoutDialog from '../dialogs/EditLoadoutDialog'
import { LoadoutCard, LoadoutCardContainer } from '../cards'
import { Loadout } from '../../models'

type LoadoutListState = {
	loadouts: Loadout[]
	loading: boolean
	error: boolean
}

const defaultState: LoadoutListState = { loadouts: [], loading: true, error: false }

const LoadoutList: FC = () => {
	const navigate = useNavigate()
	const location = useLocation()

	const mounted = useRef<boolean>(true)
	useEffect(() => {
		mounted.current = true

		return () => {
			mounted.current = false
		}
	}, [])

	const [{ loadouts, loading, error }, setLoadout] =
		useState<LoadoutListState>(defaultState)

	const loadLoadout = useCallback(() => {
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

	const viewLoadout = useCallback(
		(loadout) => {
			navigate(`${location.pathname}/${loadout.id}`)
		},
		[navigate, location]
	)

	if (loading) {
		return <LoadingOverlay />
	}

	if (error) {
		return <ErrorOverlay message='Could not load loadouts.' onRetry={loadLoadout} />
	}

	return (
		<Box display='flex'>
			<SidewaysTitle title='loadouts' lowercase={true} marginRight={{ xs: 1, sm: 2 }} />

			<ResourceList
				items={loadouts}
				resource={loadoutService}
				resourceName='loadout'
				onResourceClick={viewLoadout}
				renderAddDialog={(props) => <EditLoadoutDialog action='Add' {...props} />}
				ItemTemplate={LoadoutCard}
				AddButtonTemplate={LoadoutCardContainer}
				gridItemProps={{ xs: 12, md: 6, lg: 4 }}
				gridContainerProps={{ spacing: xs ? 2 : 3 }}
			/>
		</Box>
	)
}

export default LoadoutList
