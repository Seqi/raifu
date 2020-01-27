import React from 'react'

import { LoadingOverlay, ErrorOverlay } from 'app/shared'
import ReactiveTitle from 'app/shared/text/ReactiveTitle'
import { LoadoutView } from 'app/features/loadouts'
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
		this.setState({ loadout: null, error: null, loading: true }, () => {
			database.loadouts.getById(this.props.match.params.loadoutId)
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
				<ReactiveTitle>{ loadout.name }</ReactiveTitle>
	
				<LoadoutView loadout={ loadout } editable={ false }/>
			</React.Fragment>
		)
	}
}