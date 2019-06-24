import React from 'react'
import Typography from '@material-ui/core/Typography'

import SharedNotFound from './SharedNotFound'
import { Loading, Error } from 'app/shared/components'
import LoadoutView from 'app/shared/components/Views/Loadout/LoadoutView'
import database from '../../../firebase/database'

export default class SharedLoadout extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			loadout: null,
			error: null,
			loading: true
		}
	}

	componentDidMount = () => this.loadLoadout()

	componentWillUnmount = () => this.unmounted = true

	loadLoadout = () => {
		this.setState({ error: null, loading: true }, () => {
			database.loadouts.getById(this.props.match.params.loadoutId)
				.then((loadout) => {
					!this.unmounted && this.setState({ loadout: loadout, loading: false, error: null })
				})
				.catch((err) => {
					let error = null
					if (err.status !== 404) {
						error = err.statusMessage || err
					}

					!this.unmounted && this.setState({ loadout: null, loading: false, error: error })
				})
		})	
	}

	render() {
		let { loadout: data, error, loading } = this.state
		if (loading) {
			return <Loading />
		}
	
		if (error) {
			return <Error error={ error } onRetry={ () => this.loadLoadout() } />
		}
	
		if (!data) {
			return <SharedNotFound entityName={ 'Loadout' } />
		}
	
		return (
			<React.Fragment>
				<Typography variant='h3' >
					{ data.name }					
				</Typography>
	
				<LoadoutView loadout={ data } />
			</React.Fragment>
		)
	}
}