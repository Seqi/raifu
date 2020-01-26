import React from 'react'

import { LoadingOverlay, Error } from 'app/shared'
import ReactiveTitle from 'app/shared/text/ReactiveTitle'
import { LoadoutView } from 'app/features/loadouts'
import SharedNotFound from './SharedNotFound'
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
					!this.unmounted && this.setState({ loadout: null, loading: false, error: 'Could not retrieve loadout' })
				})
		})	
	}

	render() {
		let { loadout: data, error, loading } = this.state
		if (loading) {
			return <LoadingOverlay />
		}
	
		if (error) {
			return <Error error={ error } onRetry={ () => this.loadLoadout() } />
		}
	
		if (!data) {
			return <SharedNotFound entityName={ 'Loadout' } />
		}
	
		return (
			<React.Fragment>
				<ReactiveTitle>{ data.name }</ReactiveTitle>
	
				<LoadoutView loadout={ data } editable={ false }/>
			</React.Fragment>
		)
	}
}