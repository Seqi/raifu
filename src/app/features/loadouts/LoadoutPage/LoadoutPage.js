import React from 'react'

import { LoadingOverlay, ErrorOverlay } from 'app/shared'
import { LoadoutView } from 'app/features/loadouts'
import ReactiveTitle from 'app/shared/text/ReactiveTitle'

import database from '../../../../firebase/database'
import LoadoutActions from './LoadoutActions'

class LoadoutPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loadout: null,
			loading: true,
			error: null,
		}
	}

	componentDidMount() {
		this.loadLoadout()
	}
	
	loadLoadout() {
		this.setState({ loading: true, error: null }, () => {
			database.loadouts
				.getById(this.props.match.params.id)
				.then((loadout) => {
					if (!this.isUnmounted) {
						this.setState({ loadout, loading: false })
					}
				})
				.catch((err) => {
					if (!this.isUnmounted) {
						this.setState({ error: err, loading: false })
					}
				})
		})
	}

	editLoadout(updatedLoadout) {
		let { loadout } = this.state

		return database.loadouts
			.edit(loadout.id, { ...updatedLoadout })
			.then(() => this.onLoadoutUpdated(updatedLoadout))
			.then(() => this.setDialog(null))
	}
	
	onLoadoutUpdated(updatedLoadout) {
		this.setState((prevState) => {
			let newLoadout = {
				...prevState.loadout,
				...updatedLoadout
			}

			return { loadout: newLoadout }
		})
	}

	render() {
		let { loading, error, loadout } = this.state

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

				<div>
					<LoadoutView loadout={ loadout } editable={ true } />
				</div>

				<LoadoutActions
					loadout={ loadout }
					editLoadout={ loadout => this.editLoadout(loadout) } 
					onLoadoutUpdated={ loadout => this.onLoadoutUpdated(loadout) }
				/>
			</React.Fragment>
		)
	}
}


export default LoadoutPage
