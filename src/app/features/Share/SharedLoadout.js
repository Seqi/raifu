import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'

import SharedNotFound from './SharedNotFound'
import { Loading, Error } from 'app/shared/components'
import LoadoutView from 'app/shared/components/Views/Loadout/LoadoutView'
import database from '../../../firebase/database'

export default function SharedLoadout(props) {
	let [ loadout, setLoadout ] = useState({data: null, error: null, loading: true })
	let unmounted = false

	useEffect(() => {
		loadLoadout()

		return () => unmounted = true
	}, [])

	let loadLoadout = () => {
		setLoadout({ error: null, loading: true })

		database.loadouts.getById(props.match.params.loadoutId)
			.then((loadout) => {
				!unmounted && setLoadout({ data: loadout, loading: false, error: null })
			})
			.catch((err) => {
				let error = null
				if (err !== 'Loadout not found') {
					error = err.message || err
				}

				!unmounted && setLoadout({ data: null, loading: false, error: error })
			})
	}

	if (loadout.loading) {
		return <Loading />
	}

	if (loadout.error) {
		return <Error error={ loadout.error } onRetry={ () => loadLoadout() } />
	}

	if (!loadout.data) {
		return <SharedNotFound entityName={ 'Loadout' } />
	}

	return (
		<React.Fragment>
			<Typography variant='h3' >
				{ loadout.data.name }					
			</Typography>

			<LoadoutView loadout={ loadout.data } />
		</React.Fragment>
	)
}