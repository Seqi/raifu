import React from 'react'

import { LoadingOverlay, ErrorOverlay } from 'app/shared'
import ReactiveTitle from 'app/shared/text/ReactiveTitle'
import { LoadoutView } from 'app/features/loadouts'
import SharedNotFound from './SharedNotFound'
import database from '../../../firebase/database'

export default class SharedLoadout extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			loadout: null,
			error: false,
			loading: true
		}
	}

	componentDidMount = () => this.loadLoadout()

	componentWillUnmount = () => this.unmounted = true

	loadLoadout = () => {
		this.setState({ error: false, loading: true }, () => {
			database.loadouts.getById(this.props.match.params.loadoutId)
				.then((loadout) => {
					!this.unmounted && this.setState({ loadout: loadout, loading: false })
				})
				.catch((err) => {
					!this.unmounted && this.setState({ loadout: null, loading: false, error: true })
				})
		})	
	}

	render() {
		let { loadout, error, loading } = this.state
		if (loading) {
			return <LoadingOverlay />
		}
	
		if (error) {
			return <ErrorOverlay error='Could not load loadout.' onRetry={ () => this.loadLoadout() } />
		}
	
		if (!loadout) {
			return <SharedNotFound entityName={ 'Loadout' } />
		}
	
		return (
			<React.Fragment>
				<ReactiveTitle>{ loadout.name }</ReactiveTitle>
	
				<LoadoutView loadout={ loadout } editable={ false }/>
			</React.Fragment>
		)
	}
}