import React from 'react'

import { loadouts } from 'app/data/api'
import { LoadingOverlay, ErrorOverlay } from 'app/shared/state'
import ReactiveTitle from 'app/shared/text/ReactiveTitle'
import { LoadoutView } from 'app/features/loadouts'
import firebase from '../../../firebase'

let analytics = firebase.analytics()

export default class SharedLoadout extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			loadout: null,
			error: null,
			loading: true
		}
	}

	componentDidMount = () => {
		analytics.logEvent('view_shared_loadout')
		this.loadLoadout()
	}

	componentWillUnmount = () => (this.unmounted = true)

	loadLoadout = () => {
		this.setState({ loadout: null, error: null, loading: true }, () => {
			loadouts
				.getById(this.props.match.params.loadoutId)
				.then((loadout) => {
					!this.unmounted && this.setState({ loadout: loadout, loading: false })
				})
				.catch((err) => {
					!this.unmounted && this.setState({ loading: false, error: err })
				})
		})
	}

	render() {
		let { loadout, error, loading } = this.state
		if (loading) {
			return <LoadingOverlay />
		}

		if (error) {
			if (error.status === 404) {
				return <ErrorOverlay message='Loadout not found.' icon='fa fa-crosshairs' />
			}

			return <ErrorOverlay message='Could not load loadout.' onRetry={ () => this.loadLoadout() } />
		}

		return (
			<React.Fragment>
				<ReactiveTitle>{loadout.name}</ReactiveTitle>

				<LoadoutView loadout={ loadout } editable={ false } />
			</React.Fragment>
		)
	}
}
