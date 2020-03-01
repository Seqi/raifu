import React from 'react'

import { Chip, Tooltip, Box } from '@material-ui/core'

import { loadouts } from 'app/data/api'
import { LoadingOverlay, ErrorOverlay } from 'app/shared/state'
import { LoadoutView } from 'app/features/loadouts'
import ReactiveTitle from 'app/shared/text/ReactiveTitle'

import LoadoutActions from './LoadoutActions'

class LoadoutPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loadout: null,
			shared: false,
			loading: true,
			error: null,
		}
	}

	componentDidMount() {
		this.loadLoadout()
	}
	
	loadLoadout() {
		this.setState({ loading: true, error: null }, () => {
			loadouts
				.getById(this.props.match.params.id)
				.then((loadout) => {
					if (!this.isUnmounted) {
						this.setState({ loadout, shared: loadout.shared, loading: false })
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

		return loadouts
			.edit(loadout.id, { ...updatedLoadout })
			.then(() => this.onLoadoutUpdated(updatedLoadout))
	}

	setShared(shared) {
		this.setState({ shared })
	}

	render() {
		let { loading, error, loadout, shared } = this.state

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
				<ReactiveTitle>
					{ loadout.name }
					{ shared && 
						<Box component='span' paddingLeft={ 1 }>
							<Tooltip placement='right' title='Loadout has been shared!'>
								<Chip label='Shared' size='small' color='primary' />
							</Tooltip>
						</Box> 
					}
				</ReactiveTitle>

				<div>
					<LoadoutView loadout={ loadout } editable={ true } />
				</div>

				<LoadoutActions
					loadout={ loadout }
					editLoadout={ loadout => this.editLoadout(loadout) } 
					onSharedChanged={ shared => this.setShared(shared) }
				/>
			</React.Fragment>
		)
	}
}


export default LoadoutPage
